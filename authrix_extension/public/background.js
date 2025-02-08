let activeTabId = null;
let pendingAuthData = null;

function sendAuthDataToTab(tabId, data) {
    if (!tabId) return;

    chrome.tabs.sendMessage(
        tabId,
        {
            from: 'authrix-extension',
            type: 'AUTH_RESPONSE',
            data: data
        },
        (response) => {
            const error = chrome.runtime.lastError;

            if (error) {
                console.error(`Error sending message to tab ${tabId}:`, error);
            } else {
                console.log(`Message successfully sent to tab ${tabId}:`, response);
            }
        }
    );
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Background received message:', message);

    try {
        if (message.type === 'CONTENT_SCRIPT_READY') {
            activeTabId = sender.tab.id;
            console.log('Content script ready in tab:', activeTabId);

            if (pendingAuthData && activeTabId) {
                sendAuthDataToTab(activeTabId, pendingAuthData);
                pendingAuthData = null;
            }

            sendResponse({ success: true });
        } else if (message.type === 'AUTH_RESPONSE') {
            chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
                if (!tabs.length) {
                    console.error('Active tab not found');
                    sendResponse({ success: false, error: 'Active tab not found' });

                    return;
                }

                const currentTabId = tabs[0].id;
                console.log('Sending message to tab:', currentTabId);

                sendAuthDataToTab(currentTabId, message.data);

                if (activeTabId && activeTabId !== currentTabId) {
                    sendAuthDataToTab(activeTabId, message.data);
                }

                sendResponse({ success: true });
            });
        }

        else if (message.type === 'AUTH_REJECTED') {
            chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
                if (!tabs.length) {
                    console.error('Active tab not found');
                    sendResponse({ success: false, error: 'Active tab not found' });

                    return;
                }

                const currentTabId = tabs[0].id;

                console.log('Sending rejection to tab:', currentTabId);

                chrome.tabs.sendMessage(
                    currentTabId,
                    {
                        from: 'authrix-extension',
                        type: 'AUTH_RESPONSE',
                        data: {
                            message: 'AUTH_REJECTED'
                        }
                    },
                    () => sendResponse({ success: true })
                );

                if (activeTabId && activeTabId !== currentTabId) {
                    chrome.tabs.sendMessage(
                        activeTabId,
                        {
                            from: 'authrix-extension',
                            type: 'AUTH_RESPONSE',
                            data: {
                                message: 'AUTH_REJECTED'
                            }
                        }
                    );
                }
            });
        } else if (message.type === 'OPEN_POPUP') {
            const queryParams = new URLSearchParams({
                message: message.data.message,
                domain: message.data.domain
            }).toString();

            const width = 377;

            chrome.system.display.getInfo((displays) => {
                const primaryDisplay = displays[0];
                const left = Math.round((primaryDisplay.bounds.width - width) / 2);

                chrome.windows.create({
                    url: `index.html?${queryParams}`,
                    type: 'popup',
                    width: width,
                    height: 500,
                    left: left,
                    focused: true,
                    state: 'normal',
                }, (window) => {
                    if (chrome.runtime.lastError) {
                        console.error('Error creating window:', chrome.runtime.lastError);
                        sendResponse({ success: false, error: chrome.runtime.lastError.message });
                    } else {
                        console.log('Window created:', window);
                        sendResponse({ success: true });
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error in background script:', error);
        sendResponse({ success: false, error: error.message });
    }

    return true;
});

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed/updated');
});

chrome.runtime.onStartup.addListener(() => {
    console.log('Extension activated');
});

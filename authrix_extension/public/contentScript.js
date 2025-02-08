let isInitialized = false;
let messageListener = null;

function initializeContentScript() {
    if (isInitialized) return;
    
    setupMessageListener();
    setupAuthrixRequestListener();
    
    chrome.runtime.sendMessage({ 
        type: 'CONTENT_SCRIPT_READY',
        url: window.location.href 
    });
    
    isInitialized = true;
}

function setupMessageListener() {
    if (messageListener) {
        chrome.runtime.onMessage.removeListener(messageListener);
    }

    messageListener = (message, sender, sendResponse) => {
        console.log('Content script received message:', message);

        if (message.from === 'authrix-extension') {
            console.log('Forwarding message to window:', message);

            window.postMessage({
                source: 'authrix-content-script',
                type: message.type,
                data: message.data
            }, window.location.origin);
            
            sendResponse({ received: true });
            return true;
        }
    };

    chrome.runtime.onMessage.addListener(messageListener);
}

function setupAuthrixRequestListener() {
    window.addEventListener('authrix-request', async (event) => {
        console.log('Received authrix request:', event.detail);
        
        try {
            const response = await chrome.runtime.sendMessage({
                type: 'OPEN_POPUP',
                data: {
                    message: event.detail.message,
                    domain: event.detail.domain
                }
            });

            console.log('OPEN_POPUP message response:', response);
        } catch (error) {
            console.error('Error sending OPEN_POPUP message:', error);
        }
    });
}

function cleanup() {
    console.log('Cleaning up content script');
    
    if (messageListener) {
        chrome.runtime.onMessage.removeListener(messageListener);
        messageListener = null;
    }
    
    isInitialized = false;
}

if (document.readyState === 'complete') {
    initializeContentScript();
} else {
    document.addEventListener('DOMContentLoaded', initializeContentScript);
}

window.addEventListener('load', initializeContentScript);
window.addEventListener('unload', cleanup);

// Handle extension context invalidation
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'EXTENSION_CONTEXT_INVALIDATED') {
        cleanup();
        initializeContentScript();
    }
    return true;
});

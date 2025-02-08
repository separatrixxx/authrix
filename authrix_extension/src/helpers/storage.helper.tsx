import { StorageInterface } from "../interfaces/storage.interface";


export async function saveUserData(data: StorageInterface): Promise<void> {
    if (!chrome.storage) {
        throw new Error('Chrome storage is not available');
    }

    try {
        await chrome.storage.local.set({
            userData: {
                username: data.username,
                publicKeyHash: data.publicKeyHash,
            }
        });
    } catch (error) {
        console.error('Error saving user data:', error);

        throw error;
    }
}

export async function getUserData(): Promise<StorageInterface | null> {
    if (!chrome.storage) {
        throw new Error('Chrome storage is not available');
    }

    try {
        const result = await chrome.storage.local.get('userData');

        return result.userData || null;
    } catch (error) {
        console.error('Error getting user data:', error);

        throw error;
    }
}

export async function isUserAuthorized(): Promise<boolean> {
    try {
        const userData = await getUserData();

        return userData !== null;
    } catch {
        return false;
    }
}

export async function clearUserData(): Promise<void> {
    if (!chrome.storage) {
        throw new Error('Chrome storage is not available');
    }

    try {
        await chrome.storage.local.remove('userData');
    } catch (error) {
        console.error('Error clearing user data:', error);
        
        throw error;
    }
}

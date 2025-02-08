import { create } from 'zustand';
import { getUserData, saveUserData } from 'helpers/storage.helper';
import { AuthStoreInterface } from 'interfaces/auth.interface';


export const useAuthStore = create<AuthStoreInterface>((set) => ({
  isAuthorized: false,
  username: null,
  publicKeyHash: null,

  setAuth: async (username: string, publicKeyHash: string) => {
    await saveUserData({ username, publicKeyHash });
    set({ isAuthorized: true, username, publicKeyHash });
  },

  checkAuth: async () => {
    const userData = await getUserData();

    if (userData) {
      set({ 
        isAuthorized: true, 
        username: userData.username, 
        publicKeyHash: userData.publicKeyHash, 
      });
    }
  },

  logout: async () => {
    await chrome.storage.local.remove('userData');
    set({ isAuthorized: false, username: null, publicKeyHash: null });
  },
}));

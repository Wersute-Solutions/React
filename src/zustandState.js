import {create} from 'zustand';

export const useStore = create((set) => ({
    currentUser: null,
    setCurrentUser: (user) => set({ currentUser: user }),
}));
import { create } from "zustand";
import { format } from "date-fns";

interface UserStore {
    dateFormat: string;
    postPerRow: number;
    getDateWithFormat: (date: string) => string;
    setDateFormat: (dateFormat: string) => void;
    setPostPerRow: (postPerRow: number) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
    dateFormat: "MMM dd, yyyy",
    postPerRow: 3,
    getDateWithFormat: (date: string) => format(date, get().dateFormat),
    setDateFormat: (dateFormat: string) => set({ dateFormat }),
    setPostPerRow: (postPerRow: number) => set({ postPerRow }),
}));
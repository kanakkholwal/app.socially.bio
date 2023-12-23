import { create } from "zustand";

export type HeaderStore = {
    profilePicture: string;
    setProfilePicture: (profilePicture: string) => void;
    profileName: string;
    setProfileName: (profileName: string) => void;
    profileBio: string;
    setProfileBio: (profileBio: string) => void;
    displays: {
        align: "start" | "center" | "end";
    },
    updateDisplays: (displays: {
        align: "start" | "center" | "end"
    }) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
    profilePicture: "",
    setProfilePicture: (profilePicture) => set({ profilePicture }),
    profileName: "",
    setProfileName: (profileName) => set({ profileName }),
    profileBio: "",
    setProfileBio: (profileBio) => set({ profileBio }),
    displays: {
        align: "center",
    },
    updateDisplays: (displays) => set({
        displays: {
            ...displays,
        }
    }),
}));


import { create } from "zustand";

type NonPersistStore = {
    userError: string,
    error: string,
    commentLoading: boolean,
    featuresLoading: boolean,
    setUserError: (userError: string) => void,
    setError: (error: string) => void,
    setCommentLoading: (loading: boolean) => void,
    setFeaturesLoading: (loading: boolean) => void,
  }
  
  export const useNonPersistStore = create<NonPersistStore>((set) => ({
    userError: "",
    error: "",
    commentLoading: false,
    featuresLoading: false,
    setUserError: (userError: string) => set({ userError }),
    setError: (error: string) => set({ error }),
    setCommentLoading: (commentLoading: boolean) => set({ commentLoading }),
    setFeaturesLoading: (featuresLoading: boolean) => set({ featuresLoading }),
  }))
  
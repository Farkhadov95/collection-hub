import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Collection } from "../types/collections";

type CollectionStore = {
  collections: Collection[],
  biggestCollections: Collection[],
  userCollections: Collection[],
  setCollections: (collections: Collection[]) => void,
  setBiggestCollections: (biggestCollections: Collection[]) => void,
  setUserCollections: (collections: Collection[]) => void,
}

export const useCollectionStore = create<CollectionStore>()(
  persist(
    (set) => ({
      collections: [],
      biggestCollections: [],
      userCollections: [],
      setCollections: (collections: Collection[]) => set({ collections }),
      setBiggestCollections: (biggestCollections: Collection[]) => set({ biggestCollections }),
      setUserCollections: (userCollections: Collection[]) => set({ userCollections }),
    }), {
      name: 'collections-storage',
    }
  )
);

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

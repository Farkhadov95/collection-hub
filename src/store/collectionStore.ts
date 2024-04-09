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

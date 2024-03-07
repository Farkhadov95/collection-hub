import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Collection, ItemType } from "../types/types";

type CollectionStore = {
    collections: Collection[],
    setCollections: (collections: Collection[]) => void,
    items: ItemType[],
    setItems: (items: ItemType[]) => void,
}

export const useCollectionStore = create<CollectionStore>()(
    persist(
      (set) => ({
        collections: [],
        setCollections: (collections: Collection[]) => set({ collections }),
        items: [],
        setItems: (items: ItemType[]) => set({ items }),
      }),
      {
        name: 'collections-storage',
      }
    )
  );



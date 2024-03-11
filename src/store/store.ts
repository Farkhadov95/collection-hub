import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Collection, ItemType } from "../types/types";

type CollectionStore = {
    collections: Collection[],
    items: ItemType[],
    userError: string,
    setCollections: (collections: Collection[]) => void,
    setItems: (items: ItemType[]) => void,
    setUserError: (userError: string) => void,
}

export const useCollectionStore = create<CollectionStore>()(
    persist(
      (set) => ({
        collections: [],
        items: [],

        userError: "",
        setCollections: (collections: Collection[]) => set({ collections }),
        setItems: (items: ItemType[]) => set({ items }),
        setUserError: (userError: string) => set({ userError }),
      }),
      {
        name: 'collections-storage',
      }
    )
  );



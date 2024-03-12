import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Collection, ItemType, currentUser } from "../types/types";

type CollectionStore = {
  currentUser: currentUser,
    collections: Collection[],
    userCollections: Collection[],
    items: ItemType[],
    userError: string,
    setCurrentUser: (user: currentUser) => void,
    setCollections: (collections: Collection[]) => void,
    setUserCollections: (collections: Collection[]) => void,
    setItems: (items: ItemType[]) => void,
    setUserError: (userError: string) => void,
}

export const useCollectionStore = create<CollectionStore>()(
    persist(
      (set) => ({
        currentUser: {
          _id: "",
          username: "",
          email: "",
        },
        collections: [],
        userCollections: [],
        items: [],
        userError: "",
        setCurrentUser: (user: currentUser) => set({ currentUser: user }),
        setCollections: (collections: Collection[]) => set({ collections }),
        setUserCollections: (userCollections: Collection[]) => set({ userCollections }),
        setItems: (items: ItemType[]) => set({ items }),
        setUserError: (userError: string) => set({ userError }),
      }),
      {
        name: 'collections-storage',
      }
    )
  );



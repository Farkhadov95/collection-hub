import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Collection, ItemType, currentUser, userInfo } from "../types/types";
import { mountStoreDevtool } from "simple-zustand-devtools";

const emptyCurrentUser = {
  _id: "",
  username: "",
  email: "",
  isAdmin: false,
}

type CollectionStore = {
  currentUser: currentUser,
  collections: Collection[],
  items: ItemType[],
  users: userInfo[],
  userCollections: Collection[],
  userError: string,
  error: string,
  setCurrentUser: (user: currentUser) => void,
  setCollections: (collections: Collection[]) => void,
  setItems: (items: ItemType[]) => void,
  setUsers: (users: userInfo[]) => void,
  setUserCollections: (collections: Collection[]) => void,
  setUserError: (userError: string) => void,
  setError: (error: string) => void,
}

export const useCollectionStore = create<CollectionStore>()(
    persist(
      (set) => ({
        currentUser: emptyCurrentUser,
        collections: [],
        items: [],
        users: [],
        userCollections: [],
        userError: "",
        error: "",
        setCurrentUser: (user: currentUser) => set({ currentUser: user }),
        setCollections: (collections: Collection[]) => set({ collections }),
        setItems: (items: ItemType[]) => set({ items }),
        setUsers: (users: userInfo[]) => set({ users }),
        setUserCollections: (userCollections: Collection[]) => set({ userCollections }),
        setUserError: (userError: string) => set({ userError }),
        setError: (error: string) => set({ error }),
      }),
      {
        name: 'collections-storage',
      }
    )
  );


  if (process.env.NODE_ENV === "development") {
    mountStoreDevtool("CollectionStore", useCollectionStore);
  }

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Collection, ItemType, currentUser, userInfo } from "../types/types";

const emptyCurrentUser = {
  _id: "",
  username: "",
  email: "",
}

type CollectionStore = {
  currentUser: currentUser,
  collections: Collection[],
  items: ItemType[],
  users: userInfo[],
  userCollections: Collection[],
  userItems: ItemType[],
  userError: string,
  setCurrentUser: (user: currentUser) => void,
  setCollections: (collections: Collection[]) => void,
  setItems: (items: ItemType[]) => void,
  setUsers: (users: userInfo[]) => void,
  setUserCollections: (collections: Collection[]) => void,
  setUserItems: (items: ItemType[]) => void,
  setUserError: (userError: string) => void,
}

export const useCollectionStore = create<CollectionStore>()(
    persist(
      (set) => ({
        currentUser: emptyCurrentUser,
        collections: [],
        items: [],
        users: [],
        userCollections: [],
        userItems: [],
        userError: "",
        setCurrentUser: (user: currentUser) => set({ currentUser: user }),
        setCollections: (collections: Collection[]) => set({ collections }),
        setItems: (items: ItemType[]) => set({ items }),
        setUsers: (users: userInfo[]) => set({ users }),
        setUserCollections: (userCollections: Collection[]) => set({ userCollections }),
        setUserItems: (userItems: ItemType[]) => set({ userItems }),
        setUserError: (userError: string) => set({ userError }),
      }),
      {
        name: 'collections-storage',
      }
    )
  );



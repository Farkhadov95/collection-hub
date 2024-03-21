import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Collection, ItemType, currentUser, userInfo } from "../types/types";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { Comment } from "../services/comment";

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
  comments: Comment[],
  users: userInfo[],
  userCollections: Collection[],
  userItems: ItemType[],
  userError: string,
  error: string,
  setCurrentUser: (user: currentUser) => void,
  setCollections: (collections: Collection[]) => void,
  setItems: (items: ItemType[]) => void,
  setComments: (comments: Comment[]) => void,
  setUsers: (users: userInfo[]) => void,
  setUserCollections: (collections: Collection[]) => void,
  setUserItems: (userItems: ItemType[]) => void,
  setUserError: (userError: string) => void,
  setError: (error: string) => void,
}

export const useCollectionStore = create<CollectionStore>()(
    persist(
      (set) => ({
        currentUser: emptyCurrentUser,
        collections: [],
        items: [],
        comments: [],
        users: [],
        userCollections: [],
        userItems: [],
        userError: "",
        error: "",
        setCurrentUser: (user: currentUser) => set({ currentUser: user }),
        setCollections: (collections: Collection[]) => set({ collections }),
        setItems: (items: ItemType[]) => set({ items }),
        setComments: (comments: Comment[]) => set({comments}),
        setUsers: (users: userInfo[]) => set({ users }),
        setUserCollections: (userCollections: Collection[]) => set({ userCollections }),
        setUserItems: (userItems: ItemType[]) => set({ userItems }),
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

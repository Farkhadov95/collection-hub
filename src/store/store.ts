import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Collection, ItemType, currentUser, userInfo, Comment, ItemSearch, CommentSearch, CollectionSearch } from "../types/types";
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
  userItems: ItemType[],
  comments: Comment[],
  setCurrentUser: (user: currentUser) => void,
  setCollections: (collections: Collection[]) => void,
  setItems: (items: ItemType[]) => void,
  setUsers: (users: userInfo[]) => void,
  setUserCollections: (collections: Collection[]) => void,
  setUserItems: (userItems: ItemType[]) => void,
  setComments: (comments: Comment[]) => void;
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
        comments: [],
        setCurrentUser: (user: currentUser) => set({ currentUser: user }),
        setCollections: (collections: Collection[]) => set({ collections }),
        setItems: (items: ItemType[]) => set({ items }),
        setUsers: (users: userInfo[]) => set({ users }),
        setUserCollections: (userCollections: Collection[]) => set({ userCollections }),
        setUserItems: (userItems: ItemType[]) => set({ userItems }),
        setComments: (comments: Comment[]) => set({ comments }),
      }),
      {
        name: 'collections-storage',
      }
    )
  );

  type nonPersistStore = {
    userError: string,
    error: string,
    commentLoading: boolean,
    featuresLoading: boolean,
    searchedItems: ItemSearch[],
    searchedComments: CommentSearch[],
    searchedCollections: CollectionSearch[],
    setUserError: (userError: string) => void,
    setError: (error: string) => void,
    setCommentLoading: (loading: boolean) => void,
    setFeaturesLoading: (loading: boolean) => void,
    setSearchedItems: (searchedItems: ItemSearch[]) => void,
    setSearchedComments: (searchedComments: CommentSearch[]) => void,
    setSearchedCollections: (searchedCollections: CollectionSearch[]) => void,
  }

  export const useNonPersistStore = create<nonPersistStore>((set) => ({
    userError: "",
    error: "",
    commentLoading: false,
    featuresLoading: false,
    searchedItems: [],
    searchedComments: [],
    searchedCollections: [],
    setUserError: (userError: string) => set({ userError }),
    setError: (error: string) => set({ error }),
    setCommentLoading: (commentLoading: boolean) => set({ commentLoading }),
    setFeaturesLoading: (featuresLoading: boolean) => set({ featuresLoading }),
    setSearchedItems: (searchedItems: ItemSearch[]) => set({ searchedItems }),
    setSearchedComments: (searchedComments: CommentSearch[]) => set({ searchedComments }),
    setSearchedCollections: (searchedCollections: CollectionSearch[]) => set({ searchedCollections }),
  }))

  if (process.env.NODE_ENV === "development") {
    mountStoreDevtool("CollectionStore", useCollectionStore);
  }

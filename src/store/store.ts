import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Collection } from "../types/collections";

import { Comment } from "../types/comment";

import { ItemSearch, CommentSearch, CollectionSearch } from "../types/search";
import { mountStoreDevtool } from "simple-zustand-devtools";


type CommentStore = {
  comments: Comment[],
  setComments: (comments: Comment[]) => void;
}

export  const useCommentStore = create<CommentStore>()(
  persist(
    (set) => ({
      comments: [],
      setComments: (comments: Comment[]) => set({ comments }),
    }), {
      name: 'comment-storage',
    }
  )
)

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

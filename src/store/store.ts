import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Collection } from "../types/collections";
import { ItemType } from "../types/item";
import { Comment } from "../types/comment";
import { currentUser, userInfo} from "../types/user";
import { ItemSearch, CommentSearch, CollectionSearch } from "../types/search";
import { mountStoreDevtool } from "simple-zustand-devtools";

const emptyCurrentUser = {
  _id: "",
  username: "",
  email: "",
  isAdmin: false,
}

type UserStore = {
  currentUser: currentUser,
  users: userInfo[],
  setCurrentUser: (user: currentUser) => void,
  setUsers: (users: userInfo[]) => void,
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      currentUser: emptyCurrentUser,
      users: [],
      setCurrentUser: (user: currentUser) => set({ currentUser: user }),
      setUsers: (users: userInfo[]) => set({ users }),
    }), {
      name: 'user-storage',
    }
  )
);

type ItemStore = {
  items: ItemType[],
  userItems: ItemType[],
  setItems: (items: ItemType[]) => void,
  setUserItems: (userItems: ItemType[]) => void,
}

export const useItemStore = create<ItemStore>()(
  persist(
    (set) => ({
      items: [],
      userItems: [],
      setItems: (items: ItemType[]) => set({ items }),
      setUserItems: (userItems: ItemType[]) => set({ userItems }),
    }), {
      name: 'item-storage',
    }
  )
)

type CollectionStore = {
  collections: Collection[],
  biggestCollections: Collection[],
  items: ItemType[],
  userCollections: Collection[],
  userItems: ItemType[],
  comments: Comment[],
  setCollections: (collections: Collection[]) => void,
  setBiggestCollections: (biggestCollections: Collection[]) => void,
  setItems: (items: ItemType[]) => void,
  setUserCollections: (collections: Collection[]) => void,
  setUserItems: (userItems: ItemType[]) => void,
  setComments: (comments: Comment[]) => void;
}

export const useCollectionStore = create<CollectionStore>()(
  persist(
    (set) => ({
      collections: [],
      biggestCollections: [],
      items: [],
      userCollections: [],
      userItems: [],
      comments: [],
      setCollections: (collections: Collection[]) => set({ collections }),
      setBiggestCollections: (biggestCollections: Collection[]) => set({ biggestCollections }),
      setItems: (items: ItemType[]) => set({ items }),
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

import { create } from "zustand";
import { ItemSearch, CommentSearch, CollectionSearch } from "../types/search";

type SearchStore = {
    searchedItems: ItemSearch[],
    searchedComments: CommentSearch[],
    searchedCollections: CollectionSearch[],
    setSearchedItems: (searchedItems: ItemSearch[]) => void,
    setSearchedComments: (searchedComments: CommentSearch[]) => void,
    setSearchedCollections: (searchedCollections: CollectionSearch[]) => void,
  }
  
  
  export const useSearchStore = create<SearchStore>((set) => ({
    searchedItems: [],
    searchedComments: [],
    searchedCollections: [],
    setSearchedItems: (searchedItems: ItemSearch[]) => set({ searchedItems }),
    setSearchedComments: (searchedComments: CommentSearch[]) => set({ searchedComments }),
    setSearchedCollections: (searchedCollections: CollectionSearch[]) => set({ searchedCollections }),
  }))
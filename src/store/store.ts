import { create } from "zustand";
import { persist } from "zustand/middleware";



export type Feature = {
    fieldName: string;
    fieldType: string;
    _id?: string;
}

export type Collection = {
    _id: string,
    topic: string,
    userID: string,
    name: string,
    description: string,
    image: string,
    itemFields: Feature[],
    date: Date
}

export type newCollection = {
    userID: string,
    topic: string,
    name: string,
    description: string
    image: string,
}


type CollectionStore = {
    collections: Collection[],
    setCollections: (collections: Collection[]) => void,
}

export const useCollectionStore = create<CollectionStore>()(
    persist(
      (set) => ({
        collections: [],
        setCollections: (collections: Collection[]) => set({ collections }),
      }),
      {
        name: 'collections-storage',
      }
    )
  );



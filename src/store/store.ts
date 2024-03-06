import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FieldType = {
    fieldName: string;
    fieldType: string;
    _id?: string;
}

export type FieldExeType = {
    fieldName: string;
    fieldValue: string;
  };

export type Collection = {
    _id: string,
    topic: string,
    userID: string,
    name: string,
    description: string,
    image: string,
    itemFields: FieldType[],
    date: Date
}

export type ItemType = {
    _id: string,
    collectionID: string,
    name: string,
    tags: string,
    description: string,
    fields: FieldExeType[],
    image: string,
    likeIDs: string[],
    commentIDs: string[],
}

export type newCollection = {
    userID: string,
    topic: string,
    name: string,
    description: string
    image: string,
}

export type newItem = {
    collectionID: string,
    name: string,
    description: string,
    tags: string,
    image: string,
    fields: FieldExeType[] | [],
}

type CollectionStore = {
    collections: Collection[],
    setCollections: (collections: Collection[]) => void,
    items: ItemType[],
    setItems: (items: ItemType[]) => void,
}

export const useCollectionStore = create<CollectionStore>()(
    persist(
      (set) => ({
        collections: [],
        setCollections: (collections: Collection[]) => set({ collections }),
        items: [],
        setItems: (items: ItemType[]) => set({ items }),
      }),
      {
        name: 'collections-storage',
      }
    )
  );



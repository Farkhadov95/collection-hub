import { create } from "zustand";

export type Feature = {
    fieldName: string;
    fieldType: string;
    _id?: string;
}

export type Collection = {
    _id: string,
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


type CollectionType = {
    collections: Collection[],
    setCollections: (collections: Collection[]) => void,
}

export const useCollectionStore = create<CollectionType>((set) => ({
    collections: [],
    setCollections: (collections: Collection[]) => set({ collections }),
}));



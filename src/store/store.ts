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
    currentCollection: Collection | null,
    features: Feature[],
    setCollections: (collections: Collection[]) => void,
    setCurrentCollection: (collection: Collection) => void,
    setFeatures: (features: Feature[]) => void,
}

export const useCollectionStore = create<CollectionType>((set) => ({
    collections: [],
    currentCollection: null, 
    features: [],
    setCollections: (collections: Collection[]) => set({ collections }),
    setCurrentCollection: (currentCollection: Collection) => set({ currentCollection }),
    setFeatures: (features: Feature[]) => set({ features })
}));



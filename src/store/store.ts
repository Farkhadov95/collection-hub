import { create } from "zustand";

export type Feature = {
    fieldName: string;
    fieldType: string;
}

export type Collection = {
    _id: string,
    userID: string,
    name: string,
    description: string,
    tags: string[],
    image: string,
    itemFields: Feature[],
    date: Date
}


type CollectionType = {
    collection: Collection | null,
    features: Feature[],
    setCollection: (collection: Collection) => void,
    setFeatures: (features: Feature[]) => void,
}

export const useCollectionStore = create<CollectionType>((set) => ({
    collection: null, 
    features: [],
    setCollection: (collection: Collection) => set({ collection }),
    setFeatures: (features: Feature[]) => set({ features })
}));



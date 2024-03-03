import { create } from "zustand";

export type Feature = {
    type: string,
    name: string,
}

type ItemFeatures = {
    features: Feature[],
    addFeature: (feature: Feature) => void,
    removeFeature: (feature: Feature) => void,
}

export const useAppStore = create<ItemFeatures>((set) => ({
    features: [],
    addFeature: (feature: Feature) => {
        set((state) => ({features: [...state.features, feature]}))
    },
    removeFeature: (feature: Feature) => {
        set((state) => ({features: state.features.filter(f => f.name !== feature.name)}))
    }

}));



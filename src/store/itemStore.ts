import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ItemType } from "../types/item";


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
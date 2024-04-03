import { newItem, ItemType } from "../types/item";
import api, { getHeaders } from "./api";

enum ApiRoutes {
  collection = 'collection/',
  items = 'items/',
  like='like/'
}

export const getAllItems = async () => (
    await api.get(`${ApiRoutes.items}`)
).data;
  
export const getItems = async (id: string) => (
    await api.get(`${ApiRoutes.items}${ApiRoutes.collection}${id}`)
).data;

export const createItem = async (newItem: newItem) => (
    await api.post(`${ApiRoutes.items}`, newItem, {
        headers: getHeaders()
    })
).data;

export const updateItem = async (updatedItem: ItemType) => (
    await api.put(`${ApiRoutes.items}${updatedItem._id}`, updatedItem, {
        headers: getHeaders()
    })
).data;

export const updateLike = async (itemID: string) => (
    await api.put(`${ApiRoutes.items}${ApiRoutes.like}${itemID}`, {
        headers: getHeaders()
    })
).data;

export const deleteItem = async (itemID: string) => (
    await api.delete(`${ApiRoutes.items}${itemID}`, {
        headers: getHeaders()
    })
).data;
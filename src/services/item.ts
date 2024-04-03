import { newItem, ItemType } from "../types/types";

const URL = "https://collection-hub-server.adaptable.app/";

enum ApiRoutes {
  collections = 'collections/',
  collection = 'collection/',
  items = 'items/',
  searchComments = 'search/comment',
  searchItems = 'search/item',
  searchCollections = 'search/collection',
  like='like/'
}

export const getAllItems = async () => {
    const res = await fetch(`${URL}${ApiRoutes.items}`);
    const data = await res.json();
    return data;
  }
  
  export const getItems = async (id: string) => {
    const res = await fetch(`${URL}${ApiRoutes.items}${ApiRoutes.collection}${id}`);
    const data = await res.json();
    return data;
  }

  export const createItem = async (newItem: newItem) => {
    const token = localStorage.getItem('X-Auth-Token');
    if (!token) throw new Error('Unauthorized request');
    const res = await fetch(`${URL}${ApiRoutes.items}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token
      },
      body: JSON.stringify(newItem)
    });
    const data = await res.json();
    return data; 
  }
  
  export const updateItem = async (updatedItem: ItemType) => {
    const token = localStorage.getItem('X-Auth-Token');
    if (!token) throw new Error('Unauthorized request');
    const res = await fetch(`${URL}${ApiRoutes.items}${updatedItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token
      },
      body: JSON.stringify(updatedItem),
    });
    const data = await res.json();
    return data;
  }
  
  export const updateLike = async (itemID: string) => {
     const token = localStorage.getItem('X-Auth-Token');
     if (!token) throw new Error('Unauthorized request');
     const res = await fetch(`${URL}${ApiRoutes.items}${ApiRoutes.like}${itemID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token
      }
    });
    const data = await res.json();
    return data;
  }

  export const deleteItem = async (itemID: string) => {
    const token = localStorage.getItem('X-Auth-Token');
    if (!token) throw new Error('Unauthorized request');
    const res = await fetch(`${URL}${ApiRoutes.items}${itemID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token
      },
    });
    const data = await res.json();
    return data; 
  }
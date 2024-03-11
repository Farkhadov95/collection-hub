import { Collection, newCollection, newItem } from "../types/types";

const URL = "http://localhost:3000/collections/";
const ITEM_URL = 'http://localhost:3000/items/'

export const getCollections = async () => {
  const res = await fetch(URL);
  const data = await res.json();
  return data;
}

export const getUserCollection = async () => {
  const token = localStorage.getItem('X-Auth-Token');
  if (!token) return [];
  const res = await fetch(`${URL}/my`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token
    }
  });
  const data = await res.json();
  return data;
}

export const updateCollection = async (collection: Collection) => {
    const res = await fetch(`${URL}${collection._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": localStorage.getItem('X-Auth-Token')!,
      },
      body: JSON.stringify(collection),
    });
    const data = await res.json();
    console.log(data);
    return data;
  };

export const createCollection = async (newCollection: newCollection) => {
  const token = localStorage.getItem('X-Auth-Token');
  if (!token) return [];
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token
    },
    body: JSON.stringify(newCollection)
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export const getItems = async (id: string) => {
  const res = await fetch(`${ITEM_URL}${id}`);
  const data = await res.json();
  return data;
}

export const createItem = async (newItem: newItem) => {
  const res = await fetch(ITEM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newItem)
  });
  const data = await res.json();
  console.log(data);
  return data; 
}

export const deleteCollection = async (id: string) => {
  const res = await fetch(`${URL}${id}`, {
    method: "DELETE"
  });
  const data = await res.json();
  return data;
}

export const deleteCollectionFeature = async (collectionID: string, featureID: string) => {
  const res = await fetch(`${URL}${collectionID}/${featureID}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}
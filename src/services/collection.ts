import { Collection, newCollection } from "../types/types";

const URL = "https://collection-hub-server.adaptable.app/";

enum ApiRoutes {
  collections = 'collections/',
  collection = 'collection/',
  searchComments = 'search/comment',
  searchItems = 'search/item',
  searchCollections = 'search/collection',
}

export const getCollections = async () => {
  const res = await fetch(`${URL}${ApiRoutes.collections}`);
  const data = await res.json();
  return data;
}

export const getBiggestCollections = async () => {
  const res = await fetch(`${URL}${ApiRoutes.collections}biggest`);
  const data = await res.json();
  return data;
}

export const getUserCollection = async (userId: string) => {
  const token = localStorage.getItem('X-Auth-Token');
  if (!token) throw new Error('Unauthorized request');
  const res = await fetch(`${URL}${ApiRoutes.collections}/my`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
      "X-User-ID": userId
    }
  });
  const data = await res.json();
  return data;
}

export const updateCollection = async (collection: Collection) => {
  const token = localStorage.getItem('X-Auth-Token');
  if (!token) throw new Error('Unauthorized request');
    const res = await fetch(`${URL}${ApiRoutes.collections}${collection._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token
      },
      body: JSON.stringify(collection),
    });
    const data = await res.json();
    return data;
};

export const createCollection = async (newCollection: newCollection) => {
  const token = localStorage.getItem('X-Auth-Token');
  if (!token) throw new Error('Unauthorized request');
  
  const res = await fetch(`${URL}${ApiRoutes.collections}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
    body: JSON.stringify(newCollection)
  });
  const data = await res.json();
  return data;
}

export const deleteCollection = async (collectionID: string) => {
  const token = localStorage.getItem('X-Auth-Token');
  if (!token) throw new Error('Unauthorized request');
  const res = await fetch(`${URL}${ApiRoutes.collections}${collectionID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token
    },
  });
  const data = await res.json();
  return data;
}

export const deleteCollectionFeature = async (
    collectionID: string,
    featureID: string
  ) => {
  const token = localStorage.getItem('X-Auth-Token');
  if (!token) throw new Error('Unauthorized request');
  const res = await fetch(`${URL}${ApiRoutes.collections}${collectionID}/${featureID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token
    },
  });
  const data = await res.json();
  return data;
}

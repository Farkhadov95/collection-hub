import { Collection, newCollection } from "../types/types";

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

export const searchComments = async (searchText: string) => {
  try {
    const res = await fetch(`${URL}${ApiRoutes.searchComments}?query=${encodeURIComponent(searchText)}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('There was a problem with your search request:', error);
    throw error;
  }
}

export const searchItems = async (searchText: string) => {
  try {
    const res = await fetch(`${URL}${ApiRoutes.searchItems}?query=${encodeURIComponent(searchText)}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('There was a problem with your search request:', error);
    throw error;
  }
}

export const searchCollections = async (searchText: string) => {
  try {
    const res = await fetch(`${URL}${ApiRoutes.searchCollections}?query=${encodeURIComponent(searchText)}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('There was a problem with your search request:', error);
    throw error;
  }
}

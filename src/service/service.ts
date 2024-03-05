import { Collection, newCollection } from "../store/store";

const URL = "http://localhost:3000/collections/";

export const updateCollection = async (collection: Collection) => {
    const res = await fetch(`${URL}${collection._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collection),
    });
    const data = await res.json();
    console.log(data);
    return data;
  };

export const createCollection = async (newCollection: newCollection) => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCollection)
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export const getCollections = async () => {
  const res = await fetch(URL);
  const data = await res.json();
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

export const fetchFeatures = async (collectionID: string) => {
  const res = await fetch(URL + collectionID);
  const data = await res.json();
  return data;
};
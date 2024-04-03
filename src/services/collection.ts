import { Collection, newCollection } from "../types/types";
import api, { getHeaders } from './api';

enum ApiRoutes {
  biggest_collections = 'collections/biggest',
  collections = 'collections/',
  collection = 'collection/',
  searchComments = 'search/comment',
  searchItems = 'search/item',
  searchCollections = 'search/collection',
}

export const getCollections = async () => (
  await api.get(ApiRoutes.collections)
).data;

export const getBiggestCollections = async () => (
  await api.get(ApiRoutes.biggest_collections)
).data;

export const getUserCollection = async () => (
  await api.get(`${ApiRoutes.collections}/my`, {
    headers: getHeaders()
  })
).data;

export const updateCollection = async (collection: Collection) => (
    await api.put(`${ApiRoutes.collections}${collection._id}`, collection, {
      headers: getHeaders()
    })
).data;

export const createCollection = async (newCollection: newCollection) => (
  await api.post(`${ApiRoutes.collections}`, newCollection, {
    headers: getHeaders()
  })
).data;

export const deleteCollection = async (collectionID: string) => (
  await api.delete(`${ApiRoutes.collections}${collectionID}`, {
    headers: getHeaders()
  })
).data

export const deleteCollectionFeature = async (
    collectionID: string,
    featureID: string
  ) => (
    await api.delete(`${ApiRoutes.collections}${collectionID}/${featureID}`, {
      headers: getHeaders()
    })
  ).data

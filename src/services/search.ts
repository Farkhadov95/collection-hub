import api from "./api";

enum ApiRoutes {
  searchComments = 'search/comment',
  searchItems = 'search/item',
  searchCollections = 'search/collection',
}

export const searchComments = async (searchText: string) => (
  await api.get(`${ApiRoutes.searchComments}?query=${encodeURIComponent(searchText)}`)
).data
  
export const searchItems = async (searchText: string) => (
  await api.get(`${ApiRoutes.searchItems}?query=${encodeURIComponent(searchText)}`)
).data
  
export const searchCollections = async (searchText: string) => (
  await api.get(`${ApiRoutes.searchCollections}?query=${encodeURIComponent(searchText)}`)
).data
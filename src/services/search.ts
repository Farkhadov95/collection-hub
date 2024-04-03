const URL = "https://collection-hub-server.adaptable.app/";

enum ApiRoutes {
  searchComments = 'search/comment',
  searchItems = 'search/item',
  searchCollections = 'search/collection',
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
import { ItemType } from "./types/types";

type SortableItem = {
  createdAt: Date;
  name: string;
}

const getOldest = <T extends SortableItem>(items: T[]): T[] => {
  return items.slice().sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateA - dateB;
  });
}

const getNewest = <T extends SortableItem>(items: T[]): T[] => {
  return items.slice().sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
}

const getNameAZ = <T extends SortableItem>(items: T[]): T[] => {
  return items.slice().sort((a, b) => a.name.localeCompare(b.name));
}

const getNameZA = <T extends SortableItem>(items: T[]): T[] => {
  return items.slice().sort((a, b) => b.name.localeCompare(a.name));
}

export const handleSort = <T extends SortableItem>(items: T[], sortType: string): T[] => {
  if (!sortType) {
    return items;
  }

  if (sortType === "oldest") {
    return getOldest(items);
  }

  if (sortType === "newest") {
    return getNewest(items);
  }

  if (sortType === "nameAZ") {
    return getNameAZ(items);
  }

  if (sortType === "nameZA") {
    return getNameZA(items);
  } else {
    return items;
  }
}

export const handleItemFilter = (items: ItemType[], filterType: string) => {
  if (!filterType) {
    return items;
  }

  if (filterType === "likes") {
    return items.filter((item) => item.likeIDs.length > 0);
  }

  if (filterType === "image") {
    return items.filter((item) => item.image);
  }
};

export const convertToBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const sortedItems = (items: ItemType[]) => items.sort((a, b) => {
  const dateA = new Date(a.createdAt);
  const dateB = new Date(b.createdAt);
  return dateB.getTime() - dateA.getTime();
});

export type Comment = {
    _id: string;
    userID: string;
    itemID: string;
    collectionID: string;
    username: string;
    comment: string;
    createdAt: Date;
  }
  
  export type newComment = {
    comment: string;
  };
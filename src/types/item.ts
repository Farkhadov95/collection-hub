export type FieldExeType = {
    fieldName: string;
    fieldValue: string;
    _id: string
};

export type FieldRenderType = {
    _id: string,
    fieldName: string;
    fieldType: string;
    fieldValue: string;
}

export type ItemType = {
    userID: string,
    collectionID: string,
    _id: string,
    name: string,
    tags: string,
    description: string,
    fields: FieldExeType[],
    image: string,
    likeIDs: string[],
    commentIDs: string[],
    createdAt: Date,
  }
  
  export type newItem = {
    userID: string,
    collectionID: string,
    name: string,
    description: string,
    tags: string,
    image: string,
    fields: FieldExeType[] | [],
  }
  
  export type OptItemData = {
    fields: FieldRenderType[] | [];
  };
    
  export type ReqItemData = {
    name: string;
    tags: string;
    description: string;
  };
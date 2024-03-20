export type FieldType = {
  fieldName: string;
  fieldType: string;
  _id?: string;
}

export type FieldExeType = {
  fieldName: string;
  fieldValue: string;
  _id: string
};

export type Collection = {
  userID: string,
  _id: string,
  topic: string,
  userName: string,
  name: string,
  description: string,
  image: string,
  itemFields: FieldType[],
  date: Date
}

export type newCollection = {
  topic: string,
  name: string,
  description: string
  image: string,
}

export type collectionFormData = {
  topic: string;
  name: string;
  description: string;
};

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
  fields: FieldExeType[] | [];
};
  
export type ReqItemData = {
  name: string;
  tags: string;
  description: string;
};

export type newUserForm = {
  username: string,
  email: string,
  password: string,
  conf_password: string,
}

export type newUser = {
  username: string,
  email: string,
  password: string,
}

export type user = {
  email: string,
  password: string,
}

export type userInfo = {
  _id: string,
  username: string,
  email: string,
  createdAt: Date,
  isAdmin: boolean,
}

export type currentUser = {
  _id: string,
  username: string,
  email: string,
  isAdmin: boolean,
}
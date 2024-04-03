export type FieldType = {
  fieldName: string;
  fieldType: string;
  _id?: string;
}

export type Collection = {
  userID: string,
  _id: string,
  topic: string,
  userName: string,
  name: string,
  description: string,
  image: string,
  itemFields: FieldType[],
  createdAt: Date,
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

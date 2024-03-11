export type FieldType = {
    fieldName: string;
    fieldType: string;
    _id?: string;
}

export type FieldExeType = {
    fieldName: string;
    fieldValue: string;
  };

export type Collection = {
    _id: string,
    topic: string,
    userID: string,
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

export type ItemType = {
    _id: string,
    collectionID: string,
    name: string,
    tags: string,
    description: string,
    fields: FieldExeType[],
    image: string,
    likeIDs: string[],
    commentIDs: string[],
}

export type newItem = {
    collectionID: string,
    name: string,
    description: string,
    tags: string,
    image: string,
    fields: FieldExeType[] | [],
}

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

export type currentUser = {
    _id: string,
    username: string,
    email: string,
}
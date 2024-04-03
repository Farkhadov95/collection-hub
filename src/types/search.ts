export type CommentSearch = {
    _id: string,
    userID: string,
    username: string,
    collectionID: string,
    itemID: string,
    comment: string,
    score: number,
    maxScore: number,
    normalizedScore: number,
    updatedAt: Date,
    createdAt: Date,
}

export type ItemSearch = {
  _id: string,
  name: string,
  score: string,
  maxScore: number,
  normalizedScore: number,
}


export type CollectionSearch = {
  _id: string,
  name: string,
  score: string,
  maxScore: number,
  normalizedScore: number,
}
import { newComment } from "../types/comment";
import api, { getHeaders } from "./api";

const commentsRoute = "comments/";

export const getComments = async (itemID: string) => (
  await api.get(`${commentsRoute}${itemID}`)
).data;

export const postComment = async (itemID: string, commentData: newComment ) => (
  await api.post(`${commentsRoute}${itemID}`, commentData, {
    headers: getHeaders()
  })
).data;

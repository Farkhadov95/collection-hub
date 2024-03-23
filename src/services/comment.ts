import { newComment } from "../types/types";

const URL = "https://collection-hub-server.adaptable.app/";

const commentsRoute = "comments/";

export const getComments = async (itemID: string) => {
  const res = await fetch(`${URL}${commentsRoute}${itemID}`);
  const data = await res.json();
  return data;
}

export const postComment = async (itemID: string, commentData: newComment ) => {
  const token = localStorage.getItem('X-Auth-Token');
  if (!token) throw new Error('Unauthorized request');

  const res = await fetch(`${URL}${commentsRoute}${itemID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token
    },
    body: JSON.stringify(commentData)
  });
  const data = await res.json();
  return data;
}

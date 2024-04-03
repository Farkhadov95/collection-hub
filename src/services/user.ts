import { newUser, user, userInfo } from "../types/user";
import api, { getHeaders } from "./api";

enum Routes {
    LOGIN = "auth/",
    USERS = "users/",
    ME = "/me"
}

export const registerUser = async (user: newUser) => (
  await api.post(Routes.USERS, user)
).data

export const loginUser = async (user: user) => (
  await api.post(Routes.LOGIN, user)
).data

export const getAllUsers = async () => (
  await api.get(Routes.USERS, {
    headers: getHeaders()
  })
).data

export const updateUsers = async (users: userInfo[], status: boolean) => {
  const requestBody = {
    users: users,
    status: status
  }

  return (await api.put(Routes.USERS, requestBody, {
    headers: getHeaders()
  })).data
}

export const deleteUsers = async (users: userInfo[]) => (
  await api.delete(Routes.USERS, {
    headers: getHeaders(),
    data: users
  })
).data

export const promoteMe = async (currentUserID: string, status: boolean) => {
  const requestBody = {
    userID: currentUserID,
    status: status
  }

  return (await api.put(Routes.USERS, requestBody)).data
}

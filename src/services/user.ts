import { currentUser, newUser, user, userInfo } from "../types/types";

const URL = "http://localhost:3000/";
enum Routes {
    LOGIN = "auth/",
    USERS = "users/",
    ME = "/me"
}

export const registerUser = async (user: newUser, onSuccess: (currentUser: currentUser) => void, onFail: (error: string) => void) => {   
  try {
    const res = await fetch(`${URL}${Routes.USERS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
    }

    const data = await res.json();
    localStorage.setItem('X-Auth-Token', data.token);
    onSuccess({
        _id: data._id,
        username: data.username,
        email: data.email,
        isAdmin: data.isAdmin,
      });
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    if (error instanceof Error) {
        onFail(error.message);
      }
    throw error;
  }
}

export const loginUser = async (user: user, onSuccess: (currentUser: currentUser) => void, onFail: (error: string) => void) => {
    try {
      const res = await fetch(`${URL}${Routes.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
  
      if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(errorMessage);
        }
  
      const data = await res.json();
      localStorage.setItem('X-Auth-Token', data.token);
      onSuccess({
        _id: data._id,
        username: data.username,
        email: data.email,
        isAdmin: data.isAdmin,
      });
      console.log(data);
      return data;

    } catch (error) {
      console.error('Error logging in user:', error);
      if (error instanceof Error) {
        onFail(error.message);
      }
      throw error;
    }
}

export const getAllUsers = async (userId: string) => {
  const token = localStorage.getItem('X-Auth-Token');
  if (!token) return [];
  const res = await fetch(`${URL}${Routes.USERS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
      "X-User-ID": userId
    }
  });
  const data = await res.json();
  return data;
}

export const updateUsers = async (users: userInfo[], status: boolean, userId: string) => {
  const token = localStorage.getItem('X-Auth-Token');
  if (!token) return [];

  const requestBody = {
    users: users,
    status: status
  }

  const res = await fetch(`${URL}${Routes.USERS}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
      "X-User-ID": userId,
    },
    body: JSON.stringify(requestBody)
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export const deleteUsers = async (users: userInfo[], userId: string) => {
  const token = localStorage.getItem('X-Auth-Token');
  if (!token) return [];
  const res = await fetch(`${URL}${Routes.USERS}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
      "X-User-ID": userId
    },
    body: JSON.stringify(users)
  });
  const data = await res.text();
  console.log(data);
  return data;
}

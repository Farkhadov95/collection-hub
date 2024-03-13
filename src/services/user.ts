import { currentUser, newUser, user } from "../types/types";

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
        _id: data.id,
        username: data.username,
        email: data.email,
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

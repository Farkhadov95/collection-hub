import { currentUser, newUser, user } from "../types/types";

const URL = "http://localhost:3000/";
enum Routes {
    LOGIN = "auth/",
    REGISTER = "users/",
    ME = "/me"
}

export const registerUser = async (user: newUser, onSuccess: (data: currentUser) => void, onFail: (error: string) => void) => {   
  try {
    const res = await fetch(`${URL}${Routes.REGISTER}`, {
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

export const loginUser = async (user: user, onSuccess: (data: currentUser) => void, onFail: (error: string) => void) => {
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
        _id: data.id,
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

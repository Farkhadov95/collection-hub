import { newUser, user } from "../types/types";

const URL = "http://localhost:3000/users/";
const AUTH_URL = "http://localhost:3000/auth/";


export const registerUser = async (user: newUser, onSuccess: () => void, onFail: (error: string) => void) => {   
  try {
    const res = await fetch(URL, {
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
    console.log(data);
    onSuccess();
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    if (error instanceof Error) {
        onFail(error.message);
      }
    throw error;
  }
}

export const loginUser = async (user: user, onSuccess: () => void, onFail: (error: string) => void) => {
    try {
      const res = await fetch(AUTH_URL, {
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
  
      const data = await res.text();
      localStorage.setItem('X-Auth-Token', data);
      console.log(data);
      onSuccess();
      return data;

    } catch (error) {
      console.error('Error logging in user:', error);
      if (error instanceof Error) {
        onFail(error.message);
      }
      throw error;
    }
  }



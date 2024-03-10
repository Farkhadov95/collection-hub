import { newUser, user } from "../types/types";

const URL = "http://localhost:3000/users/";
const AUTH_URL = "http://localhost:3000/auth/";

export const registerUser = async (user: newUser, onSuccess: () => void) => {
    
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if (!res.ok) {
        if (res.status === 400) {
          const errorMessage = await res.text();
          throw new Error(errorMessage);
        }
        throw new Error(`Failed to create user: ${res.status} ${res.statusText}`);
      }

    const data = await res.json();
    localStorage.setItem('X-Auth-Token', data.token);
    console.log(data);
    onSuccess();
    return data;

  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export const loginUser = async (user: user, onSuccess: () => void) => {
    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
  
      if (!res.ok) {
          if (res.status === 400) {
            const errorMessage = await res.text();
            throw new Error(errorMessage);
          }
          throw new Error(`Failed to create user: ${res.status} ${res.statusText}`);
        }
  
      const data = await res.text();
      console.log(data);
      onSuccess();
      return data;

    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }



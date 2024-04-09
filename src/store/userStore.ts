import { create } from "zustand";
import { persist } from "zustand/middleware";
import { currentUser, userInfo} from "../types/user";

const emptyCurrentUser = {
    _id: "",
    username: "",
    email: "",
    isAdmin: false,
  }

type UserStore = {
    currentUser: currentUser,
    users: userInfo[],
    setCurrentUser: (user: currentUser) => void,
    setUsers: (users: userInfo[]) => void,
  }
  
  export const useUserStore = create<UserStore>()(
    persist(
      (set) => ({
        currentUser: emptyCurrentUser,
        users: [],
        setCurrentUser: (user: currentUser) => set({ currentUser: user }),
        setUsers: (users: userInfo[]) => set({ users }),
      }), {
        name: 'user-storage',
      }
    )
  );
  
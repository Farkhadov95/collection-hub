import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Comment } from "../types/comment";

type CommentStore = {
    comments: Comment[],
    setComments: (comments: Comment[]) => void;
  }
  
  export  const useCommentStore = create<CommentStore>()(
    persist(
      (set) => ({
        comments: [],
        setComments: (comments: Comment[]) => set({ comments }),
      }), {
        name: 'comment-storage',
      }
    )
  )
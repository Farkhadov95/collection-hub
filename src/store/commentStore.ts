import { create } from "zustand";
import { Comment } from "../types/comment";

type CommentStore = {
    comments: Comment[],
    setComments: (comments: Comment[]) => void;
  }
  
  export  const useCommentStore = create<CommentStore>((set) => ({
    comments: [],
    setComments: (comments: Comment[]) => set({ comments }),
  }))
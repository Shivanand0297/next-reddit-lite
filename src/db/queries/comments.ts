import { Comment } from "@prisma/client";
import db from "../index";

export type CommentWithAuthor = Comment & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export default async function fetchCommentsByPostId(postId: string): Promise<CommentWithAuthor[]> {
  return db.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}

import { Post } from "@prisma/client";
import db from "../index";

export type PostsWithData = Post & {
  topic: { slug: string },
  user: { name: string | null },
  _count: { comments: number }
}

export default async function findPostsByTopicSlug(slug: string): Promise<PostsWithData[]> {
  return db.post.findMany({
    where: {
      topic: { slug }
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } }
    }
  })
}
"use server";

import { paths } from "@/app/paths";
import { auth } from "@/auth";
import db from "@/db";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

interface ICreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export const createPost = async (
  slug: string,
  formState: ICreatePostFormState,
  formData: FormData
): Promise<ICreatePostFormState> => {

  const title = formData.get("title");
  const content = formData.get("content");
  const session = await auth();

  const createPostSchema = z.object({
    title: z.string().min(3, "Title must contain at least 3 character(s)"),
    content: z.string().min(10, "Content must contain at least 10 character(s)"),
  });

  let result = createPostSchema.safeParse({ title, content });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Cannot find topic"],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
};

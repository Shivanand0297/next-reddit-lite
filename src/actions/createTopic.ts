"use server";

import { paths } from "@/app/paths";
import { auth } from "@/auth";
import db from "@/db";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

interface ICreateFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}
export const createTopic = async (formState: ICreateFormState, formData: FormData): Promise<ICreateFormState> => {
  const name = formData.get("name");
  const description = formData.get("description");
  const session = await auth();

  const createTopicSchema = z.object({
    name: z.string().min(3, "Name must contain at least 3 character(s)"),
    description: z.string().min(10, "Description must contain at least 10 character(s)"),
  });

  let result = createTopicSchema.safeParse({ name, description });
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

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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

  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
};

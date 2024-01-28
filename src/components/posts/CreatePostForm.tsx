"use client";

import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions/createPost";
import FormButton from "@/components/FormButton";

type CreatePostFormProps = {
  slug: string;
}

const CreatePostForm = ({slug}: CreatePostFormProps) => {
  let [formState, action] = useFormState(actions.createPost.bind(null, slug), {
    errors: {},
  });

  return (
    <Popover placement="left-start">
      <PopoverTrigger>
        <Button type="button">Create a post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Enter title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Enter content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="bg-red-200 p-2 rounded-md">
                <p className="text-red-500">{formState.errors._form}</p>
              </div>
            ) : null}
            <FormButton>Create</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default CreatePostForm;

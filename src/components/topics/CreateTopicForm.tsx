"use client";

import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions/createTopic";
import FormButton from "@/components/FormButton";

const CreateTopicForm = () => {
  let [formState, action] = useFormState(actions.createTopic, {
    errors: {},
  });

  return (
    <Popover placement="left-start">
      <PopoverTrigger>
        <Button type="button">New Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Enter topic name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Enter description"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="bg-red-200 p-2 rounded-md">
                <p className="text-red-500">{formState.errors._form}</p>
              </div>
            ) : null}
            <FormButton>Save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default CreateTopicForm;

"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

type FormButtonProps = {
  children: React.ReactNode;
};

const FormButton = ({ children }: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" color="primary" variant="solid" isLoading={pending}>
      {children}
    </Button>
  );
};

export default FormButton;

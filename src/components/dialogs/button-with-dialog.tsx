import { ReactNode, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";

export type ButtonWithDialogProps = {
  label: string;
  labelProps?: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    };
  dialog: ({
    isOpen,
    setIsOpen,
  }: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  }) => ReactNode;
};

const ButtonWithDialog = ({
  label,
  labelProps,
  dialog,
}: ButtonWithDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button {...labelProps}>{label}</Button>

      {isOpen &&
        dialog({
          isOpen,
          setIsOpen,
        })}
    </>
  );
};

export default ButtonWithDialog;

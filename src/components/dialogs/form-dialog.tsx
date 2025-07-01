import { useRef } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  UseFormReturn,
} from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export interface BaseModalProps<T extends FieldValues> {
  title?: string;
  saveLabel?: string;
  open: boolean;
  children: React.ReactNode;
  isLoadingSubmit?: boolean;
  footer?: ({ handleSubmit }: { handleSubmit: () => void }) => React.ReactNode;
  formMethods: UseFormReturn<T>;
  onClose: () => void;
  onSubmit: (data: T) => void;
}

const FormDialog = <T extends FieldValues>({
  title = "Name Modal",
  saveLabel = "Save",
  open,
  children,
  formMethods,

  isLoadingSubmit,
  onClose,
  onSubmit,
  footer,
}: BaseModalProps<T>) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const onError: SubmitErrorHandler<T> = (errors) => {
    const firstError = Object.keys(errors)[0];

    const el = document.querySelector(`[name="${firstError}"]`);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <FormProvider {...formMethods}>
              <form
                ref={formRef}
                onSubmit={formMethods.handleSubmit(onSubmit, onError)}
              >
                {children}
              </form>
            </FormProvider>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {footer ? (
            footer({ handleSubmit })
          ) : (
            <>
              <Button onClick={onClose} color="secondary">
                Close
              </Button>

              <Button
                type="submit"
                disabled={isLoadingSubmit}
                onClick={handleSubmit}
              >
                {isLoadingSubmit ? "Loading..." : saveLabel}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;

import { FormHTMLAttributes } from "react";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

interface FormProviderProps extends FormHTMLAttributes<HTMLFormElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<any>;
}

export default function FormProvider(props: FormProviderProps) {
  const { children, methods, ...rest } = props;

  return (
    <Form {...methods}>
      <form {...rest}>{children}</form>
    </Form>
  );
}

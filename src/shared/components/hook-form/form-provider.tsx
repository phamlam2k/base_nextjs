import { CSSProperties } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  style?: CSSProperties;
  id?: string;
};

export default function FormProvider({
  children,
  methods,
  onSubmit,
  style,
  id,
}: Props) {
  return (
    <Form {...methods}>
      <form
        onSubmit={onSubmit}
        style={style}
        id={id}
      >
        {children}
      </form>
    </Form>
  );
}

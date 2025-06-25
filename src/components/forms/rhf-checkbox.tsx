'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface RHFCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  label: string;
  helperText?: React.ReactNode;
}

export function RHFCheckbox({
  name,
  label,
  helperText,
  className,
}: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('flex flex-col gap-1', className)}>
          <div className="flex items-center gap-2">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor={name}>{label}</Label>
          </div>
          {(!!error || helperText) && (
            <p className="text-sm text-destructive">
              {error ? error.message : helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}

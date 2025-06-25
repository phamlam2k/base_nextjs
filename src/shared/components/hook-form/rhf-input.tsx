'use client';

import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useSettingsContext } from '../setting/context/setting-context';
import { FieldTitle } from './field-title';
import { TBaseFieldProps } from './type';

type Props = React.InputHTMLAttributes<HTMLInputElement> &
  TBaseFieldProps & {
    defaultValue?: string;
    maxLength?: number;
    allowDecimal?: boolean;
    tooltip?: React.ReactNode;
    helperText?: React.ReactNode;
  };

export default function RHFTextField({
  label,
  name,
  title,
  type = 'text',
  isRequire,
  maxLength,
  allowDecimal = true,
  className,
  disabled,
  tooltip,
  helperText,
  ...other
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const settings = useSettingsContext();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col w-full gap-1">
          {title && (
            <FieldTitle
              title={title}
              required={isRequire}
              tooltip={tooltip}
            />
          )}
          <Input
            {...field}
            id={name}
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(e) => {
              const value = e.target.value;
              if (type === 'number') {
                const num = allowDecimal
                  ? parseFloat(value)
                  : parseInt(value, 10);
                field.onChange(isNaN(num) ? '' : num);
              } else {
                field.onChange(value);
              }
            }}
            disabled={disabled}
            maxLength={maxLength}
            placeholder={label}
            className={cn(
              'bg-white',
              disabled && 'bg-muted',
              error && 'border-destructive focus-visible:ring-destructive',
              className
            )}
            {...other}
          />
          {(error || helperText) && (
            <p className="text-sm text-destructive mt-1">
              {error?.message ?? helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}

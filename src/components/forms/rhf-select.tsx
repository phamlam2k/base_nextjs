'use client';

import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { FieldTitle } from '../ui/field-title';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TBaseFieldProps } from '@/types/forms.type';

type TOptionItem = {
  label: string;
  value: string | number;
};

interface RHFMultiSelectProps extends TBaseFieldProps {
  name: string;
  options: TOptionItem[];
  title?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  isRequire?: boolean;
  checkbox?: boolean;
  chip?: boolean;
  className?: string;
}

export function RHFMultiSelect({
  name,
  options,
  title,
  placeholder = 'Select...',
  helperText,
  isRequire,
  checkbox = true,
  chip = false,
}: RHFMultiSelectProps) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      {title && (
        <FieldTitle
          title={title}
          required={isRequire}
        />
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const selectedValues: (string | number)[] = field.value || [];
          const toggleValue = (value: string | number) => {
            if (selectedValues.includes(value)) {
              field.onChange(selectedValues.filter((v) => v !== value));
            } else {
              field.onChange([...selectedValues, value]);
            }
          };

          return (
            <>
              <Popover>
                <PopoverTrigger
                  className={cn(
                    'w-full border rounded-md px-3 py-2 text-left text-sm',
                    'hover:bg-accent hover:text-accent-foreground',
                    error && 'border-destructive focus-visible:ring-destructive'
                  )}
                >
                  {selectedValues.length === 0 ? (
                    <span className="text-muted-foreground">{placeholder}</span>
                  ) : chip ? (
                    <div className="flex flex-wrap gap-1">
                      {options
                        .filter((opt) => selectedValues.includes(opt.value))
                        .map((opt) => (
                          <span
                            key={opt.value}
                            className="text-xs bg-muted px-2 py-0.5 rounded-md"
                          >
                            {opt.label}
                          </span>
                        ))}
                    </div>
                  ) : (
                    options
                      .filter((opt) => selectedValues.includes(opt.value))
                      .map((opt) => opt.label)
                      .join(', ')
                  )}
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          onSelect={() => toggleValue(option.value)}
                          className="flex items-center gap-2"
                        >
                          {checkbox && (
                            <Checkbox
                              checked={selectedValues.includes(option.value)}
                              onCheckedChange={() => toggleValue(option.value)}
                            />
                          )}
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {(error || helperText) && (
                <p className="text-sm text-destructive mt-1">
                  {error?.message ?? helperText}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}

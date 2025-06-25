"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface RHFMultiCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  options: { label: string; value: string }[];
  label?: string;
  row?: boolean;
  helperText?: React.ReactNode;
  spacing?: number;
}

export function RHFMultiCheckbox({
  name,
  options,
  label,
  row,
  helperText,
  className,
}: RHFMultiCheckboxProps) {
  const { control } = useFormContext();

  const getSelected = (selectedItems: string[], item: string) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("space-y-2", className)}>
          {label && <p className="text-sm font-medium">{label}</p>}

          <div
            className={cn("flex flex-wrap", {
              "flex-row gap-x-4": row,
              "flex-col": !row,
            })}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <Checkbox
                  id={`${name}-${option.value}`}
                  checked={field.value?.includes(option.value)}
                  onCheckedChange={() =>
                    field.onChange(getSelected(field.value || [], option.value))
                  }
                />
                <Label htmlFor={`${name}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
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

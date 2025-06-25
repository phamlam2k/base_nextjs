'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface FieldTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  required?: boolean;
  tooltip?: React.ReactNode;
}

export const FieldTitle: React.FC<FieldTitleProps> = ({
  title,
  required,
  tooltip,
  className,
  ...props
}) => {
  if (!title) return null;

  return (
    <div
      className={cn('text-sm font-semibold mb-1 flex items-center', className)}
      {...props}
    >
      {title}
      {required && <span className="text-destructive ml-0.5">*</span>}
      {tooltip && <span className="ml-1">{tooltip}</span>}
    </div>
  );
};

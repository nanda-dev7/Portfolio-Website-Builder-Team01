import * as React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white shadow-sm border border-slate-200',
      glass: 'bg-white/70 backdrop-blur-md border border-white/20 shadow-xl',
      outline: 'bg-transparent border border-slate-200',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-2xl p-6', variants[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

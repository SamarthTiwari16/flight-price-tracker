import React from 'react';
import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({
    className,
    variant = 'primary',
    size = 'default',
    isLoading = false,
    children,
    ...props
}, ref) => {

    const variants = {
        primary: 'bg-brand-500 text-white hover:bg-brand-600 shadow-sm shadow-brand-500/30',
        secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm',
        ghost: 'hover:bg-slate-100 text-slate-600',
        danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-500/30',
        outline: 'border-2 border-brand-500 text-brand-600 hover:bg-brand-50'
    };

    const sizes = {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10 p-2'
    };

    return (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export { Button };

import React from 'react';
import { cn } from '@/lib/cn';

const Badge = ({ className, variant = "default", ...props }) => {
    const variants = {
        default: "border-transparent bg-brand-500 text-white shadow hover:bg-brand-600",
        secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
        outline: "text-slate-950 border-slate-200",
        success: "border-transparent bg-green-500 text-white shadow hover:bg-green-600",
        warning: "border-transparent bg-amber-500 text-white shadow hover:bg-amber-600",
        destructive: "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    );
};

export { Badge };

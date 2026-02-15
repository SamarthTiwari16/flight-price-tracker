import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/cn';

const ErrorBanner = ({ message, onClose, className }) => {
    if (!message) return null;

    return (
        <div className={cn(
            "bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2",
            className
        )}>
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm text-red-700">
                <p className="font-medium">Error</p>
                <p>{message}</p>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="text-red-400 hover:text-red-500 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>
            )}
        </div>
    );
};

export { ErrorBanner };

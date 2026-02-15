import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="h-8 w-8 text-slate-400" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
                <p className="text-slate-500 mb-8">
                    Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
                </p>
                <Link to="/">
                    <Button>Go back home</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;

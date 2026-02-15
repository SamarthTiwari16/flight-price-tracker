import React from 'react';
import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
            <div className="mb-8 text-center">
                <Link to="/" className="inline-flex items-center space-x-2 text-brand-600 mb-4">
                    <Plane className="h-8 w-8" />
                    <span className="text-2xl font-bold">SkyTrack</span>
                </Link>
            </div>

            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                        {subtitle && <p className="text-slate-500 mt-2">{subtitle}</p>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export { AuthLayout };

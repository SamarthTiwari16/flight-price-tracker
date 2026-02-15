import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

// Placeholder user prop until context is ready
const DashboardLayout = ({ children, user, onLogout }) => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar user={user} onLogout={onLogout} />
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export { DashboardLayout };

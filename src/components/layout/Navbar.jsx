import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Placeholder for now, will replace with real context
const Navbar = ({ user, onLogout }) => {
    return (
        <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 text-brand-600 hover:text-brand-700 transition-colors">
                    <Plane className="h-6 w-6" />
                    <span className="text-xl font-bold tracking-tight">SkyTrack</span>
                </Link>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link to="/dashboard" className="text-slate-600 hover:text-brand-500 font-medium text-sm transition-colors">
                                Dashboard
                            </Link>
                            <div className="flex items-center space-x-2 text-slate-600">
                                <div className="bg-slate-100 p-1.5 rounded-full">
                                    <User className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-medium hidden sm:block">{user.email}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={onLogout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Log in</Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm">Sign up</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export { Navbar };

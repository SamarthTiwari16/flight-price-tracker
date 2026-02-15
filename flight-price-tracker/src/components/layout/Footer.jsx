import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
                <p>&copy; {new Date().getFullYear()} SkyTrack. All rights reserved.</p>
                <div className="flex items-center space-x-1 mt-2 md:mt-0">
                    <span>Made with</span>
                    <Heart className="h-3 w-3 text-red-500 fill-current" />
                    <span>for travelers.</span>
                </div>
            </div>
        </footer>
    );
};

export { Footer };

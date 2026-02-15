import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchForm } from '@/components/features/SearchForm';
import { ArrowRight, Bell, TrendingDown, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Landing = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar user={user} onLogout={logout} />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-20 pb-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-white -z-10" />
                    <div className="container mx-auto px-4 text-center max-w-4xl">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-brand-700">
                            Track flight prices.<br />Book at the right time.
                        </h1>
                        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Stop checking prices manually. Tell us where you want to go, and we'll notify you specifically when the price drops below your target.
                        </p>

                        <div className="max-w-3xl mx-auto relative z-10 -mb-20">
                            <SearchForm />
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="pt-32 pb-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Bell className="h-6 w-6 text-brand-500" />}
                                title="Instant Alerts"
                                description="Get notified immediately via email when your tracked flight hits your target price."
                            />
                            <FeatureCard
                                icon={<TrendingDown className="h-6 w-6 text-brand-500" />}
                                title="Price History"
                                description="View historical price trends to understand the best booking window."
                            />
                            <FeatureCard
                                icon={<Shield className="h-6 w-6 text-brand-500" />}
                                title="No Spam"
                                description="We only send alerts when it matters. No marketing fluff, just savings."
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-100 hover:shadow-lg transition-all">
        <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
);

export default Landing;

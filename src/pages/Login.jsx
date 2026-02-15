import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password. Try demo@example.com / password');
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Enter your details to access your account"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <Input
                        type="email"
                        placeholder="demo@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-slate-700">Password</label>
                        <Link to="#" className="text-xs text-brand-600 hover:text-brand-700">Forgot password?</Link>
                    </div>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={isLoading}
                >
                    Sign in
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
                Don't have an account?{' '}
                <Link to="/signup" className="text-brand-600 font-medium hover:text-brand-700">
                    Sign up
                </Link>
            </div>
        </AuthLayout>
    );
};

export default Login;

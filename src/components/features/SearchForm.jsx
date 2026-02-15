import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, DollarSign, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { useFlights } from '@/hooks/useFlights';

const SearchForm = ({ className, onSuccess }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addFlight } = useFlights();
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        date: '',
        targetPrice: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setIsLoading(true);
        try {
            await addFlight({
                ...formData,
                targetPrice: Number(formData.targetPrice)
            });

            if (onSuccess) {
                onSuccess();
                setFormData({ from: '', to: '', date: '', targetPrice: '' });
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Failed to track flight');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`bg-white p-6 rounded-2xl shadow-xl border border-slate-100 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">From</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            className="pl-9"
                            placeholder="Origin (e.g. DEL)"
                            value={formData.from}
                            onChange={(e) => setFormData({ ...formData, from: e.target.value.toUpperCase() })}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">To</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            className="pl-9"
                            placeholder="Destination"
                            value={formData.to}
                            onChange={(e) => setFormData({ ...formData, to: e.target.value.toUpperCase() })}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            type="date"
                            className="pl-9"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Target Price</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            type="number"
                            className="pl-9"
                            placeholder="Limit"
                            value={formData.targetPrice}
                            onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base font-semibold h-14"
                    isLoading={isLoading}
                >
                    {user ? 'Track This Flight' : 'Login to Track'}
                </Button>
            </div>
        </form>
    );
};

export { SearchForm };

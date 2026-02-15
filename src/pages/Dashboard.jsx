import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FlightCard } from '@/components/features/FlightCard';
import { SearchForm } from '@/components/features/SearchForm';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { useAuth } from '@/context/AuthContext';
import { useFlights } from '@/hooks/useFlights';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { flights, fetchFlights, removeFlight, isLoading, error } = useFlights();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchFlights();
    }, [fetchFlights]);

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to stop tracking this flight?')) {
            await removeFlight(id);
        }
    };

    return (
        <DashboardLayout user={user} onLogout={logout}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Manage your tracked flights and alerts.</p>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="shadow-lg shadow-brand-500/20"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Track New Flight
                </Button>
            </div>

            {error && <ErrorBanner message={error} className="mb-6" />}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Track New Flight"
                className="max-w-4xl"
            >
                <SearchForm
                    className="shadow-none border-0 p-0"
                    onSuccess={() => setIsModalOpen(false)}
                />
            </Modal>

            {isLoading && flights.length === 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 rounded-2xl bg-white border border-slate-100 p-6 space-y-4">
                            <Skeleton className="h-8 w-1/3" />
                            <Skeleton className="h-4 w-1/2" />
                            <div className="pt-8 space-y-2">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : flights.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {flights.map(flight => (
                        <FlightCard
                            key={flight.id}
                            flight={flight}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No flights tracked yet</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mt-2 mb-6">
                        Start tracking a flight to get notified when prices drop.
                    </p>
                    <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                        Track your first flight
                    </Button>
                </div>
            )}
        </DashboardLayout>
    );
};

export default Dashboard;

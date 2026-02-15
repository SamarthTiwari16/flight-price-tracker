import { useState, useCallback } from 'react';
import { mockApi } from '@/services/mockAdapter';

export const useFlights = () => {
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFlights = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await mockApi.getFlights();
            setFlights(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch flights');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addFlight = async (flightData) => {
        setIsLoading(true);
        setError(null);
        try {
            const newFlight = await mockApi.trackFlight(flightData);
            setFlights(prev => [...prev, newFlight]);
            return newFlight;
        } catch (err) {
            setError(err.message || 'Failed to track flight');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const removeFlight = async (id) => {
        // Optimistic update
        const previousFlights = [...flights];
        setFlights(prev => prev.filter(f => f.id !== id));

        try {
            await mockApi.deleteFlight(id);
        } catch (err) {
            // Revert if failed
            setFlights(previousFlights);
            setError(err.message || 'Failed to delete flight');
        }
    };

    return {
        flights,
        isLoading,
        error,
        fetchFlights,
        addFlight,
        removeFlight
    };
};

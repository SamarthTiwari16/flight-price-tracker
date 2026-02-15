import { useState, useCallback } from 'react';
import { apiClient } from '@/services/apiClient';
import { ENDPOINTS } from '@/config/api';

export const useFlights = () => {
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFlights = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await apiClient.get(ENDPOINTS.FLIGHTS.LIST);
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

        const isDuplicate = flights.some(
            f => f.from === flightData.from &&
                f.to === flightData.to &&
                f.date === flightData.date
        );

        if (isDuplicate) {
            setIsLoading(false);
            const err = new Error('You are already tracking this flight.');
            setError(err.message);
            throw err;
        }

        try {
            const newFlight = await apiClient.post(ENDPOINTS.FLIGHTS.TRACK, flightData);
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
            await apiClient.delete(ENDPOINTS.FLIGHTS.DELETE(id));
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

import { API_CONFIG } from '@/config/api';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Data
let mockFlights = [
    {
        id: '1',
        from: 'DEL',
        to: 'BOM',
        date: '2024-12-25',
        currentPrice: 4500,
        targetPrice: 4000,
        status: 'watching', // watching, dropped, increased
        lastChecked: new Date().toISOString(),
    },
    {
        id: '2',
        from: 'BLR',
        to: 'DXB',
        date: '2025-01-15',
        currentPrice: 18000,
        targetPrice: 20000,
        status: 'dropped',
        lastChecked: new Date().toISOString(),
    }
];

let mockUser = {
    id: 'u1',
    email: 'demo@example.com',
    name: 'Demo User'
};

export const mockApi = {
    async login(email, password) {
        await delay(API_CONFIG.TIMEOUT);
        if (email === 'demo@example.com' && password === 'password') {
            return {
                user: mockUser,
                token: 'mock-jwt-token-12345'
            };
        }
        throw new Error('Invalid credentials');
    },

    async signup(email, password) {
        await delay(API_CONFIG.TIMEOUT);
        return {
            user: { id: 'u2', email, name: email.split('@')[0] },
            token: 'mock-jwt-token-new-user'
        };
    },

    async getFlights() {
        await delay(API_CONFIG.TIMEOUT);
        return [...mockFlights];
    },

    async trackFlight(flightData) {
        await delay(API_CONFIG.TIMEOUT);
        const newFlight = {
            id: Math.random().toString(36).substr(2, 9),
            ...flightData,
            currentPrice: Math.floor(Math.random() * (flightData.targetPrice * 1.5 - flightData.targetPrice * 0.8) + flightData.targetPrice * 0.8), // Random price around target
            status: 'watching',
            lastChecked: new Date().toISOString(),
        };
        mockFlights.push(newFlight);
        return newFlight;
    },

    async deleteFlight(id) {
        await delay(API_CONFIG.TIMEOUT);
        mockFlights = mockFlights.filter(f => f.id !== id);
        return { success: true };
    }
};

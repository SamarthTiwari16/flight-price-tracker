import { API_CONFIG, ENDPOINTS } from '@/config/api';
import { mockApi } from './mockAdapter';

// Helper to handle response
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.status}`);
    }
    return response.json();
};

// Generic request handler
const request = async (endpoint, options = {}) => {
    // Mock API Mode
    if (API_CONFIG.USE_MOCK) {
        console.log(`[Mock API] ${options.method || 'GET'} ${endpoint}`);

        // Simulate 5% random failure
        if (Math.random() < 0.05) {
            // Small delay even for errors
            await new Promise(r => setTimeout(r, 500));
            throw new Error('Random API Failure (Simulated)');
        }

        // Route to mock functions
        switch (true) {
            case endpoint === ENDPOINTS.AUTH.LOGIN:
                return mockApi.login(JSON.parse(options.body).email, JSON.parse(options.body).password);

            case endpoint === ENDPOINTS.AUTH.SIGNUP:
                return mockApi.signup(JSON.parse(options.body).email, JSON.parse(options.body).password);

            case endpoint === ENDPOINTS.FLIGHTS.LIST:
                return mockApi.getFlights();

            case endpoint === ENDPOINTS.FLIGHTS.TRACK:
                return mockApi.trackFlight(JSON.parse(options.body));

            case endpoint.startsWith('/flights/'): // DELETE /flights/:id
                const id = endpoint.split('/').pop();
                return mockApi.deleteFlight(id);

            default:
                throw new Error(`Mock endpoint not implemented: ${endpoint}`);
        }
    }

    // Real API Mode
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });
    return handleResponse(response);
};

export const apiClient = {
    get: (endpoint) => request(endpoint, { method: 'GET' }),
    post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

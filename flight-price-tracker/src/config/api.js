export const API_CONFIG = {
    USE_MOCK: import.meta.env.VITE_USE_MOCK_API !== 'false', // Default to mock if not specified
    BASE_URL: import.meta.env.VITE_API_DIR || 'http://localhost:3000/api',
    TIMEOUT: 1000,
};

export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        SIGNUP: '/auth/signup',
        ME: '/auth/me',
    },
    FLIGHTS: {
        LIST: '/flights',
        TRACK: '/flights/track',
        DELETE: (id) => `/flights/${id}`,
    },
};

const API_URL = 'http://localhost:5000/api';

export const api = {
    auth: {
        signup: async (data: any) => {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return response.json();
        },
        signin: async (data: any) => {
            const response = await fetch(`${API_URL}/auth/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return response.json();
        },
    },
    moods: {
        getAll: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/moods`, {
                headers: { 'x-auth-token': token || '' },
            });
            return response.json();
        },
        add: async (data: { mood: string; note: string }) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/moods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || '',
                },
                body: JSON.stringify(data),
            });
            return response.json();
        },
    },
    users: {
        getProfile: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/users/me`, {
                headers: { 'x-auth-token': token || '' },
            });
            return response.json();
        },
        updateProfile: async (data: any) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || '',
                },
                body: JSON.stringify(data),
            });
            return response.json();
        },
        getMatches: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/users/matches`, {
                headers: { 'x-auth-token': token || '' },
            });
            return response.json();
        },
    },
    supportRooms: {
        getAll: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/support-rooms`, {
                headers: { 'x-auth-token': token || '' },
            });
            return response.json();
        },
        join: async (id: string) => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/support-rooms/join/${id}`, {
                method: 'POST',
                headers: { 'x-auth-token': token || '' },
            });
            return response.json();
        },
        seed: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/support-rooms/seed`, {
                method: 'POST',
                headers: { 'x-auth-token': token || '' },
            });
            return response.json();
        }
    },
    prompts: {
        getAll: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/prompts`, {
                headers: { 'x-auth-token': token || '' },
            });
            return response.json();
        },
        seed: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/prompts/seed`, {
                method: 'POST',
                headers: { 'x-auth-token': token || '' },
            });
            return response.json();
        }
    },
    professional: {
        getDashboardData: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/professional/dashboard`, {
                headers: { 'x-auth-token': token || '' },
            });
            return response.json();
        },
        seed: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/professional/seed`, {
                method: 'POST',
                headers: { 'x-auth-token': token || '' },
            });
            return response.json();
        }
    },
    community: {
        getDashboardData: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/community/dashboard`, {
                headers: { 'x-auth-token': token || '' },
            });
            return response.json();
        },
        seed: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/community/seed`, {
                method: 'POST',
                headers: { 'x-auth-token': token || '' },
            });
            return response.json();
        }
    }
};

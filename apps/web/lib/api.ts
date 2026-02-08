import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

type FetchOptions = RequestInit & {
    headers?: Record<string, string>;
};

async function fetchInternal(endpoint: string, options: FetchOptions = {}) {
    const token = getCookie('token');

    const headers = new Headers(options.headers);

    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
    }

    return data;
}

export const api = {
    get: (endpoint: string) => fetchInternal(endpoint, { method: 'GET' }),
    post: (endpoint: string, body: any) => fetchInternal(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint: string, body: any) => fetchInternal(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    patch: (endpoint: string, body: any) => fetchInternal(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: (endpoint: string) => fetchInternal(endpoint, { method: 'DELETE' }),
};

export const logout = () => {
    deleteCookie('token');
    deleteCookie('user');
    window.location.href = '/login';
};

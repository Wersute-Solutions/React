export const BASE_URL = 'http://localhost:8000/';

export async function getRequest(url, kwargs = {}, headers = {}, auth = false) {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
                ...(auth && { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }),
            },
            ...kwargs,
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch');
        }
        return data;
    } catch (error) {
        return { status: false, message: error.message };
    }
}
export const BASE_URL = 'https://wersute-beta.bhagyaj.in/';

import { refreshToken } from "./auth";

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
        if (response.status === 403) {
            refreshToken();
            return getRequest(url, kwargs, headers, auth);
        }
        return data;
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function postRequest(url, kwargs = {}, headers = {}, auth = false) {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
                ...(auth && { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }),
            },
            body: JSON.stringify(kwargs),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch');
        }
        if (response.status === 403) {
            refreshToken();
            return postRequest(url, kwargs, headers, auth);
        }
        return data;
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function postForm(url, formData, headers = {}, auth = false) {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                ...headers,
                ...(auth && { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }),
            },
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch');
        }
        if (response.status === 403) {
            refreshToken();
            return postRequest(url, formData, headers, auth);
        }
        return data;
    } catch (error) {
        return { status: false, message: error.message };
    }
}


export async function putRequest(url, kwargs = {}, headers = {}, auth = false) {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
                ...(auth && { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }),
            },
            body: JSON.stringify(kwargs),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch');
        }
        if (response.status === 403) {
            refreshToken();
            return putRequest(url, kwargs, headers, auth);
        }
        return data;
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function deleteRequest(url, kwargs = {}, headers = {}, auth = false) {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
                ...(auth && { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }),
            },
            body: JSON.stringify(kwargs),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch');
        }
        if (response.status === 403) {
            refreshToken();
            return deleteRequest(url, kwargs, headers, auth);
        }
        return data;
    } catch (error) {
        return { status: false, message: error.message };
    }
}


import { BASE_URL } from "./api";

export function getAuth() {
    return localStorage.getItem("accessToken");
}

export function setAuth(token) {
    localStorage.setItem("accessToken", token);
}

export function getRefresh() {
    return localStorage.getItem("refreshToken");
}

export function setRefresh(token) {
    localStorage.setItem("refreshToken", token);
}

export function removeAuth() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}



export function setObj(str, data) {
    localStorage.setItem(str, JSON.stringify(data));
}

export function getObj(str) {
    const item = localStorage.getItem(str);
    return JSON.parse(item || "{}");
}

export async function loginUser(kwargs) {
    try {
        const response = await fetch(`${BASE_URL}api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(kwargs)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to login');
        }
        setRefresh(data.refresh);
        setAuth(data.access);
        setObj("user", data.user);
        return { status: true, message: "Login success" };
    } catch (error) {
        return { status: false, message: error.message };
    }
}

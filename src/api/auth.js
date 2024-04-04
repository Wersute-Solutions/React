import { BASE_URL, getRequest } from "./api";

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
        const user = await getCurrentUser();

        setObj("user", user);
        return { status: true, message: "Login success", user: user};
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function refreshToken() {
    try {
        const response = await fetch(`${BASE_URL}api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: getRefresh() })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to refresh');
        }
        setAuth(data.access);
        return { status: true, message: "Refresh success" };
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function signupUser(kwargs) {
    try {
        const response = await fetch(`${BASE_URL}api/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(kwargs)
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to signup');
        }
        return { status: true, message: "Signup success" };
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function refreshAccessToken(refreshToken) {
    try {
        const response = await fetch(`${BASE_URL}api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refreshToken })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to refresh');
        }
        return data.access;
    } catch (error) {
        return null;
    }
}

export async function checkTokenExpire(){
    const accessToken = getAuth();
    const refreshToken = getRefresh();
    
    const expiry = JSON.parse(atob(accessToken.split(".")[1])).exp;
    const currentTime = Math.floor(Date.now() / 1000);

    if (expiry < currentTime) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        if (newAccessToken) {
            setAuth(newAccessToken);
        }
    }

}

export async function getCurrentUser()
{
    const response = await getRequest("api/current-user/", {}, {}, true)
    if (!response.status){
        refreshAccessToken(getRefresh());
    }
    console.log(response);
    
    return response;
}
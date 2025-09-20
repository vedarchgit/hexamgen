const API_BASE_URL = 'http://localhost:8000'; // Your FastAPI backend URL

export const loginUser = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
    }

    return response.json();
};

export const authenticatedRequest = async (url, method = 'GET', body = null) => {
    const token = localStorage.getItem('token');

    const headers = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (body && method !== 'GET' && method !== 'HEAD') {
        headers['Content-Type'] = 'application/json';
    }

    const config = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, config);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `API request to ${url} failed`);
    }

    return response.json();
};

export const uploadFile = async (url, file) => {
    const formData = new FormData();
    formData.append('file', file);

    const headers = {};

    const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'POST',
        headers,
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `File upload to ${url} failed`);
    }

    return response.json();
};

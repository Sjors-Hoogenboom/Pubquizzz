const BASE = import.meta.env.VITE_API_BASE ?? "";

export async function fetchQuizApi({ signal } = {}) {
    const response = await fetch(`${BASE}/api/v1/Pubquiz/latest`, { signal });

    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(text || "Failed to fetch quiz");
    }

    return response.json();
}

async function handleResponse(response) {
    if (!response.ok) {
        const text = await response.text().catch(() => "");
        let message = text || `Error: ${response.status}`;

        try {
            const json = JSON.parse(text);
            message = json.message || "Request failed";
        } catch {
        }
        throw new Error(message);
    }
    return response.json();
}

export async function loginApi(credentials) {
    const response = await fetch(`${BASE}/api/v1/Auth/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return handleResponse(response);
}

export async function registerApi(credentials) {
    const response = await fetch(`${BASE}/api/v1/Auth/register`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return handleResponse(response);
}

export async function fetchDisplayName() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found")
    }
    const response = await fetch(`${BASE}/api/v1/User/displayName`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    return handleResponse(response);
}
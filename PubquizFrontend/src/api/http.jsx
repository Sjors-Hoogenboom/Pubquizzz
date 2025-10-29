export async function fetchQuizApi({ signal } = {}) {
    const BASE = import.meta.env.VITE_API_BASE ?? "";
    const response = await fetch(`${BASE}/latest`, { signal });

    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(text || "Failed to fetch quiz");
    }

    return response.json();
}
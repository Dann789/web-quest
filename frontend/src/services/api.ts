export const API_URL = "http://localhost:3000";

export const getHeaders = () => {
    return {
        "Content-Type": "application/json",
    };
};

export async function fetchUsers() {
    const response = await fetch(`${API_URL}/users`, {
        headers: getHeaders(),
    });
    return response.json();
}

export async function fetchUserById(id: string) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        headers: getHeaders(),
    });
    return response.json();
}

export async function createUser(data: any) {
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function updateUser(id: string, data: any) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function deleteUser(id: string) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    return response.json();
}


const URL_BASE = "http://localhost:3001";

// CRUD favorites

export const getFavorites = async () => {
    const res = await fetch(`${URL_BASE}/favorites`);

    return res.json();
}

export const addFavorites = async (anime) => {
    const res = await fetch(`${URL_BASE}/favorites`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(anime)
    });

    return res.json();
}

export const removeFavorite = async (id) => {
    const res = await fetch(`${URL_BASE}/favorites/${id}`, {method: 'DELETE'});

    return res.json()
}

// CRUD ratings

export const getRating = async () => {
    const res = await fetch(`${URL_BASE}/ratings`);

    return res.json()
}

export const addRating = async (rating) => {
    const res = await fetch(`${URL_BASE}/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rating)
    });

    return res.json()
}

export const updateRating = async (id, rating) => {
    const res = await fetch(`${URL_BASE}/ratings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/josn' },
        body: JSON.stringify(rating)
    });

    return res.json()
}

export const removeRating = async (id) => {
    const res = await fetch(`${URL_BASE}/ratings/${id}`, { method: 'DELETE' });

    return res.json()
}

// CRUD library

export const getLibrary = async () => {
    const res = await fetch(`${URL_BASE}/library`);

    return res.json()
}

export const addLibrary = async (anime) => {
    const res = await fetch(`${URL_BASE}/library`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anime)
    });

    return res.json()
}

export const updateLibrary = async (id, data) => {
    const res = await fetch(`${URL_BASE}/library/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    return res.json()
}

export const removeFromLibrary = async (id) => {
    const res = await fetch(`${URL_BASE}/library/${id}`, {
        method: 'DELETE',
    });

    return res.json()
}

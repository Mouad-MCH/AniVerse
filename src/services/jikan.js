
const URL_BASE = "https://api.jikan.moe/v4";


export const getAnimeById = async (id) => {
    const anime = await fetch(`${URL_BASE}/anime/${id}`);
    const data = await anime.json();

    return data.data
}

export const getTopAnime = async () => {
    const res = await fetch(`${URL_BASE}/top/anime`);
    const data = await res.json();

    return data.data;
}

export const getAnimeCharacters = async (id) => {
    const res = await fetch(`${URL_BASE}/anime/${id}/characters`);
    const data = await res.json();

    return data.data;
}

export const getSeasonalAnime = async () => {
    const res = await fetch(`${URL_BASE}/seasons/now`);
    const data = await res.json();

    return data.data
}

export const searchAnime = async (query) => {
    const res = await fetch(`${URL_BASE}/anime?q=${query}`);
    const data = await res.json();

    return data.data
}

export const getAnimeList = async ({ query = "", genre = "", type = "", page = 1 } = {}) => {
    const params = new URLSearchParams({ page, limit: 20 });
    if(query) params.set("q", query)
    if(genre) params.set("genre", genre)
    if(type)  params.set("type", type)

    const res = await fetch(`${URL_BASE}/anime?${params}`);
    const json = await res.json();

    return {
        data: json.data ?? [],
        totalPages: json.pagination?.last_visible_page ?? 1,
    }
}


export const getCharacterById = async (id) => {
    const res = await fetch(`${URL_BASE}/characters/${id}`);
    const data = await res.json();

    return data.data
}

export const getCharacters = async ({ query = "", page = 1 } = {}) => {
    const params = new URLSearchParams({ page, limit: 24 })
    if (query) params.set("q", query)

    const res  = await fetch(`${URL_BASE}/characters?${params}`)
    const json = await res.json()

    return {
        data:       json.data ?? [],
        totalPages: json.pagination?.last_visible_page ?? 1,
    }
}
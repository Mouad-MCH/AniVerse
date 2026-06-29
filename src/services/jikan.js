
const URL_BASE = "https://api.jikan.moe/v4/";

export const getAnimeById = async (id) => {
    const anime = await fetch(`${URL_BASE}/anime/${id}`);
    const data = anime.json();

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
    const data = await res.json;

    return data.data
}

export const searchAnime = async (query) => {
    const res = await fetch(`${URL_BASE}/anime?q=${query}`);
    const data = await res.json();

    return data.data
}

export const getCharacterById = async (id) => {
    const res = await fetch(`${URL_BASE}/characters/${id}`);
    const data = await res.json();

    return data.data
}
import { useEffect, useState } from "react";
import { getSeasonalAnime, getTopAnime } from "../services/jikan";

export const useLanding = () => {
  const [trending, setTrending] = useState([]);
  const [seasonal, setSeasonal] = useState([]);

  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingSeasonal, setLoadingSeasonal] = useState(true);

  const [errorTrending, setErrorTrending] = useState(null);
  const [errorSeasonal, setErrorSeasonal] = useState(null);

  const fetchTrending = async () => {
    setLoadingTrending(true);
    setErrorTrending(null);
    try {
      const data = await getTopAnime();
      setTrending(data.slice(0, 6));
    } catch (err) {
      setErrorTrending(err);
    } finally {
      setLoadingTrending(false);
    }
  };

  const fetchSeasonal = async () => {
    setLoadingSeasonal(true);
    setErrorSeasonal(null);
    try {
      const data = await getSeasonalAnime();
      setSeasonal(data.slice(0, 12));
    } catch (err) {
      setErrorSeasonal(err);
    } finally {
      setLoadingSeasonal(false);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      await fetchTrending();
      await new Promise((r) => setTimeout(r, 1000));
      await fetchSeasonal();
    };
    fetchAll();
  }, []);

  return {
    trending,
    seasonal,
    loadingTrending,
    loadingSeasonal,
    errorTrending,
    errorSeasonal,
    fetchTrending,
    fetchSeasonal,
  };
};

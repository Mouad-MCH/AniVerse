import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, deleteFavorite } from "../store/favoritesSlice";

const useFavorite = (id, anime) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const favoriteEntry = favorites.find((f) => f.animeId === Number(id)) ?? null;
  const isFavorited = !!favoriteEntry;

  const [toggling, setToggling] = useState(false);

  const handleToggle = async () => {
    if (toggling || !anime) return;
    setToggling(true);
    if (favoriteEntry) {
      await dispatch(deleteFavorite(favoriteEntry.id));
    } else {
      await dispatch(
        addFavorite({
          animeId: Number(id),
          title: anime.title,
          image: anime.images?.jpg?.large_image_url,
          score: anime.score,
          genres: anime.genres?.map((g) => g.name) ?? [],
          episodes: anime.episodes,
        }),
      );
    }
    setToggling(false);
  };

  return { isFavorited, toggling, handleToggle };
};

export default useFavorite;

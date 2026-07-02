import { Compass, Heart } from "lucide-react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteFavorite, fetchFavorites } from "../store/favoritesSlice";
import ErrorMessage from "../components/ui/ErrorMessage";
import EmptyState from "../components/ui/EmptyState";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AnimeGrid from "../components/anime/AnimeGrid";


const Favorites = () => {

  const { items, loading, error } = useSelector(state => state.favorites);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [dispatch])

  if(error) {
    return <ErrorMessage 
            message="Failed to load favorites" 
            detail={error} 
            onRetry={() => dispatch(fetchFavorites())}  
          />
  }

  const handelRemove = (id) => {
    dispatch(deleteFavorite(id))
  }
  

  return (
    <div className="pt-32 pb-24 px-5 md:px-16 max-w-360 mx-auto w-full">
      <div className="text-center mb-16">
        <Heart 
          size={40}
          className="text-primary mx-auto mb-4"
          fill="currentColor"
          strokeWidth={0}
        />
        <h1 className="font-display text-primary uppercase tracking-wide text-4xl mb-2 md:text-5xl">My Favorites</h1>
        <p className="font-body text-on-surface-variant opacity-80">{items.length} anime saved</p>
        <div className="ornamental-divider max-w-xs mx-auto mt-8" />
      </div>

      {
        loading ? (
          <LoadingSpinner variant="skeleton" count={8} />
        ): items.length === 0 ? (
          <EmptyState 
            icon={Compass}
            label="Nothing here yet"
            title="Your favorites list is empty"
            description="Browse the anime catalog and heart the titles you love — they'll appear here."
            action={{ label: "Explore Anime", to: "/anime" }}
          />
        ) : (
          <AnimeGrid animes={items} isFavorit remove={handelRemove} />
        )
      }


    </div>
  )
}

export default Favorites

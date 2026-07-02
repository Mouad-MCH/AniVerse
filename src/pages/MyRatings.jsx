import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Star } from "lucide-react"
import { fetchRatings, editRating, deleteRating } from "../store/ratingsSlice"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import ErrorMessage from "../components/ui/ErrorMessage"
import RatingCard from "../components/ui/RatingCard"
import EmptyState from "../components/ui/EmptyState"



const MyRatings = () => {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(state => state.ratings)

  useEffect(() => {
    dispatch(fetchRatings())
  }, [dispatch])

  const handleEdit   = (id, data) => dispatch(editRating({ id, data }))
  const handleDelete = (id)       => dispatch(deleteRating(id))

  if (loading) return <LoadingSpinner variant="spinner" />

  if (error) return (
    <ErrorMessage
      message="Failed to load your ratings."
      detail={error}
      onRetry={() => dispatch(fetchRatings())}
    />
  )

  return (
    <div className="pt-32 pb-16 px-5 md:px-16 max-w-360 mx-auto w-full">

     
      <header className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl text-primary mb-4 drop-shadow-[0_0_15px_rgba(201,168,76,0.2)]">
          My Ratings
        </h1>
        <p className="font-body text-on-surface-variant">
          Your personal anime reviews
        </p>
        <div className="ornamental-divider max-w-xs mx-auto mt-8" />
      </header>

      {items.length === 0 && (
        <EmptyState 
          icon={Star}
          label="No ratings yet. Rate an anime to see it here."
          action={{label: 'Browes Animes', to: '/anime'}}
        />
      )}

      
      {items.length > 0 && (
        <section className="flex flex-col gap-6 max-w-4xl mx-auto">
          {items.map((entry, i) => (
            <RatingCard
              key={entry.id}
              entry={entry}
              index={i}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}

    </div>
  )
}

export default MyRatings

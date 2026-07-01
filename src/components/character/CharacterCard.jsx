import { Link } from "react-router-dom"

const CharacterCard = ({ character, role }) => {
  const image = character.images?.jpg?.image_url
  const isMain = role === "Main"

  return (
    <Link to={`/characters/${character.mal_id}`} className="char-card group flex flex-col items-center cursor-pointer">

      {/* Image */}
      <div className="relative w-full aspect-square mb-4 overflow-hidden bg-surface-container"
           style={{ border: "2px solid #c9a84c" }}>
        {image
          ? <img
              src={image}
              alt={character.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          : <div className="w-full h-full flex items-center justify-center text-on-surface-variant font-label text-xs uppercase tracking-widest">
              No image
            </div>
        }
        {/* Inner glow overlay */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.2)", transition: "box-shadow 0.4s" }} />
      </div>

      {/* Name */}
      <h3 className="font-headline text-on-surface mb-2 text-center text-base leading-snug">
        {character.name}
      </h3>

      {/* Role badge */}
      {isMain
        ? <span className="font-label text-[10px] bg-primary-container text-on-primary px-3 py-1 uppercase tracking-wider">
            Main
          </span>
        : <span className="font-label text-[10px] border border-primary text-primary px-3 py-1 uppercase tracking-wider bg-transparent">
            Supporting
          </span>
      }

    </Link>
  )
}

export default CharacterCard

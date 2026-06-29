import { CircleUser } from "lucide-react"
import { NavLink } from "react-router-dom"

const links = [
  { to: '/', label: 'Home'},
  { to: '/anime', label: 'Anime'},
  { to: '/characters', label: 'Characters'},
  { to: '/favorites', label: 'Favorites'},
  { to: '/my-library', label: 'My Library'},
  { to: '/dashboard', label: 'Dashboard'}
]

const Navbar = () => {
  return (
    <nav className="bg-surface/70 backdrop-blur-md fixed top-0 w-full z-50 border-b border-outline-variant/30">
      <div className="flex justify-between items-center px-16 py-4 max-w-360 mx-auto">
        <NavLink to="/" className="flex items-center gap-4">
          <span className="font-cinzel text-primary text-2xl font-bold tracking-tighter">
            AniVerse
          </span>
        </NavLink>

        <div className="hidden md:flex items-center gap-8">
          {
            links.map(({to, label}) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({isActive}) => 
                  isActive
                    ? 'text-primary font-bold border-b-2 border-primary pb-1 font-headline text-lg'
                    : 'text-on-surface-variant hover:text-primary transition-colors font-headline text-lg'
                }
              >
                {label}
              </NavLink>
            ))
          }
        </div>

        <span className="material-symbols-outlined text-primary cursor-pointer" style={{ fontSize: 28 }}>
          <CircleUser />
        </span>
      </div>
    </nav>
  )
}

export default Navbar
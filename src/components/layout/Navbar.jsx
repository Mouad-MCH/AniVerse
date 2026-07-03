import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { CircleUser, Menu, X } from "lucide-react"
import { LINKS } from "../../utils/constent.js"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const activeClass   = "text-primary font-bold border-b-2 border-primary pb-1 font-headline text-base"
  const inactiveClass = "text-on-surface-variant hover:text-primary transition-colors font-headline text-base"

  const mobileActiveClass   = "text-primary font-bold font-cinzel text-2xl tracking-widest uppercase"
  const mobileInactiveClass = "text-on-surface-variant hover:text-primary transition-colors font-cinzel text-2xl tracking-widest uppercase"

  return (
    <>
      <nav className="bg-surface/70 backdrop-blur-md fixed top-0 w-full z-50 border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-5 md:px-16 py-4 max-w-360 mx-auto">


          <NavLink to="/" className="font-cinzel text-primary text-2xl font-bold tracking-tighter">
            AniVerse
          </NavLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <CircleUser className="text-primary cursor-pointer hidden md:block" size={26} />

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen(o => !o)}
              className="md:hidden text-primary p-1 transition-transform active:scale-90"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in panel */}
      <div className={`
        fixed top-0 right-0 z-50 h-full w-72 bg-surface border-l border-outline-variant/30
        flex flex-col pt-24 pb-12 px-8
        transition-transform duration-300 ease-in-out md:hidden
        ${open ? "translate-x-0" : "translate-x-full"}
      `}>

        
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className={`absolute top-2.5 -left-4
                     flex items-center justify-center w-8 h-8
                     bg-surface border border-outline-variant/30
                     text-primary hover:text-primary-container hover:bg-surface-container
                     transition-colors ${!open && 'hidden'}`}
        >
          <X size={16} />
        </button>

        
        <div className="ornamental-divider mb-10" />

        <nav className="flex flex-col gap-8">
          {LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => isActive ? mobileActiveClass : mobileInactiveClass}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="ornamental-divider mt-10" />

        <div className="mt-auto flex items-center gap-3 text-on-surface-variant">
          <CircleUser size={20} className="text-primary" />
          <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant">
            Profile
          </span>
        </div>
      </div>
    </>
  )
}

export default Navbar

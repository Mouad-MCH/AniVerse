import { NavLink } from "react-router-dom"
import { LINKS } from "../../utils/constent.js"

const Footer = () => {
  return (
    <footer className="w-full py-16 bg-surface border-t border-outline-variant/20 mt-auto">
      <div className="flex flex-col items-center justify-center text-center px-5 md:px-16 max-w-360 mx-auto">


        <div className="font-cinzel text-primary text-3xl font-bold tracking-tighter mb-8">
          AniVerse
        </div>

        <nav className="flex flex-wrap justify-center gap-8 mb-8">
          {LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `uppercase tracking-wider text-sm transition-colors duration-200 hover:-translate-y-0.5 ${
                  isActive ? "text-primary font-semibold" : "text-on-surface-variant hover:text-primary"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-outline-variant/20 pt-8 w-full max-w-md">
          <p className="text-on-surface-variant/50 text-sm">
            © {new Date().getFullYear()} AniVerse. All rights reserved. Crafted for the eternal wanderer.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer

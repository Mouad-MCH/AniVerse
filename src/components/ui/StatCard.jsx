import { Link } from "react-router-dom"

const StatCard = ({ icon: Icon, label, value, sub, to }) => {
  const Wrapper = to ? Link : "div"

  return (
    <Wrapper
      to={to}
      className={
        `border border-outline-variant bg-surface-container p-8 flex flex-col gap-4 gold-glow` +
        (to ? " cursor-pointer transition-transform hover:-translate-y-1" : "")
      }
    >
      <Icon size={28} className="text-primary" strokeWidth={1.5} />
      <div>
        <p className="font-display text-4xl text-on-surface mb-1">{value}</p>
        <p className="font-label uppercase tracking-widest text-xs text-on-surface-variant">{label}</p>
        {sub && <p className="font-body text-sm text-on-surface-variant/70 mt-2">{sub}</p>}
      </div>
    </Wrapper>
  )
}

export default StatCard

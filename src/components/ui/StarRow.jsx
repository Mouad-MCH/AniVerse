import { Star } from "lucide-react";

const StarRow = ({ score }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 10 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={i < score ? "text-primary" : "text-outline/40"}
        fill={i < score ? "currentColor" : "none"}
        strokeWidth={1.5}
      />
    ))}
  </div>
)

export default StarRow
import { AlertCircle, RefreshCw } from "lucide-react"
import { Link } from "react-router-dom"

const ErrorMessage = ({ message = "Unable to fetch data. Please check your connection and try again.", onRetry, detail }) => {
  return (
    <div className="flex-1 flex items-center flex-col justify-center py-24 px-8 text-center">

      <div className="error_icon mb-8 relative">
        <div className="icon w-24 h-24 border border-error/30 flex items-center justify-center">
          <AlertCircle size={40} className="text-error" strokeWidth={1.2} />
        </div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-error/60" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-error/60" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-error/60" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-error/60" />
      </div>

      <p className="font-label text-error/70 uppercase tracking-widest text-xs mb-4">
        Connection Error
      </p>

      <h2 className="font-headline text-on-surface text-3xl mb-4">
        Something Went Wrong
      </h2>

      <div className="ornamental-divider w-48 mb-6" />

      <p className="font-body text-on-surface-variant mb-8 max-w-md leading-relaxed">
        {message}
      </p>

      {detail && (
        <div className="w-full max-w-md border border-error/20 bg-error-container/10 p-4 mb-10 text-left">
          <p className="font-label text-error/60 uppercase tracking-widest text-xs mb-2">Error Details</p>
          <p className="text-error/80 font-mono text-sm">{detail}</p>
        </div>
      )}

      <div className="flex gap-4">
        {onRetry && (
          <button className="btn-primary flex items-center gap-2" onClick={onRetry}>
            <RefreshCw size={14} />
            Try Again
          </button>
        )}
        <Link to="/">
          <button className="btn-secondary">Go Home</button>
        </Link>
      </div>

    </div>
  )
}

export default ErrorMessage

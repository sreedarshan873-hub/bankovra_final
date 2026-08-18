import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-28 text-center">
      <p className="font-mono text-sm tracking-widest text-gold-dark">ERROR 404</p>
      <h1 className="font-display text-4xl font-semibold text-ink mt-3">This page isn't in our ledger.</h1>
      <p className="mt-3 text-ink/60">
        The page you're looking for may have moved. Head back to the homepage or explore the Bank Directory.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Link to="/" className="rounded-md bg-primary text-paper px-5 py-2.5 text-sm font-semibold hover:bg-navy-700">
          Go home
        </Link>
        <Link to="/banks" className="rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/30">
          Bank Directory
        </Link>
      </div>
    </div>
  )
}

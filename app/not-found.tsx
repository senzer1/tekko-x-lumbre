import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="h-screen flex items-center justify-center px-6 text-center bg-negro">
      <div className="max-w-lg mx-auto">
        {/* Decorative ember glow */}
        <div className="relative mx-auto w-20 h-20 mb-10">
          <div className="absolute inset-0 rounded-full bg-brasa/10 animate-ember-glow" />
          <div className="absolute inset-2 rounded-full bg-brasa/5 animate-ember-glow [animation-delay:1s]" />
          <svg
            className="relative w-full h-full text-brasa/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
            />
          </svg>
        </div>

        <p className="font-body text-xs uppercase tracking-[0.3em] text-oro mb-4">
          Página no encontrada
        </p>

        <h1 className="font-display italic font-light text-[clamp(3rem,8vw,6rem)] text-crema leading-none mb-6">
          404
        </h1>

        <p className="font-body text-sm text-ceniza leading-relaxed mb-10 max-w-sm mx-auto">
          La página que buscas no existe o ha sido trasladada. Vuelve al inicio y descubre lo que LUMBRE tiene preparado.
        </p>

        <Link
          href="/"
          className="
            group relative inline-block px-10 py-4
            border border-crema/20
            font-body text-xs uppercase tracking-[0.2em] text-crema
            overflow-hidden
            transition-colors duration-500
            hover:text-negro
          "
        >
          <span
            className="
              absolute inset-0 bg-crema
              origin-left scale-x-0
              transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
              group-hover:scale-x-100
            "
            aria-hidden="true"
          />
          <span className="relative z-10">Volver al inicio</span>
        </Link>
      </div>
    </section>
  )
}

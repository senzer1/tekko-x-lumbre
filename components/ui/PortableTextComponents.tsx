import type { PortableTextReactComponents } from '@portabletext/react'

/**
 * Custom PortableText rendering components for LUMBRE.
 * Ensures rich text from Sanity matches the design system:
 * - Cormorant Garamond for headings
 * - Montserrat for body text
 * - Brasa accent color for links
 * - Decorative blockquote border
 */
export const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="font-body text-sm md:text-base text-ceniza leading-relaxed">
        {children}
      </p>
    ),
    h3: ({ children }) => (
      <h3 className="font-display italic text-crema text-2xl md:text-3xl leading-tight mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display italic text-crema text-xl md:text-2xl leading-tight mt-6 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative pl-6 py-2 my-6 border-l-2 border-brasa/40">
        <div className="font-display italic text-crema/80 text-base md:text-lg leading-relaxed">
          {children}
        </div>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-crema">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="font-display italic text-crema/90">{children}</em>
    ),
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')
      return (
        <a
          href={href}
          target={isExternal || value?.blank ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="
            relative inline text-brasa
            after:absolute after:bottom-0 after:left-0
            after:w-full after:h-px after:bg-brasa/40
            after:origin-left after:scale-x-0
            after:transition-transform after:duration-300
            hover:after:scale-x-100
          "
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 my-4 ml-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-2 my-4 ml-4 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-4 font-body text-sm text-ceniza leading-relaxed">
        <span className="absolute left-0 top-[0.6em] w-1 h-1 rounded-full bg-brasa/50" />
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="font-body text-sm text-ceniza leading-relaxed marker:text-brasa/60">
        {children}
      </li>
    ),
  },
}

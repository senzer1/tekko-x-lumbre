'use client'

import { useState } from 'react'
import type { EventBanner } from '@/types/sanity'

interface EventBannerProps {
  banner: EventBanner
}

export default function EventBannerComponent({ banner }: EventBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="relative bg-brasa text-crema py-2.5 px-6 text-center z-50">
      <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-4">
        <p className="font-body text-xs uppercase tracking-[0.15em]">
          {banner.text}
          {banner.linkUrl && banner.linkLabel && (
            <>
              {' — '}
              <a
                href={banner.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                {banner.linkLabel}
              </a>
            </>
          )}
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-crema/60 hover:text-crema transition-colors"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

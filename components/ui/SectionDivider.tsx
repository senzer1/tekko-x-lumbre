import ScrollReveal from '@/components/ui/ScrollReveal'

interface SectionDividerProps {
  /** Visual variant: 'line' (default) or 'ornament' */
  variant?: 'line' | 'ornament'
  className?: string
}

/**
 * Decorative divider between major page sections.
 * Reinforces the artisanal, luxury feel of LUMBRE.
 */
export default function SectionDivider({
  variant = 'line',
  className = '',
}: SectionDividerProps) {
  if (variant === 'ornament') {
    return (
      <ScrollReveal>
        <div className={`flex items-center justify-center gap-4 py-8 ${className}`}>
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-ceniza/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-brasa/40 animate-ember-glow" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-ceniza/20" />
        </div>
      </ScrollReveal>
    )
  }

  return (
    <ScrollReveal>
      <div className={`flex justify-center py-4 ${className}`}>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-ceniza/15 to-transparent" />
      </div>
    </ScrollReveal>
  )
}

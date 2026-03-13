import ScrollReveal from './ScrollReveal'

interface SectionTitleProps {
  title: string
  subtitle?: string
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div>
      {subtitle && (
        <ScrollReveal>
          <p className="font-body text-xs uppercase tracking-[0.3em] text-oro mb-4">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
      <ScrollReveal delay={100}>
        <h2 className="font-display italic font-light text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-crema">
          {title}
        </h2>
      </ScrollReveal>
    </div>
  )
}

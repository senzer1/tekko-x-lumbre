interface MapEmbedProps { mapUrl?: string; address?: string }

export default function MapEmbed({ mapUrl, address }: MapEmbedProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-ceniza/10">
      {mapUrl ? (
        <div className="group relative w-full aspect-video">
          <iframe src={mapUrl} title={address ? `Mapa: ${address}` : 'Ubicación'} className="absolute inset-0 w-full h-full rounded-lg border-0 grayscale brightness-75 contrast-110 transition-[filter] duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          <div className="absolute inset-0 rounded-lg bg-negro/20 pointer-events-none transition-opacity duration-700 group-hover:opacity-0" aria-hidden="true" />
        </div>
      ) : (
        <div className="relative w-full aspect-video flex flex-col items-center justify-center bg-tierra/60 rounded-lg">
          <svg className="w-10 h-10 text-brasa/60 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
          {address ? <address className="not-italic text-center px-6"><p className="font-display italic text-crema text-lg">{address}</p></address> : <p className="font-body text-xs text-ceniza uppercase tracking-[0.15em]">Ubicación no disponible</p>}
        </div>
      )}
    </div>
  )
}

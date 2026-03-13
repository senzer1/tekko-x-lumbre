'use client'

import { useState, useCallback, type FormEvent, type ChangeEvent } from 'react'
import type { ReservationFormData } from '@/types/sanity'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const TIME_SLOTS = (() => {
  const s: string[] = []
  for (let h = 18; h <= 23; h++) { s.push(`${String(h).padStart(2, '0')}:00`, `${String(h).padStart(2, '0')}:30`) }
  s.push('00:00', '00:30', '01:00')
  return s
})()

const INIT: ReservationFormData = { nombre: '', email: '', telefono: '', fecha: '', hora: '', comensales: 2, mensaje: '' }

export default function ReservationForm({ phone = '+34 000 000 000' }: { phone?: string }) {
  const [fd, setFd] = useState<ReservationFormData>(INIT)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFd((p) => ({ ...p, [name]: name === 'comensales' ? Number(value) : value }))
    setErrors((p) => ({ ...p, [name]: '' }))
  }, [])

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!fd.nombre.trim()) errs.nombre = 'Obligatorio'
    if (!fd.email.trim()) errs.email = 'Obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email)) errs.email = 'Email no válido'
    if (!fd.telefono.trim()) errs.telefono = 'Obligatorio'
    if (!fd.fecha) errs.fecha = 'Obligatorio'
    if (!fd.hora) errs.hora = 'Obligatorio'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('submitting'); setErrors({})
    try {
      const res = await fetch('/api/reservar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fd) })
      if (!res.ok) throw new Error()
      setStatus('success'); setFd(INIT)
    } catch { setStatus('error') }
  }, [fd])

  const today = new Date().toISOString().split('T')[0]
  const inputCls = (err?: string) => `w-full bg-transparent border-0 border-b py-3 px-0 font-body text-sm text-crema placeholder:text-ceniza/30 transition-colors duration-300 focus:outline-none focus:ring-0 ${err ? 'border-brasa' : 'border-ceniza/20 focus:border-b-brasa'}`

  if (status === 'success') return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 mb-6 rounded-full bg-brasa/15 flex items-center justify-center">
        <svg className="w-8 h-8 text-brasa" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      </div>
      <h3 className="font-display italic text-crema text-2xl mb-3">¡Reserva recibida!</h3>
      <p className="font-body text-ceniza text-sm uppercase tracking-[0.1em]">Te confirmaremos por email.</p>
      <button type="button" onClick={() => setStatus('idle')} className="mt-8 px-6 py-2.5 border border-ceniza/20 rounded-full font-body text-xs text-ceniza uppercase tracking-[0.15em] hover:border-crema/40 hover:text-crema transition-colors">Nueva reserva</button>
    </div>
  )

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {status === 'error' && <div className="p-4 rounded-lg border border-brasa/30 bg-brasa/5 font-body text-sm text-brasa" role="alert">Algo salió mal. Llámanos al <a href={`tel:${phone.replace(/\s/g, '')}`} className="underline">{phone}</a>.</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        <div><label className="block font-body text-xs text-ceniza uppercase tracking-[0.15em] mb-2">Nombre<span className="text-brasa ml-1">*</span></label><input name="nombre" value={fd.nombre} onChange={onChange} placeholder="Tu nombre" className={inputCls(errors.nombre)} />{errors.nombre && <p className="text-xs text-brasa mt-1">{errors.nombre}</p>}</div>
        <div><label className="block font-body text-xs text-ceniza uppercase tracking-[0.15em] mb-2">Email<span className="text-brasa ml-1">*</span></label><input name="email" type="email" value={fd.email} onChange={onChange} placeholder="tu@email.com" className={inputCls(errors.email)} />{errors.email && <p className="text-xs text-brasa mt-1">{errors.email}</p>}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        <div><label className="block font-body text-xs text-ceniza uppercase tracking-[0.15em] mb-2">Teléfono<span className="text-brasa ml-1">*</span></label><input name="telefono" type="tel" value={fd.telefono} onChange={onChange} placeholder="+34 600 000 000" className={inputCls(errors.telefono)} />{errors.telefono && <p className="text-xs text-brasa mt-1">{errors.telefono}</p>}</div>
        <div><label className="block font-body text-xs text-ceniza uppercase tracking-[0.15em] mb-2">Fecha<span className="text-brasa ml-1">*</span></label><input name="fecha" type="date" value={fd.fecha} onChange={onChange} min={today} className={inputCls(errors.fecha)} />{errors.fecha && <p className="text-xs text-brasa mt-1">{errors.fecha}</p>}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        <div><label className="block font-body text-xs text-ceniza uppercase tracking-[0.15em] mb-2">Hora<span className="text-brasa ml-1">*</span></label><select name="hora" value={fd.hora} onChange={onChange} className={`${inputCls(errors.hora)} appearance-none cursor-pointer`}><option value="" disabled>Selecciona hora</option>{TIME_SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}</select>{errors.hora && <p className="text-xs text-brasa mt-1">{errors.hora}</p>}</div>
        <div><label className="block font-body text-xs text-ceniza uppercase tracking-[0.15em] mb-2">Comensales<span className="text-brasa ml-1">*</span></label><select name="comensales" value={String(fd.comensales)} onChange={onChange} className={`${inputCls()} appearance-none cursor-pointer`}>{Array.from({ length: 12 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>)}</select></div>
      </div>
      <div><label className="block font-body text-xs text-ceniza uppercase tracking-[0.15em] mb-2">Mensaje <span className="text-ceniza/40 normal-case tracking-normal">(opcional)</span></label><textarea name="mensaje" rows={3} placeholder="Alergias, celebración especial..." value={fd.mensaje ?? ''} onChange={onChange} className="w-full bg-transparent border-0 border-b border-ceniza/20 py-3 px-0 font-body text-sm text-crema placeholder:text-ceniza/30 focus:border-b-brasa focus:outline-none focus:ring-0 resize-none transition-colors" /></div>
      <div className="pt-4"><button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto px-10 py-4 bg-brasa text-crema font-body text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 hover:bg-brasa/90 hover:shadow-[0_0_30px_rgba(232,82,26,0.2)] disabled:opacity-50 disabled:cursor-not-allowed">{status === 'submitting' ? 'Enviando...' : 'Reservar mesa'}</button></div>
    </form>
  )
}

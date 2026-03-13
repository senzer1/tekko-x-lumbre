'use client'

import { useEffect, useRef } from 'react'

/**
 * CustomCursor — a smooth-following circle cursor with hover expansion.
 * Uses requestAnimationFrame lerp for fluid movement.
 * - Expands and changes color on links/buttons via MutationObserver.
 * - Properly cleans up all event listeners to prevent memory leaks.
 * - Hidden on touch devices and when prefers-reduced-motion is set.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    if (window.matchMedia('(pointer: coarse)').matches) {
      cursor.style.display = 'none'
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cursor.style.display = 'none'
      return
    }

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    const onEnter = () => cursor.classList.add('hover')
    const onLeave = () => cursor.classList.remove('hover')

    // Track which elements have listeners for proper cleanup
    const trackedElements = new Set<Element>()

    function attachListeners(el: Element) {
      if (trackedElements.has(el)) return
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
      trackedElements.add(el)
    }

    function scanForTargets() {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(attachListeners)
    }

    const lerp = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`
      rafId = requestAnimationFrame(lerp)
    }

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(lerp)
    scanForTargets()

    const observer = new MutationObserver(scanForTargets)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()

      // Clean up all tracked element listeners
      trackedElements.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      trackedElements.clear()
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" />
}

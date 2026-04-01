export const MOBILE_BREAKPOINT = 480
export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT}px)`

export function syncViewportModeClass () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT
  document.documentElement.classList.toggle('is-mobile', isMobile)
}

export function initViewportModeWatcher () {
  if (typeof window === 'undefined') return
  syncViewportModeClass()
  window.addEventListener('resize', syncViewportModeClass, { passive: true })
}

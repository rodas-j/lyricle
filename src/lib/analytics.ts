// Analytics integration for Google Analytics and Plausible

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
    plausible?: (...args: any[]) => void
  }
}

// Google Analytics
export const initGoogleAnalytics = () => {
  const measurementId = import.meta.env.VITE_GOOGLE_MEASUREMENT_ID

  if (!measurementId) return

  // Load gtag script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments)
  }

  window.gtag('js', new Date())
  window.gtag('config', measurementId)
}

// Plausible Analytics
export const initPlausible = () => {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN

  if (!domain) return

  // Load Plausible script
  const script = document.createElement('script')
  script.defer = true
  script.setAttribute('data-domain', domain)
  script.src = 'https://plausible.io/js/plausible.js'
  document.head.appendChild(script)
}

// Initialize all analytics in production
export const initAnalytics = () => {
  if (import.meta.env.PROD) {
    initGoogleAnalytics()
    initPlausible()
  }
}

"use client"

import { useEffect } from "react"

export function PerformanceOptimizer() {
  useEffect(() => {
    const preloadCriticalResources = () => {
      const criticalImages = ["/images/hero-cortinas-metalicas.jpg", "/images/logo-monaco-cortinas.webp"]

      criticalImages.forEach((src) => {
        const link = document.createElement("link")
        link.rel = "preload"
        link.as = "image"
        link.href = src
        link.type = "image/webp"
        document.head.appendChild(link)
      })
    }

    const setupLazyLoading = () => {
      if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              if (img.dataset.src) {
                img.src = img.dataset.src
                img.classList.remove("lazy")
                observer.unobserve(img)
              }
            }
          })
        })

        document.querySelectorAll("img[data-src]").forEach((img) => {
          imageObserver.observe(img)
        })
      }
    }

    const optimizeCoreWebVitals = () => {
      // Reducir CLS (Cumulative Layout Shift)
      const images = document.querySelectorAll("img:not([width]):not([height])")
      images.forEach((img) => {
        if (!img.getAttribute("width") && !img.getAttribute("height")) {
          img.style.aspectRatio = "16/9"
        }
      })

      // Mejorar FID (First Input Delay)
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          // Cargar scripts no críticos
          const scripts = ["https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"]

          scripts.forEach((src) => {
            const script = document.createElement("script")
            script.src = src
            script.async = true
            document.head.appendChild(script)
          })
        })
      }
    }

    const registerServiceWorker = () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("[v0] SW registered:", registration)
          })
          .catch((error) => {
            console.log("[v0] SW registration failed:", error)
          })
      }
    }

    preloadCriticalResources()
    setupLazyLoading()
    optimizeCoreWebVitals()
    registerServiceWorker()

    return () => {
      // Cleanup observers if needed
    }
  }, [])

  return null
}

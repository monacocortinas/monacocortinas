"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface PerformanceOptimizerProps {
  children?: React.ReactNode
}

export function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const loadNonCriticalScripts = () => {
      // Cargar Google Tag Manager de forma diferida solo después de la interacción del usuario
      const loadGTM = () => {
        if (!document.querySelector('script[src*="googletagmanager"]')) {
          const script = document.createElement("script")
          script.src = "https://www.googletagmanager.com/gtag/js?id=AW-17509790251"
          script.async = true
          document.head.appendChild(script)
        }
      }

      const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]

      const loadScriptsOnInteraction = () => {
        loadGTM()
        events.forEach((event) => {
          document.removeEventListener(event, loadScriptsOnInteraction, true)
        })
      }

      // Cargar después de 3 segundos o primera interacción
      setTimeout(loadGTM, 3000)
      events.forEach((event) => {
        document.addEventListener(event, loadScriptsOnInteraction, true)
      })
    }

    const optimizeImages = () => {
      if (isMobile) {
        const images = document.querySelectorAll('img[loading="lazy"]')
        images.forEach((img) => {
          const imageElement = img as HTMLImageElement
          // Reducir calidad de imágenes en móviles
          if (imageElement.src.includes("placeholder.svg")) {
            imageElement.src = imageElement.src.replace("&width=384", "&width=256")
          }
        })
      }
    }

    const implementPreloading = () => {
      // Precargar recursos críticos solo en móviles
      if (isMobile) {
        const criticalResources = ["/images/logo-monaco.webp", "/modern-industrial-building-with-metal-shutters.webp"]

        criticalResources.forEach((resource) => {
          const link = document.createElement("link")
          link.rel = "preload"
          link.as = "image"
          link.href = resource
          link.fetchPriority = "high"
          document.head.appendChild(link)
        })
      }
    }

    const timer = setTimeout(() => {
      loadNonCriticalScripts()
      optimizeImages()
      implementPreloading()
      setIsLoaded(true)
    }, 100)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", checkMobile)
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile && isLoaded) {
      // Reducir animaciones en móviles para mejor rendimiento
      document.documentElement.style.setProperty("--animation-duration", "0.2s")

      // Optimizar scroll en móviles
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [isMobile, isLoaded])

  return <>{children}</>
}

export function useCriticalResourcesLoaded() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const checkCriticalResources = () => {
      const logo = document.querySelector('img[alt*="Logo oficial"]') as HTMLImageElement
      const heroImage = document.querySelector('[style*="modern-industrial-building"]')

      if (logo?.complete && heroImage) {
        setLoaded(true)
      }
    }

    // Verificar inmediatamente y luego cada 100ms hasta que se carguen
    checkCriticalResources()
    const interval = setInterval(checkCriticalResources, 100)

    // Timeout de seguridad después de 2 segundos
    const timeout = setTimeout(() => {
      setLoaded(true)
      clearInterval(interval)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return loaded
}

"use client"

import { useEffect } from "react"

declare const gtag: (action: string, params: { name: string; value: number; event_category: string }) => void

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== "undefined" && "performance" in window) {
      // LCP - Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log("[Performance] LCP:", lastEntry.startTime)

        // Enviar a analytics si es necesario
        if (typeof gtag !== "undefined") {
          gtag("event", "web_vitals", {
            name: "LCP",
            value: Math.round(lastEntry.startTime),
            event_category: "Web Vitals",
          })
        }
      }).observe({ entryTypes: ["largest-contentful-paint"] })

      // FID - First Input Delay
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry) => {
          console.log("[Performance] FID:", entry.processingStart - entry.startTime)

          if (typeof gtag !== "undefined") {
            gtag("event", "web_vitals", {
              name: "FID",
              value: Math.round(entry.processingStart - entry.startTime),
              event_category: "Web Vitals",
            })
          }
        })
      }).observe({ entryTypes: ["first-input"] })

      // CLS - Cumulative Layout Shift
      let clsValue = 0
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        console.log("[Performance] CLS:", clsValue)

        if (typeof gtag !== "undefined") {
          gtag("event", "web_vitals", {
            name: "CLS",
            value: Math.round(clsValue * 1000),
            event_category: "Web Vitals",
          })
        }
      }).observe({ entryTypes: ["layout-shift"] })

      const criticalResources = ["/images/hero-cortinas-metalicas.jpg", "/images/logo-monaco.webp"]

      criticalResources.forEach((resource) => {
        const link = document.createElement("link")
        link.rel = "preload"
        link.as = resource.includes(".webp") ? "image" : "image"
        link.href = resource
        if (resource.includes("hero")) {
          link.fetchPriority = "high"
        }
        document.head.appendChild(link)
      })

      if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement
                if (img.dataset.src) {
                  img.src = img.dataset.src
                  img.removeAttribute("data-src")
                  imageObserver.unobserve(img)
                }
              }
            })
          },
          {
            rootMargin: "50px 0px",
          },
        )

        // Observar imágenes lazy
        setTimeout(() => {
          document.querySelectorAll("img[data-src]").forEach((img) => {
            imageObserver.observe(img)
          })
        }, 100)
      }
    }
  }, [])

  return null
}

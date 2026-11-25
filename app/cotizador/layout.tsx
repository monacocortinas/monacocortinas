import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cotizador Online de Cortinas Metálicas | Presupuesto Instantáneo",
  description:
    "Calculadora profesional para cortinas metálicas. Obtén tu presupuesto detallado al instante con precios actualizados. Incluye materiales, instalación y accesorios.",
  keywords: [
    "cotizador cortinas metálicas",
    "calculadora presupuesto cortinas",
    "precio cortinas metálicas online",
    "presupuesto instantáneo cortinas",
    "calculadora cortinas Buenos Aires",
    "cotización online cortinas",
    "precio instalación cortinas",
    "presupuesto cortinas comerciales",
    "calculadora cortinas industriales",
    "cotizador cortinas residenciales",
  ],
  openGraph: {
    title: "Cotizador Online de Cortinas Metálicas | Presupuesto Instantáneo",
    description:
      "Calculadora profesional para cortinas metálicas. Obtén tu presupuesto detallado al instante con precios actualizados.",
    url: "https://monacocortinas.com.ar/cotizador",
    images: [
      {
        url: "https://monacocortinas.com.ar/images/cotizador-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cotizador Online de Cortinas Metálicas Mónaco",
      },
    ],
  },
  twitter: {
    title: "Cotizador Online de Cortinas Metálicas | Presupuesto Instantáneo",
    description: "Calculadora profesional para cortinas metálicas. Obtén tu presupuesto detallado al instante.",
  },
  alternates: {
    canonical: "https://monacocortinas.com.ar/cotizador",
  },
}

export default function CotizadorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Cotizador de Cortinas Metálicas Mónaco",
            description: "Calculadora online profesional para obtener presupuestos instantáneos de cortinas metálicas",
            url: "https://monacocortinas.com.ar/cotizador",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "ARS",
              description: "Cotización gratuita e instantánea",
            },
            provider: {
              "@type": "Organization",
              name: "Mónaco Cortinas Metálicas",
              url: "https://monacocortinas.com.ar",
            },
            featureList: [
              "Cálculo automático de materiales",
              "Presupuesto detallado instantáneo",
              "Incluye mano de obra",
              "Opciones de accesorios",
              "Precios actualizados",
              "Exportación de presupuesto",
            ],
          }),
        }}
      />
      {children}
    </>
  )
}

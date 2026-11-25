import type { Metadata } from "next"

interface SEOMetaTagsProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "product" | "service"
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

export function generateSEOMetadata({
  title = "🥇 Mónaco Cortinas Metálicas - Líderes en Seguridad Buenos Aires",
  description = "🏆 LÍDERES en cortinas metálicas premium ✅ +20 años experiencia ✅ Fabricación propia ✅ Instalación 24/7 ✅ Garantía extendida ✅ Presupuesto GRATIS",
  keywords = [],
  image = "https://monacocortinas.com.ar/images/og-image-main.jpg",
  url = "https://monacocortinas.com.ar",
  type = "website",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
}: SEOMetaTagsProps): Metadata {
  const baseKeywords = [
    "cortinas metálicas buenos aires",
    "fabricación cortinas metálicas",
    "instalación cortinas 24hs",
    "reparación cortinas emergencia",
    "cortinas automatizadas motor",
    "monaco cortinas metalicas",
    "cortinas comerciales industriales",
    "herrería especializada",
    "seguridad comercial",
    "presupuesto gratis cortinas",
  ]

  const allKeywords = [...baseKeywords, ...keywords]

  return {
    title,
    description,
    keywords: allKeywords,
    openGraph: {
      title,
      description,
      url,
      siteName: "Mónaco Cortinas Metálicas",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "es_AR",
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      site: "@MonacoCortinas",
      creator: "@MonacoCortinas",
    },
    alternates: {
      canonical: url,
    },
    other: {
      "article:author": "Mónaco Cortinas Metálicas",
      "article:publisher": "https://www.facebook.com/MonacoCortinas",
      "business:contact_data:phone_number": "+5411-2881-7818",
      "business:contact_data:email": "Monaco.cor@gmail.com",
      "geo.region": "AR-B",
      "geo.placename": "El Jagüel, Buenos Aires",
      "geo.position": "-34.84384;-58.5061296",
    },
  }
}

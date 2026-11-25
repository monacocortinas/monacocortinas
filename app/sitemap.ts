import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://monacocortinas.com.ar"

  // URLs principales
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/cotizador`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tablillas`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ]

  // URLs de servicios específicos
  const servicePages = [
    "cortinas-metalicas-comerciales",
    "cortinas-metalicas-industriales",
    "cortinas-metalicas-residenciales",
    "motores-automatizados",
    "reparacion-urgente-24hs",
    "cortinas-microperforadas",
    "cortinas-galvanizadas",
    "herreria-especializada",
    "automatizacion-domotica",
    "servicio-tecnico",
  ].map((service) => ({
    url: `${baseUrl}/${service}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // URLs por zonas geográficas
  const locationPages = [
    "lomas-de-zamora",
    "quilmes",
    "avellaneda",
    "lanus",
    "florencio-varela",
    "berazategui",
    "almirante-brown",
    "esteban-echeverria",
    "ezeiza",
    "la-matanza",
    "merlo",
    "moron",
    "tres-de-febrero",
    "san-martin",
    "vicente-lopez",
    "san-isidro",
    "tigre",
    "san-fernando",
    "la-plata",
    "capital-federal",
    "zona-sur",
    "zona-oeste",
    "zona-norte",
  ].map((location) => ({
    url: `${baseUrl}/cortinas-metalicas-${location}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...mainPages, ...servicePages, ...locationPages]
}

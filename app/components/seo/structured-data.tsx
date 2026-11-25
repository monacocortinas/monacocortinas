export function StructuredData({ type = "homepage", data = {} }: { type?: string; data?: any }) {
  const getStructuredData = () => {
    const baseOrganization = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://monacocortinas.com.ar/#business",
      name: "Mónaco Cortinas Metálicas",
      alternateName: ["Monaco Cortinas", "Mónaco Cortinas", "Monaco Cortinas Metálicas"],
      description:
        "Empresa líder en fabricación e instalación de cortinas metálicas premium con más de 20 años de experiencia en Buenos Aires",
      url: "https://monacocortinas.com.ar",
      telephone: ["+54-11-2881-7818", "+54-9-11-4439-3030"],
      email: "Monaco.cor@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mariano Castex 100",
        addressLocality: "El Jagüel",
        addressRegion: "Buenos Aires",
        postalCode: "B1805",
        addressCountry: "AR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -34.84384,
        longitude: -58.5061296,
      },
      openingHours: "Mo-Su 00:00-23:59",
      priceRange: "$$-$$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "247",
        bestRating: "5",
      },
    }

    switch (type) {
      case "service":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          name: data.name || "Fabricación de Cortinas Metálicas",
          description: data.description || "Servicio profesional de fabricación e instalación de cortinas metálicas",
          provider: baseOrganization,
          areaServed: "Buenos Aires, Argentina",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Servicios de Cortinas Metálicas",
            itemListElement: data.services || [],
          },
        }

      case "product":
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          name: data.name || "Cortina Metálica Premium",
          description: data.description || "Cortina metálica de máxima calidad con garantía extendida",
          brand: {
            "@type": "Brand",
            name: "Mónaco Cortinas Metálicas",
          },
          manufacturer: baseOrganization,
          offers: {
            "@type": "Offer",
            price: data.price || "120000",
            priceCurrency: "ARS",
            availability: "https://schema.org/InStock",
            seller: baseOrganization,
          },
        }

      case "faq":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.questions || [],
        }

      default:
        return {
          "@context": "https://schema.org",
          "@graph": [
            baseOrganization,
            {
              "@type": "WebSite",
              "@id": "https://monacocortinas.com.ar/#website",
              url: "https://monacocortinas.com.ar",
              name: "Mónaco Cortinas Metálicas",
              publisher: { "@id": "https://monacocortinas.com.ar/#business" },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://monacocortinas.com.ar/?s={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  )
}

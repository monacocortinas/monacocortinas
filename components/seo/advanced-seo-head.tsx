export function AdvancedSEOHead() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LocalBusiness",
                "@id": "https://monacocortinas.com.ar/#business",
                name: "Mónaco Cortinas Metálicas",
                alternateName: ["Monaco Cortinas", "Mónaco Cortinas", "Monaco Cortinas Metálicas"],
                description:
                  "Empresa líder en fabricación e instalación de cortinas metálicas premium con más de 20 años de experiencia en Buenos Aires. Servicio 24/7, garantía extendida y presupuestos gratuitos.",
                url: "https://monacocortinas.com.ar",
                telephone: ["+54-11-2881-7818", "+54-9-11-4439-3030"],
                email: "Monaco.cor@gmail.com",
                priceRange: "$$-$$$",
                paymentAccepted: [
                  "Efectivo",
                  "Transferencia Bancaria",
                  "Tarjeta de Crédito",
                  "Tarjeta de Débito",
                  "Mercado Pago",
                ],
                currenciesAccepted: "ARS",
                openingHours: ["Mo-Su 00:00-23:59"],
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    opens: "00:00",
                    closes: "23:59",
                  },
                ],
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
                areaServed: [
                  {
                    "@type": "City",
                    name: "Buenos Aires",
                  },
                  {
                    "@type": "City",
                    name: "Capital Federal",
                  },
                  {
                    "@type": "State",
                    name: "Buenos Aires",
                  },
                  {
                    "@type": "City",
                    name: "Lomas de Zamora",
                  },
                  {
                    "@type": "City",
                    name: "Quilmes",
                  },
                  {
                    "@type": "City",
                    name: "Avellaneda",
                  },
                ],
                serviceArea: {
                  "@type": "GeoCircle",
                  geoMidpoint: {
                    "@type": "GeoCoordinates",
                    latitude: -34.84384,
                    longitude: -58.5061296,
                  },
                  geoRadius: "100000",
                },
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Servicios Profesionales de Cortinas Metálicas",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      name: "Fabricación de Cortinas Metálicas Premium",
                      description:
                        "Fabricación propia con materiales de primera calidad, chapa galvanizada y acabados premium",
                      price: "Consultar",
                      priceCurrency: "ARS",
                      availability: "https://schema.org/InStock",
                      itemOffered: {
                        "@type": "Service",
                        name: "Fabricación de Cortinas Metálicas",
                        serviceType: "Fabricación Industrial",
                        provider: {
                          "@id": "https://monacocortinas.com.ar/#business",
                        },
                      },
                    },
                    {
                      "@type": "Offer",
                      name: "Instalación Profesional 24/7",
                      description: "Instalación profesional disponible las 24 horas, todos los días del año",
                      price: "Incluido",
                      priceCurrency: "ARS",
                      availability: "https://schema.org/InStock",
                      itemOffered: {
                        "@type": "Service",
                        name: "Instalación de Cortinas Metálicas",
                        serviceType: "Instalación Profesional",
                        provider: {
                          "@id": "https://monacocortinas.com.ar/#business",
                        },
                      },
                    },
                    {
                      "@type": "Offer",
                      name: "Reparación y Mantenimiento 24hs",
                      description: "Servicio de reparación urgente disponible 24 horas para emergencias",
                      price: "Desde $15000",
                      priceCurrency: "ARS",
                      availability: "https://schema.org/InStock",
                      itemOffered: {
                        "@type": "Service",
                        name: "Reparación de Cortinas Metálicas",
                        serviceType: "Reparación de Emergencia",
                        provider: {
                          "@id": "https://monacocortinas.com.ar/#business",
                        },
                      },
                    },
                    {
                      "@type": "Offer",
                      name: "Automatización con Motores Premium",
                      description: "Sistemas de automatización con motores de alta calidad y control remoto",
                      price: "Desde $80000",
                      priceCurrency: "ARS",
                      availability: "https://schema.org/InStock",
                      itemOffered: {
                        "@type": "Service",
                        name: "Automatización de Cortinas",
                        serviceType: "Automatización Industrial",
                        provider: {
                          "@id": "https://monacocortinas.com.ar/#business",
                        },
                      },
                    },
                  ],
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  reviewCount: "247",
                  bestRating: "5",
                  worstRating: "1",
                },
                review: [
                  {
                    "@type": "Review",
                    author: {
                      "@type": "Person",
                      name: "Lu De Lu",
                    },
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                    reviewBody:
                      "Excelente servicio, instalaron mi cortina en tiempo récord y la calidad es superior. El motor automatizado funciona perfecto después de 2 años. Muy recomendable.",
                    datePublished: "2024-01-15",
                  },
                  {
                    "@type": "Review",
                    author: {
                      "@type": "Person",
                      name: "Julieta Pereyra",
                    },
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                    reviewBody:
                      "Más de 3 años con la cortina funcionando perfectamente. El motor automatizado es una maravilla y el servicio post-venta excelente.",
                    datePublished: "2024-02-20",
                  },
                  {
                    "@type": "Review",
                    author: {
                      "@type": "Person",
                      name: "Tiara Cancinos",
                    },
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                    reviewBody:
                      "Profesionales de primera. Vinieron un domingo por una emergencia y solucionaron todo en 2 horas. Precios justos y trabajo impecable.",
                    datePublished: "2024-03-10",
                  },
                ],
                sameAs: [
                  "https://www.facebook.com/MonacoCortinas",
                  "https://www.instagram.com/monacocortinas",
                  "https://wa.me/5491144393030",
                  "https://www.linkedin.com/company/monaco-cortinas",
                  "https://www.youtube.com/channel/MonacoCortinas",
                ],
                founder: {
                  "@type": "Person",
                  name: "Juan Carlos Mónaco",
                },
                foundingDate: "2000-01-01",
                numberOfEmployees: {
                  "@type": "QuantitativeValue",
                  minValue: 15,
                  maxValue: 25,
                },
                slogan: "Cortinas metálicas de máxima calidad - Líderes en seguridad",
                knowsAbout: [
                  "Fabricación de cortinas metálicas",
                  "Instalación profesional",
                  "Automatización industrial",
                  "Herrería especializada",
                  "Seguridad comercial",
                  "Motores para cortinas",
                  "Mantenimiento preventivo",
                ],
              },
              {
                "@type": "WebSite",
                "@id": "https://monacocortinas.com.ar/#website",
                url: "https://monacocortinas.com.ar",
                name: "Mónaco Cortinas Metálicas - Líderes en Seguridad",
                description:
                  "Sitio web oficial de Mónaco Cortinas Metálicas, especialistas en fabricación e instalación de cortinas metálicas premium en Buenos Aires",
                publisher: {
                  "@id": "https://monacocortinas.com.ar/#business",
                },
                potentialAction: [
                  {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://monacocortinas.com.ar/?s={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                ],
                mainEntity: {
                  "@id": "https://monacocortinas.com.ar/#business",
                },
              },
              {
                "@type": "Organization",
                "@id": "https://monacocortinas.com.ar/#organization",
                name: "Mónaco Cortinas Metálicas",
                legalName: "Mónaco Cortinas Metálicas SRL",
                url: "https://monacocortinas.com.ar",
                logo: {
                  "@type": "ImageObject",
                  url: "/images/logo-monaco.webp",
                  width: 300,
                  height: 100,
                  caption: "Logo oficial de Mónaco Cortinas Metálicas",
                },
                image: {
                  "@type": "ImageObject",
                  url: "https://monacocortinas.com.ar/images/fabrica-monaco-cortinas.jpg",
                  width: 1200,
                  height: 800,
                  caption: "Fábrica de Mónaco Cortinas Metálicas",
                },
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: "+54-11-2881-7818",
                    contactType: "customer service",
                    availableLanguage: "Spanish",
                    areaServed: "AR",
                    hoursAvailable: "Mo-Su 00:00-23:59",
                  },
                  {
                    "@type": "ContactPoint",
                    telephone: "+54-9-11-4439-3030",
                    contactType: "emergency",
                    availableLanguage: "Spanish",
                    areaServed: "AR",
                    hoursAvailable: "Mo-Su 00:00-23:59",
                  },
                ],
                foundingDate: "2000-01-01",
                numberOfEmployees: "15-25",
                slogan: "Cortinas metálicas de máxima calidad - Líderes en seguridad",
                award: [
                  "Mejor empresa de cortinas metálicas Buenos Aires 2023",
                  "Certificación ISO 9001 Calidad",
                  "Premio Excelencia Servicio al Cliente 2022",
                ],
              },
              {
                "@type": "FAQPage",
                "@id": "https://monacocortinas.com.ar/#faq",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "¿Cuánto tiempo tarda la instalación de una cortina metálica?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "La instalación de una cortina metálica estándar tarda entre 2 a 4 horas. Para cortinas con automatización, el tiempo puede extenderse a 4-6 horas. Ofrecemos servicio de instalación 24/7 para emergencias.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Qué garantía ofrecen en sus cortinas metálicas?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Ofrecemos garantía extendida de 2 años en fabricación y 1 año en instalación. Los motores automatizados tienen garantía de 3 años. Incluye mantenimiento preventivo gratuito durante el primer año.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Atienden emergencias los fines de semana?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Sí, tenemos servicio de emergencia 24 horas, los 7 días de la semana, incluidos feriados. Para reparaciones urgentes, llamar al +54-9-11-4439-3030.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Cuál es el precio de una cortina metálica?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Los precios varían según dimensiones, tipo de chapa y automatización. Cortinas básicas desde $120.000, con motor desde $200.000. Ofrecemos presupuesto gratuito en 24hs.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Qué zonas de Buenos Aires cubren?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Cubrimos toda Capital Federal y Gran Buenos Aires, incluyendo Zona Sur, Norte y Oeste. Servicio especializado en Lomas de Zamora, Quilmes, Avellaneda y alrededores.",
                    },
                  },
                ],
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://monacocortinas.com.ar/#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Inicio",
                    item: "https://monacocortinas.com.ar",
                  },
                ],
              },
            ],
          }),
        }}
      />

      <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', {
              page_title: 'Mónaco Cortinas Metálicas - Inicio',
              page_location: window.location.href,
              content_group1: 'Homepage',
              content_group2: 'Cortinas Metálicas',
              custom_map: {
                'custom_parameter_1': 'business_type',
                'custom_parameter_2': 'service_area'
              }
            });
          `,
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'FACEBOOK_PIXEL_ID');
            fbq('track', 'PageView');
          `,
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:HOTJAR_ID,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />
    </>
  )
}

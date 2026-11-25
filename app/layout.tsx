import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto } from "next/font/google"
import "./globals.css"
import { AdvancedSEOHead } from "@/components/seo/advanced-seo-head"
import { PerformanceOptimizer } from "@/components/seo/performance-optimizer"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://monacocortinas.com.ar"),
  title: {
    default: "Cortinas Metálicas Automáticas Buenos Aires | Cortinas de Seguridad Enrollables | Mónaco +20 Años",
    template: "%s | Mónaco Cortinas Metálicas - Fabricación Premium Buenos Aires",
  },
  description:
    "🥇 Cortinas metálicas automáticas y de seguridad en Buenos Aires. Fabricación premium, instalación 24/7, persianas enrollables. ¡Presupuesto GRATIS!",
  keywords: [
    // Keywords existentes mantenidas
    "cortinas metálicas automáticas buenos aires",
    "cortinas de seguridad para locales",
    "cortinas enrollables metálicas",
    "persianas metálicas automáticas",
    "portones metálicos enrollables",
    "rejas automáticas enrollables",
    "cortinas metálicas microperforadas ventilación",
    "cortinas metálicas galvanizadas anticorrosión",
    "cortinas metálicas motor somfy pujol",
    "cortinas metálicas control remoto automático",

    // COMPARATIVAS (50+ keywords)
    "cortinas metálicas vs rejas tradicionales seguridad",
    "cortinas microperforadas vs ciegas ventilación",
    "motor somfy vs pujol cortinas metálicas",
    "cortinas galvanizadas vs pintadas durabilidad",
    "cortinas automáticas vs manuales conveniencia",
    "cortinas metálicas vs portones seccionales",
    "persianas enrollables vs cortinas tradicionales",
    "cortinas térmicas vs estándar aislación",
    "cortinas transparentes vs opacas visibilidad",
    "cortinas residenciales vs comerciales diferencias",
    "cortinas con motor vs sin motor ventajas",
    "cortinas chapa vs aluminio resistencia",
    "cortinas simples vs doble pared aislante",
    "cortinas manuales cadena vs motor eléctrico",
    "cortinas microperforadas vs rejillas ventilación",
    "cortinas galvanizado caliente vs frío",
    "cortinas prepintadas vs galvanizadas mantenimiento",
    "cortinas sensor viento vs sin sensor",
    "cortinas control remoto vs pulsador",
    "cortinas temporizador vs manual programación",
    "cortinas apertura total vs parcial",
    "cortinas guías laterales vs sin guías",
    "cortinas cerradura multipunto vs simple",
    "cortinas alarma integrada vs sin alarma",
    "cortinas wifi vs bluetooth conectividad",
    "cortinas app móvil vs control tradicional",
    "cortinas domótica vs convencional",
    "cortinas encoder vs sin encoder precisión",
    "cortinas freno electromagnético vs mecánico",
    "cortinas variador frecuencia vs arranque directo",
    "cortinas 220v vs 380v alimentación",
    "cortinas monofásico vs trifásico motor",
    "cortinas potencia 1hp vs 2hp",
    "cortinas rpm alta vs baja velocidad",
    "cortinas perfil omega vs rectangular",
    "cortinas tope inferior vs sin tope",
    "cortinas sistema antirrobo vs estándar",
    "cortinas sensor magnético vs mecánico",
    "cortinas lubricación automática vs manual",
    "cortinas mantenimiento preventivo vs correctivo",
    "cortinas repuestos originales vs genéricos",
    "cortinas garantía extendida vs estándar",
    "cortinas servicio 24hs vs horario comercial",
    "cortinas técnico especializado vs general",
    "cortinas diagnóstico gratuito vs pago",
    "cortinas presupuesto online vs presencial",
    "cortinas financiación vs pago contado",
    "cortinas fabricante directo vs revendedor",
    "cortinas instalación incluida vs adicional",
    "cortinas medición gratuita vs paga",

    // PREGUNTAS FRECUENTES (50+ keywords)
    "cuanto cuesta cortina metálica automática precio",
    "que motor elegir cortina metálica somfy pujol",
    "como mantener cortina metálica galvanizada",
    "cuanto dura cortina metálica vida útil",
    "cortina metálica se puede automatizar después",
    "que garantía tienen cortinas metálicas mónaco",
    "cortinas metálicas necesitan mantenimiento frecuencia",
    "como funciona motor cortina metálica tubular",
    "donde comprar cortinas metálicas buenos aires",
    "quien instala cortinas metálicas profesional",
    "cuando cambiar motor cortina metálica",
    "porque elegir cortinas metálicas galvanizadas",
    "como programar control remoto cortina",
    "que medidas cortinas metálicas estándar",
    "como limpiar cortinas metálicas microperforadas",
    "que herramientas necesita instalación cortinas",
    "como ajustar tensión cortinas metálicas",
    "donde reparar cortinas metálicas urgente",
    "que repuestos necesita cortina metálica",
    "como lubricar cortinas metálicas correctamente",
    "cuando hacer service cortinas metálicas",
    "que colores disponibles cortinas metálicas",
    "como medir cortina metálica correctamente",
    "que documentación necesita cortina metálica",
    "como solicitar presupuesto cortinas metálicas",
    "que incluye instalación cortinas metálicas",
    "como funciona sensor viento cortinas",
    "que pasa si se corta luz cortina automática",
    "como abrir cortina metálica sin luz",
    "que hacer si cortina no sube baja",
    "como resetear motor cortina metálica",
    "que ruido hace cortina metálica normal",
    "como evitar oxidación cortinas metálicas",
    "que pintura usar cortinas metálicas",
    "como instalar cortina metálica paso paso",
    "que permisos necesita cortina metálica",
    "como elegir color cortina metálica",
    "que grosor chapa cortina metálica",
    "como calcular peso cortina metálica",
    "que potencia motor necesita cortina",
    "como conectar motor cortina metálica",
    "que cable usar motor cortina metálica",
    "como programar límites cortina automática",
    "que hacer mantenimiento cortina metálica",
    "como cambiar control remoto cortina",
    "que batería usa control remoto cortina",
    "como sincronizar controles remotos múltiples",
    "que hacer cortina metálica atascada",
    "como desatascar cortina metálica manual",
    "que costo tiene reparación cortina metálica",

    // LONG-TAIL KEYWORDS PRINCIPALES (50+ keywords)
    "cortinas metálicas automáticas buenos aires capital federal",
    "fabricación cortinas metálicas medida zona sur gba",
    "instalación cortinas metálicas profesional 24 horas",
    "cortinas enrollables metálicas motor somfy premium",
    "cortinas metálicas microperforadas ventilación comercial",
    "cortinas metálicas galvanizadas anticorrosión residencial",
    "cortinas metálicas automatizadas control remoto múltiple",
    "persianas enrollables metálicas chapa galvanizada z275",
    "cortinas metálicas comerciales locales shopping centros",
    "cortinas metálicas industriales depósitos galpones fábricas",
    "cortinas metálicas residenciales casas departamentos cocheras",
    "puertas cortinas metálicas escape emergencia comercial",
    "cortinas metálicas sistema automatizado domótica wifi",
    "cortinas metálicas motor tubular encoder posición",
    "cortinas metálicas persiana enrollable doble pared",
    "cortinas metálicas seguridad comercial antirrobo alarma",
    "cortinas metálicas herrería especializada fabricación propia",
    "cortinas metálicas instalación domicilio medición gratuita",
    "cortinas metálicas el jagüel ezeiza zona sur",
    "cortinas metálicas lomas zamora quilmes avellaneda",
    "cortinas metálicas lanús banfield temperley adrogué",
    "cortinas metálicas florencio varela berazategui hudson",
    "cortinas metálicas almirante brown claypole glew",
    "cortinas metálicas esteban echeverría monte grande",
    "cortinas metálicas la matanza ramos mejía laferrere",
    "cortinas metálicas merlo moreno libertad san justo",
    "cortinas metálicas morón castelar haedo villa sarmiento",
    "cortinas metálicas tres febrero caseros santos lugares",
    "cortinas metálicas san martín villa ballester chilavert",
    "cortinas metálicas vicente lópez olivos florida munro",
    "cortinas metálicas san isidro acassuso beccar",
    "cortinas metálicas tigre don torcuato benavídez",
    "cortinas metálicas san fernando virreyes victoria",
    "cortinas metálicas malvinas argentinas grand bourg",
    "cortinas metálicas josé paz derqui guernica",
    "cortinas metálicas san miguel bella vista",
    "cortinas metálicas hurlingham william morris villa tesei",
    "cortinas metálicas ituzaingó castelar norte villa udaondo",
    "cortinas metálicas la plata city bell villa elisa",
    "cortinas metálicas ensenada berisso punta lara",
    "cortinas metálicas brandsen jeppener altamirano",
    "cortinas metálicas cañuelas uribelarrea máximo paz",
    "cortinas metálicas general rodríguez ingeniero budge",
    "cortinas metálicas marcos paz merlo san antonio",
    "cortinas metálicas pilar del viso manzanares",
    "cortinas metálicas escobar belén de escobar matheu",
    "cortinas metálicas campana zárate lima baradero",
    "cortinas metálicas luján mercedes suipacha chivilcoy",
    "cortinas metálicas navarro lobos saladillo 25 mayo",
    "cortinas metálicas pergamino rojas salto arrecifes",

    // COMERCIALES INTENSIVAS (50+ keywords)
    "precio cortinas metálicas buenos aires económicas",
    "cortinas metálicas baratas calidad premium garantizada",
    "mejor empresa cortinas metálicas argentina líder",
    "cortinas metálicas garantía extendida 5 años",
    "cortinas metálicas financiación 12 cuotas sin interés",
    "cortinas metálicas descuento promoción especial limitada",
    "cortinas metálicas oferta especial fabricante directo",
    "cortinas metálicas precio por metro cuadrado",
    "cortinas metálicas costo instalación incluida gratis",
    "cortinas metálicas tarjeta crédito débito todas",
    "cortinas metálicas pago efectivo descuento 10%",
    "cortinas metálicas sin anticipo entrega inmediata",
    "cortinas metálicas mercado pago transferencia bancaria",
    "cortinas metálicas presupuesto online inmediato gratis",
    "cortinas metálicas cotización whatsapp 24 horas",
    "cortinas metálicas precio competitivo mejor mercado",
    "cortinas metálicas relación precio calidad imbatible",
    "cortinas metálicas empresa confiable +20 años",
    "cortinas metálicas fabricante directo sin intermediarios",
    "cortinas metálicas venta directa fábrica ahorro",
    "cortinas metálicas mayorista minorista precios especiales",
    "cortinas metálicas promoción lanzamiento descuento 20%",
    "cortinas metálicas combo oferta motor incluido",
    "cortinas metálicas pack completo instalación garantía",
    "cortinas metálicas liquidación stock limitado",
    "cortinas metálicas temporada alta descuentos especiales",
    "cortinas metálicas black friday cyber monday",
    "cortinas metálicas hot sale ofertas imperdibles",
    "cortinas metálicas día padre madre descuentos",
    "cortinas metálicas navidad año nuevo promociones",
    "cortinas metálicas vuelta clases ofertas comerciales",
    "cortinas metálicas referidos descuento adicional 5%",
    "cortinas metálicas segunda unidad 50% descuento",
    "cortinas metálicas compra múltiple precio mayorista",
    "cortinas metálicas plan ahorro cuotas fijas",
    "cortinas metálicas leasing financiero empresas",
    "cortinas metálicas crédito personal banco nación",
    "cortinas metálicas ahora 12 18 cuotas",
    "cortinas metálicas tarjeta naranja visa mastercard",
    "cortinas metálicas american express diners club",
    "cortinas metálicas billetera virtual todas aceptadas",
    "cortinas metálicas crypto bitcoin pago digital",
    "cortinas metálicas dólar oficial blue contado",
    "cortinas metálicas precio dólar actualizado diario",
    "cortinas metálicas cotización tiempo real online",
    "cortinas metálicas simulador cuotas calculadora",
    "cortinas metálicas comparador precios competencia",
    "cortinas metálicas mejor precio garantizado escrito",
    "cortinas metálicas igualamos cualquier presupuesto competencia",
    "cortinas metálicas precio final sin sorpresas",

    // ESPECÍFICAS POR TIPO (50+ keywords)
    "cortinas metálicas microperforadas ventilación 30% 40%",
    "cortinas metálicas ciegas sin perforación total",
    "cortinas metálicas enrollables automáticas motor integrado",
    "cortinas metálicas manuales cadena galvanizada resistente",
    "cortinas metálicas motor somfy oximo rts",
    "cortinas metálicas motor pujol eco line",
    "cortinas metálicas motor nacional argentino garantía",
    "cortinas metálicas sensor viento automático seguridad",
    "cortinas metálicas sensor obstáculo infrarrojo",
    "cortinas metálicas control remoto múltiple 4 canales",
    "cortinas metálicas temporizador automático programable",
    "cortinas metálicas apertura parcial posición intermedia",
    "cortinas metálicas doble pared aislante térmica",
    "cortinas metálicas espuma poliuretano inyectada",
    "cortinas metálicas térmica aislación acústica",
    "cortinas metálicas transparentes policarbonato cristal",
    "cortinas metálicas vidriera local comercial visibilidad",
    "cortinas metálicas garage cochera residencial automática",
    "cortinas metálicas depósito galpón industrial pesada",
    "cortinas metálicas fábrica industrial uso intensivo",
    "cortinas metálicas oficina comercial diseño moderno",
    "cortinas metálicas shopping centro comercial alta frecuencia",
    "cortinas metálicas hospital clínica normas sanitarias",
    "cortinas metálicas escuela colegio seguridad infantil",
    "cortinas metálicas banco seguridad blindada antirrobo",
    "cortinas metálicas joyería máxima seguridad alarma",
    "cortinas metálicas farmacia 24 horas automatizada",
    "cortinas metálicas supermercado apertura rápida",
    "cortinas metálicas restaurant bar diseño elegante",
    "cortinas metálicas taller mecánico resistente aceites",
    "cortinas metálicas estación servicio ignífuga",
    "cortinas metálicas concesionario auto showroom",
    "cortinas metálicas lavadero resistente humedad",
    "cortinas metálicas peluquería estética moderna",
    "cortinas metálicas consultorio médico clínica",
    "cortinas metálicas veterinaria hospital animal",
    "cortinas metálicas gimnasio deportivo ventilación",
    "cortinas metálicas iglesia templo diseño sobrio",
    "cortinas metálicas club social salón eventos",
    "cortinas metálicas panadería confitería",
    "cortinas metálicas carnicería frigorífico",
    "cortinas metálicas verdulería frutería",
    "cortinas metálicas kiosco diario revistas",
    "cortinas metálicas librería papelería",
    "cortinas metálicas ferretería construcción",
    "cortinas metálicas óptica relojería",
    "cortinas metálicas perfumería cosmética",
    "cortinas metálicas juguetería infantil",
    "cortinas metálicas deportes equipamiento",
    "cortinas metálicas electrónica tecnología",
    "cortinas metálicas mueblería decoración",
    "cortinas metálicas ropa indumentaria",
    "cortinas metálicas calzado zapatería",
    "cortinas metálicas bazar hogar",
    "cortinas metálicas autopartes repuestos",
    "cortinas metálicas materiales construcción",
    "cortinas metálicas pinturería decoración",
    "cortinas metálicas cerrajería llaves",
    "cortinas metálicas vidriería cristalería",
    "cortinas metálicas tapicería muebles",
    "cortinas metálicas carpintería madera",
    "cortinas metálicas herrería metalúrgica",
    "cortinas metálicas soldadura industrial",
    "cortinas metálicas tornería mecánica",
    "cortinas metálicas electricidad instalaciones",
    "cortinas metálicas plomería sanitarios",
    "cortinas metálicas aire acondicionado",
    "cortinas metálicas refrigeración comercial",
    "cortinas metálicas seguridad alarmas",
    "cortinas metálicas cercos perimetrales",
    "cortinas metálicas portones automáticos",
    "cortinas metálicas barreras vehiculares",
    "cortinas metálicas control acceso",
  ],
  authors: [{ name: "Mónaco Cortinas Metálicas", url: "https://monacocortinas.com.ar" }],
  creator: "Mónaco Cortinas Metálicas - Especialistas en Seguridad",
  publisher: "Mónaco Cortinas Metálicas SRL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Construcción, Seguridad y Herrería Especializada",
  classification: "Fabricación e Instalación de Cortinas Metálicas Premium",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["es_ES", "es"],
    url: "https://monacocortinas.com.ar",
    siteName: "Mónaco Cortinas Metálicas - Fabricación Premium Buenos Aires",
    title: "Cortinas Metálicas Automáticas Buenos Aires | Seguridad Premium | Mónaco +20 Años",
    description:
      "🥇 Líderes en cortinas metálicas automáticas y de seguridad. Fabricación propia, instalación 24/7 en Buenos Aires y GBA. ¡Cotizá GRATIS ahora!",
    images: [
      {
        url: "https://monacocortinas.com.ar/images/cortinas-metalicas-automaticas-buenos-aires.jpg",
        width: 1200,
        height: 630,
        alt: "Cortinas metálicas automáticas premium Buenos Aires - Mónaco fabricación propia",
        type: "image/jpeg",
      },
      {
        url: "https://monacocortinas.com.ar/images/cortinas-seguridad-locales-comerciales.jpg",
        width: 1200,
        height: 630,
        alt: "Cortinas de seguridad para locales comerciales - Instalación profesional Mónaco",
        type: "image/jpeg",
      },
      {
        url: "https://monacocortinas.com.ar/images/persianas-enrollables-metalicas-motor.jpg",
        width: 1200,
        height: 630,
        alt: "Persianas enrollables metálicas con motor automático - Fabricación Mónaco",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MonacoCortinas",
    creator: "@MonacoCortinas",
    title: "Cortinas Metálicas Automáticas 24/7 | Buenos Aires | Presupuesto GRATIS",
    description:
      "🥇 Cortinas metálicas automáticas premium. Fabricación propia, instalación 24/7, +20 años experiencia. Capital Federal y GBA. ¡Cotizá YA!",
    images: ["https://monacocortinas.com.ar/images/cortinas-metalicas-automaticas-buenos-aires.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
    other: {
      "msvalidate.01": "bing-verification-code",
      "p:domain_verify": "pinterest-verification-code",
    },
  },
  alternates: {
    canonical: "https://monacocortinas.com.ar",
    languages: {
      "es-AR": "https://monacocortinas.com.ar",
      "es-ES": "https://monacocortinas.com.ar",
      es: "https://monacocortinas.com.ar",
    },
  },
  other: {
    // Geo tags avanzados
    "geo.region": "AR-B",
    "geo.placename": "Buenos Aires, Capital Federal, Gran Buenos Aires",
    "geo.position": "-34.84384;-58.5061296",
    ICBM: "-34.84384, -58.5061296",

    // Business contact data extendido
    "business:contact_data:street_address": "Mariano Castex 100, El Jagüel",
    "business:contact_data:locality": "Ezeiza, Buenos Aires",
    "business:contact_data:region": "Buenos Aires, Capital Federal, GBA",
    "business:contact_data:postal_code": "B1805",
    "business:contact_data:country_name": "Argentina",
    "business:contact_data:phone_number": "+5411-2881-7818",
    "business:contact_data:whatsapp": "+5411-2881-7818",
    "business:contact_data:email": "Monaco.cor@gmail.com",
    "business:contact_data:website": "https://monacocortinas.com.ar",

    // Business hours
    "business:hours:monday": "00:00-23:59",
    "business:hours:tuesday": "00:00-23:59",
    "business:hours:wednesday": "00:00-23:59",
    "business:hours:thursday": "00:00-23:59",
    "business:hours:friday": "00:00-23:59",
    "business:hours:saturday": "00:00-23:59",
    "business:hours:sunday": "00:00-23:59",

    // Tags específicos de industria y servicios
    industry: "Cortinas Metálicas, Automatización, Seguridad, Herrería Especializada",
    "service-area": "Buenos Aires, Capital Federal, Zona Sur, Zona Norte, Zona Oeste, La Plata, GBA",
    specialization: "Cortinas Metálicas Automáticas, Persianas Enrollables, Portones Automáticos",
    "business-type": "Fabricante, Instalador, Service Técnico",
    "payment-methods": "Efectivo, Tarjetas, Transferencia, Mercado Pago, Financiación",
    "service-emergency": "24 horas, 7 días, Urgencias, Feriados",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${roboto.variable} antialiased`}>
      <head>
        <link rel="canonical" href="https://monacocortinas.com.ar" />

        <meta
          httpEquiv="Content-Security-Policy"
          content="connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://stats.g.doubleclick.net; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net; script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net;"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media (max-width: 768px) {
              .hero-section { min-height: 60vh !important; }
              .hero-title { font-size: 2.5rem !important; line-height: 1.2 !important; }
              .hero-subtitle { font-size: 1.25rem !important; }
              .card-hover { transform: none !important; }
              .group:hover .group-hover\\:scale-110 { transform: none !important; }
              * { animation-duration: 0.2s !important; transition-duration: 0.2s !important; }
            }
            .loading-skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: loading 1.5s infinite; }
            @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
          `,
          }}
        />

        <AdvancedSEOHead />

        <link
          rel="preload"
          href="/modern-industrial-building-with-metal-shutters.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
          media="(max-width: 768px)"
        />
        <link rel="preload" href="/images/logo-monaco.webp" as="image" type="image/webp" fetchPriority="high" />

        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Función optimizada para reportar conversiones
              function reportConversion(eventName, url) {
                try {
                  var redirected = false;
                  var cb = function () {
                    if (!redirected && url) {
                      redirected = true;
                      window.location.href = url;
                    }
                  };
                  
                  if (typeof gtag !== 'undefined') {
                    gtag('event', eventName, {
                      'send_to': 'AW-17509790251',
                      'event_callback': cb
                    });
                  }
                  
                  setTimeout(cb, 500); // Reducido de 800ms a 500ms para móviles
                } catch (e) {
                  if (url) window.location.href = url;
                }
              }

              // Event listeners optimizados
              document.addEventListener('DOMContentLoaded', function() {
                // WhatsApp clicks
                document.addEventListener('click', function (e) {
                  var a = e.target.closest('a');
                  if (!a) return;
                  var href = (a.getAttribute('href') || '').trim();
                  if (!href) return;

                  var isWA = href.indexOf('wa.me') > -1 || href.indexOf('api.whatsapp.com') > -1;
                  if (isWA) {
                    e.preventDefault();
                    reportConversion('whatsapp_click', href);
                  }
                }, true);

                // Phone calls
                document.addEventListener('click', function (e) {
                  var a = e.target.closest('a');
                  if (!a) return;
                  var href = (a.getAttribute('href') || '').trim();
                  if (!href) return;

                  var isTel = /^tel:/i.test(href);
                  if (isTel) {
                    e.preventDefault();
                    reportConversion('phone_call', href);
                  }
                }, true);
              });
            `,
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://wa.me" />

        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//wa.me" />

        <link rel="prefetch" href="/cotizador" />
        <link rel="prefetch" href="/tablillas" />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/mstile-310x310.png" />
      </head>
      <body className="font-sans">
        <PerformanceOptimizer>
          <Suspense fallback={<div className="loading-skeleton h-screen w-full" />}>{children}</Suspense>
        </PerformanceOptimizer>
        <Analytics />
      </body>
    </html>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Wrench,
  Truck,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  Eye,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Menu,
  MessageCircle,
  Filter,
  Quote,
  Factory,
} from "lucide-react"
import Image from "next/image"

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://monacocortinas.com.ar/#business",
      name: "Mónaco Cortinas Metálicas",
      alternateName: "FCA Cortinas Metálicas Monaco",
      description:
        "Fabricación, instalación y reparación de cortinas metálicas premium en Buenos Aires. Servicio 24/7, garantía extendida, motores automatizados Somfy y Pujol.",
      url: "https://monacocortinas.com.ar",
      telephone: "+54-11-4439-3030",
      email: "info.monacocortinas@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mariano Castex 100",
        addressLocality: "El Jagüel, Ezeiza",
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
      priceRange: "$$",
      paymentAccepted: "Cash, Credit Card, Bank Transfer, Mercado Pago",
      currenciesAccepted: "ARS",
      areaServed: [
        "Buenos Aires",
        "Capital Federal",
        "Zona Sur GBA",
        "Lomas de Zamora",
        "Quilmes",
        "Avellaneda",
        "Lanús",
        "La Plata",
      ],
      serviceType: "Cortinas Metálicas, Automatización, Herrería",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de Cortinas Metálicas",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cortinas Metálicas Residenciales",
              description: "Instalación de cortinas metálicas para garages y hogares",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cortinas Metálicas Comerciales",
              description: "Cortinas de seguridad para locales comerciales",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Automatización de Cortinas",
              description: "Motores Somfy y Pujol para cortinas metálicas",
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
    },
    {
      "@type": "FAQPage",
      "@id": "https://monacocortinas.com.ar/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cuánto cuesta una cortina metálica automática?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El precio de cortinas metálicas automáticas varía según dimensiones y tipo de motor. Cortinas residenciales desde $120.000/m², comerciales desde $180.000/m² e industriales desde $250.000/m². Incluye instalación profesional y garantía extendida.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué garantía tienen las cortinas metálicas Monaco?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ofrecemos 5 años de garantía en fabricación de cortinas metálicas y 2 años en motores automatizados. Incluye servicio técnico 24/7, repuestos originales y mantenimiento preventivo sin costo adicional.",
          },
        },
        {
          "@type": "Question",
          name: "¿Hacen instalaciones en toda la zona sur de Buenos Aires?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí, brindamos servicio completo en zona sur GBA: Lomas de Zamora, Quilmes, Avellaneda, Lanús, Florencio Varela, Berazategui, Almirante Brown, La Plata, Ezeiza y Capital Federal. Instalación 24/7 con técnicos especializados.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué tipos de motores para cortinas metálicas recomiendan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Recomendamos motores Somfy (Francia) para máxima calidad, Pujol (Argentina) para excelente relación precio-calidad, y Mofic nacional para presupuestos ajustados. Todos incluyen control remoto, fotocélulas y sistema de emergencia manual.",
          },
        },
      ],
    },
  ],
}

const breadcrumbsData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://monacocortinas.com.ar",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Servicios",
      item: "https://monacocortinas.com.ar/#servicios",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Productos",
      item: "https://monacocortinas.com.ar/#productos",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contacto",
      item: "https://monacocortinas.com.ar/#contacto",
    },
  ],
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  estimatedPrice: string
  image: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

const products = [
  {
    id: 1,
    name: "Cortina Metálica Residencial",
    description:
      "Cortina metálica premium galvanizada para hogares con sistema de seguridad integrado, motor automatizado opcional y garantía extendida. Ideal para garages residenciales y entradas principales.",
    price: 0,
    estimatedPrice: "Consultar por metro cuadrado",
    image: "/images/cortina-residencial.jpg",
    category: "Residencial",
  },
  {
    id: 2,
    name: "Cortina Metálica Comercial",
    description:
      "Cortina robusta chapa galvanizada para locales comerciales con motor automatizado Somfy, control remoto incluido, sensor de obstáculos y sistema antirrobo. Perfecta para tiendas, oficinas y centros comerciales.",
    price: 0,
    estimatedPrice: "Consultar por metro cuadrado",
    image: "/images/cortina-comercial.jpg",
    category: "Comercial",
  },
  {
    id: 3,
    name: "Cortina Metálica Industrial",
    description:
      "Cortina de alta resistencia para uso industrial con sistema de automatización avanzado, motor trifásico, estructura reforzada y tratamiento anticorrosivo. Ideal para galpones, fábricas y depósitos de gran envergadura.",
    price: 0,
    estimatedPrice: "Consultar por metro cuadrado",
    image: "/images/cortina-industrial.jpg",
    category: "Industrial",
  },
  {
    id: 4,
    name: "Motor Automatizado Premium",
    description:
      "Motor tubular de última generación 220V/380V con control remoto multifrecuencia, sensor de obstáculos, freno electromagnético, encoder de posición y garantía extendida de 3 años. Compatible con domótica y app móvil.",
    price: 180000,
    estimatedPrice: "Desde $180.000",
    image: "/images/motor-automatico.jpg",
    category: "Accesorios",
  },
  {
    id: 5,
    name: "Puerta de Escape Certificada",
    description:
      "Puerta de escape homologada que cumple normativas IRAM y Código de Edificación, con cerradura antipánico, bisagras reforzadas y certificación para evacuación de emergencia. Instalación profesional incluida.",
    price: 200000,
    estimatedPrice: "Desde $200.000",
    image: "/images/puerta-escape.jpg",
    category: "Accesorios",
  },
  {
    id: 6,
    name: "Cortina Microperforada",
    description:
      "Cortina metálica con microperforaciones estratégicas que permite ventilación natural manteniendo máxima seguridad. Ideal para locales que requieren circulación de aire: panaderías, restaurants y talleres mecánicos.",
    price: 0,
    estimatedPrice: "Consultar por metro cuadrado",
    image: "/images/cortina-microperforada.jpg",
    category: "Comercial",
  },
]

const testimonials = [
  {
    name: "Lu De Lu",
    business: "Cliente satisfecho",
    rating: 5,
    comment:
      "Excelente servicio",
    image: "/ldl.png",
  },
  {
    name: "Julieta Pereyra",
    business: "Cliente satisfecho",
    rating: 5,
    comment:
      "Muy buena atención, excelente trabajo",
    image: "/julieta.png",
  },
  {
    name: "Tiara Cancinos",
    business: "Cliente satisfecho",
    rating: 5,
    comment:
      "Excelente material usan, Muchas gracias por la buena onda",
    image: "/tiara.png",
  },
  {
    name: "Electrodomesticos Sciocco S.R.L",
    business: "Tienda de electrodomésticos",
    rating: 4,
    comment:
      "Los conocimos por un comercio vecino y empezamos a trabajar con ellos, son eficientes y veloces trabajando. Cumplen con lo que te prometen.",
    image: "/sciocco.png",
  },
  {
    name: "Brandon Fleitas",
    business: "Cliente satisfecho",
    rating: 5,
    comment:
      "Muy buenos precios y excelente atencion, todo muy profesional",
    image: "/Brandon.png",
  },
  {
    name: "Check Mate",
    business: "Tienda de indumentaria",
    rating: 5,
    comment:
      "Profesionalismo al 100 !!",
    image: "/Check.png",
  },
]

const MobileOptimizedProductGrid = ({
  products,
  selectedCategory,
  setSelectedCategory,
  addToCart,
  categories,
}: {
  products: Product[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  addToCart: (product: Product) => void
  categories: string[]
}) => {
  return (
    <>
      {/* Filtros de categoría optimizados para móviles */}
      <div className="flex flex-wrap gap-2 lg:gap-4 justify-center mb-8 lg:mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-medium transition-all duration-200 ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            {category}
          </Button>
        ))}
      </div>

      {/* Grid de productos optimizado para móviles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white overflow-hidden"
          >
            <div className="relative overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg?height=300&width=400&query=cortina metalica premium"}
                alt={`${product.name} - Cortina metálica premium Mónaco con garantía extendida y servicio técnico 24/7`}
                className="w-full h-40 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                width={400}
                height={300}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Badge className="absolute top-2 lg:top-4 left-2 lg:left-4 bg-blue-600 text-white px-2 lg:px-3 py-1 text-xs lg:text-sm font-semibold">
                {product.category}
              </Badge>
            </div>

            <CardHeader className="pb-3 lg:pb-4 p-4 lg:p-6">
              <CardTitle className="text-lg lg:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {product.name}
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm lg:text-base leading-relaxed line-clamp-2 lg:line-clamp-3">
                {product.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0 p-4 lg:p-6">
              <div className="flex items-center justify-between mb-3 lg:mb-6">
                <div>
                  <p className="text-xl lg:text-3xl font-bold text-blue-600">
                    {product.price > 0 ? `$${product.price.toLocaleString()}` : product.estimatedPrice}
                  </p>
                  {product.price === 0 && (
                    <p className="text-xs lg:text-sm text-gray-500">*Precio por instalación completa</p>
                  )}
                </div>
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 lg:w-4 h-3 lg:h-4 fill-current" />
                  ))}
                </div>
              </div>

              <div className="space-y-2 lg:space-y-3">
                <Button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 py-2 lg:py-4 text-sm lg:text-lg font-semibold"
                >
                  <ShoppingCart className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                  Añadir al Carrito
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    const message = encodeURIComponent(
                      `Hola, me interesa solicitar más información sobre: ${product.name}. ¿Podrían enviarme detalles y presupuesto?`,
                    )
                    window.open(`https://wa.me/5491144393030?text=${message}`, "_blank")
                  }}
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all duration-200 py-2 lg:py-4 text-sm lg:text-lg font-medium bg-transparent"
                >
                  <MessageCircle className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                  Consultar por WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default function MonacoCortinasPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const generateWhatsAppMessage = () => {
    if (cart.length === 0) return ""

    let message = "¡Hola! Me interesa solicitar presupuesto para los siguientes productos:\n\n"

    cart.forEach((item) => {
      message += `• ${item.name} (Cantidad: ${item.quantity})\n`
      message += `  Precio unitario: $${item.price.toLocaleString()}\n`
      message += `  Subtotal: $${(item.price * item.quantity).toLocaleString()}\n\n`
    })

    message += `TOTAL ESTIMADO: $${getTotalPrice().toLocaleString()}\n\n`
    message += "Por favor, envíenme un presupuesto detallado con instalación incluida. ¡Gracias!"

    return encodeURIComponent(message)
  }

  const handleWhatsAppRedirect = () => {
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/5491144393030?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const handleDirectWhatsApp = () => {
    const message = encodeURIComponent(
      "¡Hola! Me interesa solicitar un presupuesto para cortinas metálicas. ¿Podrían contactarme?",
    )
    const whatsappUrl = `https://wa.me/5491144393030?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const filteredProducts =
    selectedCategory === "Todos" ? products : products.filter((product) => product.category === selectedCategory)

  const categories = ["Todos", "Residencial", "Comercial", "Industrial", "Accesorios", "Seguridad"]

  return (
    <div className="min-h-screen bg-white">
      <link rel="preload" href="/images/logo-monaco.webp" as="image" />
      <link rel="preload" href="/modern-industrial-building-with-metal-shutters.webp" as="image" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsData),
        }}
      />

      <nav aria-label="Breadcrumb" className="bg-gray-50 py-3 mt-16 lg:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-blue-600 hover:text-blue-800">
                Inicio
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a href="#servicios" className="text-blue-600 hover:text-blue-800">
                Servicios
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a href="#productos" className="text-blue-600 hover:text-blue-800">
                Productos
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">Cortinas Metálicas Buenos Aires</li>
          </ol>
        </div>
      </nav>

      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/modern-industrial-building-with-metal-shutters.webp')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95"></div>

        <div className="relative z-10 container mx-auto px-4 py-24 lg:py-40">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <span className="text-amber-400 font-semibold">+24.000 Instalaciones</span>
                <span className="text-white/70 mx-3">•</span>
                <span className="text-blue-400 font-semibold">Certificación IRAM</span>
                <span className="text-white/70 mx-3">•</span>
                <span className="text-blue-400 font-semibold">Zona Sur GBA</span>
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="block">Cortinas Metálicas</span>
              <span className="block text-blue-400 mt-2">Premium</span>
              <span className="block text-2xl lg:text-4xl mt-6 text-slate-300 font-normal">
                Fabricación Propia • Buenos Aires
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-slate-200 mb-12 leading-relaxed max-w-4xl mx-auto">
              Protección profesional para su negocio con cortinas metálicas de
              <span className="text-blue-400 font-semibold"> máxima calidad</span>. Fabricación propia, instalación
              especializada y servicio técnico
              <span className="text-blue-400 font-semibold"> 24/7</span> en Capital Federal y GBA.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-10 py-4 text-lg font-semibold rounded-lg"
                onClick={() =>
                  window.open(
                    "https://wa.me/5491144393030?text=Hola, me interesa solicitar un presupuesto gratuito para cortinas metálicas",
                    "_blank",
                  )
                }
                aria-label="Solicitar presupuesto gratuito por WhatsApp"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Solicitar Presupuesto
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold rounded-lg bg-transparent"
                onClick={() => window.open("tel:+5491144393030", "_blank")}
                aria-label="Llamar ahora al +54 11 4439-3030"
              >
                <Phone className="w-5 h-5 mr-2" />
                Llamar Ahora
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-white font-semibold">Instalación 24/7</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-white font-semibold">Garantía 5 Años</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Truck className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <div className="text-white font-semibold">Cobertura Nacional</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">¿Por qué elegir Monaco?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Más de 20 años de experiencia nos respaldan como líderes en cortinas metálicas premium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Factory className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-4 text-center">Fabricación Propia</h3>
              <p className="text-slate-600 leading-relaxed text-center">
                Control total de calidad desde la materia prima hasta el producto final
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-4 text-center">Instalación Profesional</h3>
              <p className="text-slate-600 leading-relaxed text-center">
                Técnicos especializados con certificación y herramientas de última generación
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-4 text-center">Servicio 24/7</h3>
              <p className="text-slate-600 leading-relaxed text-center">
                Atención de emergencias y soporte técnico los 365 días del año
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-4 text-center">Garantía Extendida</h3>
              <p className="text-slate-600 leading-relaxed text-center">
                5 años de garantía en fabricación y 2 años en motores automatizados
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-4 text-center">Cobertura Nacional</h3>
              <p className="text-slate-600 leading-relaxed text-center">
                Envíos y servicios en todo el país con logística especializada
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-4 text-center">Certificación IRAM</h3>
              <p className="text-slate-600 leading-relaxed text-center">
                Productos certificados bajo normas argentinas de calidad y seguridad
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <nav aria-label="Navegación principal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="flex items-center justify-between h-14 lg:h-20 w-full">
            {/* Logo optimizado */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Image
                src="/images/logo-monaco.webp"
                alt="Mónaco Cortinas Metálicas - Logo oficial empresa líder fabricación instalación cortinas metálicas automatizadas Buenos Aires zona sur GBA Capital Federal"
                className="h-8 lg:h-12 w-auto"
                width={120}
                height={48}
                priority
                sizes="(max-width: 768px) 80px, 120px"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-shrink-0" aria-label="Menú principal">
              {["Servicios", "Nosotros", "Productos", "Galeria", "Contacto"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 text-sm xl:text-base whitespace-nowrap"
                  aria-label={`Ir a la sección ${item}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const targetId = item.toLowerCase()
                    const element = document.getElementById(targetId)
                    if (element) {
                      const headerHeight = 80 // Height of fixed header
                      const elementPosition = element.offsetTop - headerHeight
                      window.scrollTo({
                        top: elementPosition,
                        behavior: "smooth",
                      })
                    }
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Action Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 text-sm bg-transparent"
                onClick={() => window.open("tel:+5491144393030", "_self")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Llamar
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-blue-700 text-white text-sm"
                onClick={() =>
                  window.open(
                    "https://wa.me/5491144393030?text=Hola, me interesa solicitar un presupuesto para cortinas metálicas",
                    "_blank",
                  )
                }
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="relative border-gray-300 hover:bg-gray-50 bg-transparent"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-4 h-4" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button & Cart */}
            <div className="flex lg:hidden items-center space-x-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="relative border-gray-300 hover:bg-gray-50 p-2 bg-transparent"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-4 h-4" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[1rem] h-4 flex items-center justify-center rounded-full">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white w-full">
              <div className="px-4 py-4 space-y-3 w-full">
                {["Servicios", "Productos", "Nosotros", "Galeria", "Contacto"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100 last:border-b-0"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMobileMenuOpen(false)
                      const targetId = item.toLowerCase()
                      const element = document.getElementById(targetId)
                      if (element) {
                        const headerHeight = 80
                        const elementPosition = element.offsetTop - headerHeight
                        window.scrollTo({
                          top: elementPosition,
                          behavior: "smooth",
                        })
                      }
                    }}
                  >
                    {item}
                  </a>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 justify-center bg-transparent"
                    onClick={() => window.open("tel:+5491144393030", "_self")}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar Ahora
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-blue-700 text-white justify-center"
                    onClick={() =>
                      window.open(
                        "https://wa.me/5491144393030?text=Hola, me interesa solicitar un presupuesto para cortinas metálicas",
                        "_blank",
                      )
                    }
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Button
          onClick={handleDirectWhatsApp}
          size="lg"
          className="bg-green-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Tu Carrito</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(false)}
                className="hover:bg-gray-100"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                  <p className="text-gray-400">Añade productos para solicitar presupuesto</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <Image
                        src={item.image || "/placeholder.svg?height=64&width=64"}
                        alt={`${item.name} - Cortina metálica premium Mónaco con garantía extendida`}
                        className="w-16 h-16 object-cover rounded-lg"
                        width={64}
                        height={64}
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-blue-600 font-bold">${item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-900">Total Estimado:</span>
                  <span className="text-2xl font-bold text-blue-600">${getTotalPrice().toLocaleString()}</span>
                </div>
                <Button
                  onClick={handleWhatsAppRedirect}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Solicitar Presupuesto por WhatsApp
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-gray-500 text-center mt-2">
                  *Los precios son estimados. El presupuesto final incluirá instalación y puede variar según las
                  medidas.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* rest of code */}

      <section id="servicios" className="py-24 bg-white" aria-labelledby="servicios-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-20">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">Nuestros Servicios</Badge>
            <h2 id="servicios-heading" className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Servicios Profesionales de Cortinas Metálicas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Soluciones integrales de seguridad comercial e industrial. Protege tu negocio con la máxima calidad y
              tecnología avanzada.
            </p>
          </header>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Comercial primero */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Servicios Comerciales</CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Soluciones robustas para locales comerciales y pequeñas empresas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    Motores automatizados
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    Puertas de escape certificadas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    Reparaciones 24hs
                  </li>
                </ul>
                <Button
                  onClick={handleDirectWhatsApp}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Solicitar presupuesto
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Residencial segundo */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Servicios Residenciales</CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Cortinas metálicas para hogares con diseño personalizado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    Instalación personalizada
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    Acabados premium
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    Garantía extendida
                  </li>
                </ul>
                <Button
                  onClick={handleDirectWhatsApp}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Solicitar presupuesto
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Industrial tercero */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Servicios Industriales</CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Proyectos de gran escala para industrias y grandes empresas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    Trabajos a medida
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    Herrería especializada
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    Automatizaciones avanzadas
                  </li>
                </ul>
                <Button
                  onClick={handleDirectWhatsApp}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Solicitar presupuesto
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="nosotros" className="py-24 bg-white" aria-labelledby="nosotros-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <article>
              <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">Nuestra Historia</Badge>
              <h2 id="nosotros-heading" className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Mónaco Cortinas Metálicas - Líderes en Seguridad
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Cortinas Metálicas Mónaco es empresa líder en fabricación, instalación y reparación de cortinas
                metálicas premium en Buenos Aires, con más de 20 años de experiencia consolidada en el mercado
                argentino.
              </p>
              <p className="text-gray-600 mb-10 leading-relaxed">
                Nuestro compromiso con la excelencia, innovación tecnológica y servicio personalizado nos ha posicionado
                como referentes indiscutidos del sector. Brindamos cobertura completa en Capital Federal, Gran Buenos
                Aires y todo el país.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <div className="text-4xl font-bold text-blue-600 mb-2">+24,000</div>
                  <div className="text-gray-700 font-medium">Cortinas Reparadas</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <div className="text-4xl font-bold text-blue-600 mb-2">+20</div>
                  <div className="text-gray-700 font-medium">Años de Experiencia</div>
                </div>
              </div>
            </article>

            <div className="space-y-8">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50">
                <CardContent className="p-8">
                  <h3 className="font-bold text-2xl text-gray-900 mb-6">¿Por qué elegirnos?</h3>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">Equipo altamente cualificado y experto</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">Amplia gama de modelos premium</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">Calidad superior y servicio personalizado</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">Precios competitivos con descuentos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">Satisfacción 100% garantizada</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="text-center p-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-xl">
                <p className="text-2xl font-bold text-white italic leading-relaxed">
                  "Un cliente satisfecho es nuestra mejor recomendación"
                </p>
                <p className="text-blue-100 mt-2 font-medium">- Filosofía Monaco Cortinas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="productos"
        className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50"
        aria-labelledby="productos-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12 lg:mb-20">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">Nuestros Productos</Badge>
            <h2 id="productos-heading" className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Catálogo de Cortinas Metálicas Premium
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Amplia variedad de cortinas metálicas residenciales, comerciales e industriales con precios competitivos y
              garantía extendida
            </p>
          </header>

          <MobileOptimizedProductGrid
            products={filteredProducts}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            addToCart={addToCart}
            categories={categories}
          />
        </div>
      </section>

      <section id="galeria" className="py-24 bg-white overflow-x-hidden" aria-labelledby="galeria-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <header className="text-center mb-20">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">Casos de Éxito</Badge>
            <h2 id="galeria-heading" className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Galería de Trabajos Realizados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Más de <span className="font-bold text-blue-600">24,000 cortinas reparadas</span> y miles de instalaciones
              exitosas en toda Argentina
            </p>
          </header>

          {/* Gallery Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 w-full">
            {[
              {
                src: "/images/trabajo-1.jpg",
                title: "Cortina con Rejilla de Seguridad",
                description: "Instalación en garaje residencial",
                height: "h-80",
              },
              {
                src: "/images/trabajo-2.jpg",
                title: "Cortina Residencial Premium",
                description: "Entrada principal con cerradura",
                height: "h-64",
              },
              {
                src: "/images/trabajo-3.jpg",
                title: "Cortina Industrial Gran Formato",
                description: "Nave industrial - Vista exterior",
                height: "h-96",
              },
              {
                src: "/images/trabajo-4.jpg",
                title: "Instalación Industrial",
                description: "Galpón de gran envergadura",
                height: "h-72",
              },
              {
                src: "/images/trabajo-5.jpg",
                title: "Cortina en Construcción",
                description: "Instalación residencial en obra",
                height: "h-64",
              },
              {
                src: "/images/trabajo-6.jpg",
                title: "Cortina Industrial Doble",
                description: "Sistema de gran tamaño",
                height: "h-88",
              },
              {
                src: "/images/trabajo-7.jpg",
                title: "Sistema Automatizado",
                description: "Con motor Mofic integrado",
                height: "h-80",
              },
              {
                src: "/images/trabajo-8.jpg",
                title: "Local Comercial Moderno",
                description: "Centro comercial premium",
                height: "h-72",
              },
              {
                src: "/images/trabajo-9.jpg",
                title: "Instalación Nocturna",
                description: "Servicio 24 horas disponible",
                height: "h-80",
              },
              {
                src: "/images/trabajo-10.jpg",
                title: "Centro Comercial",
                description: "Instalación en galería comercial",
                height: "h-72",
              },
              {
                src: "/images/trabajo-11.jpg",
                title: "Local Comercial con Puerta",
                description: "Cortina azul con puerta integrada",
                height: "h-80",
              },
              {
                src: "/images/trabajo-12.jpg",
                title: "Nave Industrial Interior",
                description: "Múltiples cortinas en construcción",
                height: "h-96",
              },
              {
                src: "/images/trabajo-13.jpg",
                title: "Cortina Residencial Galvanizada",
                description: "Acabado premium brillante",
                height: "h-64",
              },
              {
                src: "/images/trabajo-14.jpg",
                title: "Complejo Industrial",
                description: "Múltiples cortinas gran formato",
                height: "h-88",
              },
              {
                src: "/images/trabajo-15.jpg",
                title: "Garajes Residenciales Dobles",
                description: "Casa moderna con cortinas gemelas",
                height: "h-72",
              },
              {
                src: "/images/trabajo-16.jpg",
                title: "Cortinas Microperforadas",
                description: "Serie de locales con ventilación",
                height: "h-80",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${item.height}`}
              >
                <Image
                  src={item.src || "/placeholder.svg?height=400&width=600"}
                  alt={`${item.title} - ${item.description} - Trabajo realizado por Mónaco Cortinas Metálicas Buenos Aires`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-200 mb-3">{item.description}</p>
                  <div className="flex items-center text-blue-300">
                    <Eye className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Ver detalles</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 max-w-full mx-auto">
              <div className="text-center min-w-0">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">+24,000</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">Cortinas Reparadas</div>
              </div>
              <div className="w-full sm:w-px h-px sm:h-16 bg-gray-200"></div>
              <div className="text-center min-w-0">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">+5,000</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">Instalaciones</div>
              </div>
              <div className="w-full sm:w-px h-px sm:h-16 bg-gray-200"></div>
              <div className="text-center min-w-0">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">Satisfacción</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="testimonios-heading">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Testimonios de Clientes",
              itemListElement: testimonials.map((testimonial, index) => ({
                "@type": "Review",
                position: index + 1,
                author: {
                  "@type": "Person",
                  name: testimonial.name,
                },
                reviewBody: testimonial.comment,
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: testimonial.rating,
                  bestRating: 5,
                  worstRating: 1,
                },
                itemReviewed: {
                  "@type": "LocalBusiness",
                  name: "Mónaco Cortinas Metálicas",
                },
              })),
            }),
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-20">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">Testimonios</Badge>
            <h2 id="testimonios-heading" className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Opiniones de Nuestros Clientes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              La satisfacción y confianza de nuestros clientes es nuestra mejor carta de presentación
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-blue-400 fill-current" />
                    ))}
                    <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Google Maps</span>
                  </div>
                  <Quote className="w-8 h-8 text-blue-200 mb-4" />
                  <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.image || "/placeholder.svg?height=48&width=48"}
                      alt={`${testimonial.name} - Cliente satisfecho de ${testimonial.business} - Testimonio Mónaco Cortinas Metálicas`}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      width={48}
                      height={48}
                      loading="lazy"
                    />
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.business}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contacto"
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
        aria-labelledby="contacto-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-20">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">Contacto</Badge>
            <h2 id="contacto-heading" className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Solicita tu Presupuesto Gratuito
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Completa el formulario o contáctanos directamente por WhatsApp para recibir atención personalizada
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-16">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">Información de Contacto</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Estamos disponibles 24/7 para atenderte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Ubicación</p>
                    <p className="text-gray-600 leading-relaxed">Mariano Castex 100, B1805 El Jagüel, Buenos Aires</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Teléfono</p>
                    <p className="text-gray-600 text-xl font-semibold">+54 9 11 4439-3030</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Email</p>
                    <p className="text-gray-600 text-lg">info.monacocortinas@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Horarios</p>
                    <p className="text-gray-600 leading-relaxed">Servicio 24/7 - Los 365 días del año</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-200">
                  <p className="text-gray-600 mb-4 font-medium">Nuestra ubicación:</p>
                  <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3274.4929143256704!2d-58.50612958255615!3d-34.84384097281234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd1285e982ee3%3A0xf4206026155c6cc4!2sMariano%20Castex%20100%2C%20B1805%20El%20Jag%C3%BCel%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1735689600000!5m2!1ses!2sar"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de Monaco Cortinas Metálicas - Mariano Castex 100, El Jagüel"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">Solicitar Presupuesto</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Completá el formulario y te contactaremos en menos de 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nombre" className="text-gray-700 font-medium">
                        Nombre *
                      </Label>
                      <Input
                        id="nombre"
                        placeholder="Tu nombre"
                        required
                        className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apellido" className="text-gray-700 font-medium">
                        Apellido
                      </Label>
                      <Input
                        id="apellido"
                        placeholder="Tu apellido"
                        className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="motivo" className="text-gray-700 font-medium">
                      Motivo de Contact *
                    </Label>
                    <Select required>
                      <SelectTrigger className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Selecciona el motivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="presupuesto">Solicitar Presupuesto</SelectItem>
                        <SelectItem value="reparacion">Reparación</SelectItem>
                        <SelectItem value="instalacion">Instalación</SelectItem>
                        <SelectItem value="consulta">Consulta General</SelectItem>
                        <SelectItem value="urgencia">Urgencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="mensaje" className="text-gray-700 font-medium">
                      Comentario o Mensaje *
                    </Label>
                    <Textarea
                      id="mensaje"
                      placeholder="Describe tu proyecto o necesidad en detalle..."
                      rows={4}
                      required
                      className="mt-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Enviar Mensaje
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>

                    <Button
                      type="button"
                      onClick={handleDirectWhatsApp}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Enviar por WhatsApp
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">Preguntas Frecuentes</Badge>
            <h2 id="faq-heading" className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Preguntas Frecuentes sobre Cortinas Metálicas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Resolvemos las dudas más comunes sobre nuestros servicios de cortinas metálicas premium
            </p>
          </header>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">¿Cuánto cuesta una cortina metálica automática?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  El precio de cortinas metálicas automáticas varía según dimensiones y tipo de motor. Cortinas
                  residenciales desde $120.000 por metro cuadrado, comerciales desde $180.000/m² e industriales desde
                  $250.000/m². Todos los precios incluyen instalación profesional, motor automatizado, control remoto y
                  garantía extendida de 5 años. Ofrecemos financiación en cuotas sin interés y descuentos por cantidad.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  ¿Qué garantía tienen las cortinas metálicas Monaco?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Ofrecemos la garantía más extensa del mercado: 5 años completos en fabricación de cortinas metálicas
                  galvanizadas y 2 años en motores automatizados Somfy, Pujol y Mofic. La garantía incluye servicio
                  técnico 24/7 los 365 días del año, repuestos originales sin costo, mantenimiento preventivo gratuito y
                  reposición completa en caso de defectos de fabricación. Somos la única empresa del rubro que ofrece
                  esta cobertura integral.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  ¿Hacen instalaciones en toda la zona sur de Buenos Aires?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Sí, brindamos cobertura completa en zona sur del Gran Buenos Aires incluyendo: Lomas de Zamora,
                  Quilmes, Avellaneda, Lanús, Florencio Varela, Berazategui, Almirante Brown, La Plata, Ezeiza, El
                  Jagüel, Temperley, Banfield, Adrogué, Burzaco, Longchamps, Bernal, Ezpeleta, Don Bosco, Remedios de
                  Escalada, Bosques, Ranelagh, Sourigues, Glew, Rafael Calzada, Claypole, Ensenada, Berisso, Villa
                  Elisa, City Bell y Capital Federal. Instalación 24/7 con técnicos especializados y vehículos
                  equipados.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  ¿Qué tipos de motores para cortinas metálicas recomiendan?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Recomendamos motores según el uso específico: Somfy (Francia) para máxima calidad y durabilidad en
                  aplicaciones comerciales e industriales, Pujol (Argentina) para excelente relación precio-calidad en
                  uso residencial y comercial, y Mofic nacional para presupuestos ajustados manteniendo buena calidad.
                  Todos los motores incluyen control remoto de largo alcance, fotocélulas de seguridad, sistema de
                  emergencia manual, finales de carrera ajustables, protección térmica y garantía extendida. Disponibles
                  en 220V monofásico y 380V trifásico.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  ¿Cuánto tiempo demora la instalación de una cortina metálica?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  El tiempo de instalación varía según el tipo y tamaño: cortinas residenciales estándar 2-4 horas,
                  cortinas comerciales 4-6 horas, cortinas industriales de gran formato 6-12 horas. Incluye medición
                  previa gratuita, fabricación a medida en nuestro taller (3-5 días hábiles), instalación profesional
                  con herramientas especializadas, pruebas de funcionamiento completas, capacitación en uso y
                  mantenimiento, y limpieza total del área de trabajo. Trabajamos los 7 días de la semana incluyendo
                  feriados para urgencias.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  ¿Ofrecen servicio de reparación de cortinas metálicas las 24 horas?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Sí, ofrecemos servicio técnico de emergencia 24 horas los 365 días del año en toda la zona sur de
                  Buenos Aires y Capital Federal. Nuestros técnicos especializados cuentan con vehículos equipados con
                  repuestos originales, herramientas profesionales y equipos de soldadura móvil. Atendemos urgencias por
                  cortinas trabadas, motores quemados, roturas por vandalismo, accidentes vehiculares y fallas
                  eléctricas. Tiempo de respuesta promedio: 45 minutos en zona sur, 90 minutos en Capital Federal.
                  Diagnóstico gratuito y presupuesto sin compromiso.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="sr-only" aria-hidden="true">
        <h2>Información Técnica Detallada - Cortinas Metálicas Premium Buenos Aires</h2>

        <h3>Especificaciones Técnicas Completas</h3>
        <p>
          Nuestras cortinas metálicas están fabricadas con chapa galvanizada de primera calidad en espesores BWG 25
          (0,5mm) para uso residencial liviano, BWG 24 (0,6mm) para uso comercial estándar y BWG 22 (0,7mm) para uso
          industrial pesado. Las guías laterales son de chapa doblada reforzada con tratamiento anticorrosivo, soldadas
          con electrodo 6013 y terminación lisa. Los resortes de torsión están balanceados según el peso específico de
          cada cortina, fabricados en acero SAE 1070 templado y revenido. Los ejes son de hierro macizo torneado de 1"
          para cortinas hasta 15m² y 1¼" para cortinas mayores, con rodamientos blindados 6204 ZZ importados de primera
          calidad.
        </p>

        <h3>Tratamientos Superficiales y Acabados</h3>
        <p>
          Aplicamos galvanizado en caliente por inmersión según norma IRAM-IAS U 500-503 con espesor mínimo de
          recubrimiento Z275 (275g/m²) para máxima protección anticorrosiva. Los acabados disponibles incluyen: blanco
          RAL 9010, beige RAL 1013, gris RAL 7035, verde RAL 6005, azul RAL 5010, bordó RAL 3005, negro RAL 9005, símil
          madera roble y cedro, aluminio natural anodizado. La pintura es poliuretánica de dos componentes con
          protección UV, aplicada en cabina con sistema electrostático para adherencia superior y acabado uniforme.
          Garantizamos la integridad del recubrimiento por 5 años contra descascarado, ampollado y corrosión.
        </p>

        <h3>Sistemas de Automatización Avanzada</h3>
        <p>
          Los motores tubulares Somfy Oximo RTS 20/17 y 30/17 incorporan tecnología radio RTS (Radio Technology Somfy)
          con frecuencia 433.42 MHz, alcance hasta 200 metros en campo abierto, receptor integrado, finales de carrera
          electrónicos ajustables, detección de obstáculos por amperaje, función My (posición intermedia programable),
          modo ventilación, protección térmica clase F, grado de protección IP44 y garantía internacional de 5 años. Los
          motores Pujol Eco Line incluyen central de mando con display LCD, programación por botones, memoria de 40
          controles remotos, salida para luz de cortesía, entrada para fotocélulas, temporizador de cierre automático y
          función hombre muerto para seguridad.
        </p>

        <h3>Accesorios y Elementos de Seguridad</h3>
        <p>
          Fotocélulas de seguridad con haz infrarrojo de 12 metros, grado de protección IP65, autotest automático y led
          indicador de estado. Pulsadores de emergencia tipo hongo con enclavamiento, contacto NA+NC, caja estanca IP65
          y cable de 5 metros. Llaves de corte general con fusibles de protección 10A, contactores electromagnéticos
          Schneider Electric, relés temporizadores multifunción y borneras de conexión numeradas. Sistemas de emergencia
          manual con manivela desmontable, cadena galvanizada 6mm con funda protectora, poleas de bronce con rodamientos
          y mecanismo de desembrague rápido para accionamiento en caso de corte de energía eléctrica.
        </p>

        <h3>Puertas de Escape Homologadas</h3>
        <p>
          Fabricamos puertas de escape según norma IRAM 11.507 "Medios de escape en caso de emergencia" con
          certificación de bomberos y habilitación municipal. Dimensiones estándar 0,80 x 2,00 metros con posibilidad de
          medidas especiales. Estructura de caño estructural 40x40x2mm, chapa de cerramiento BWG 18, bisagras reforzadas
          tipo piano, cerradura antipánico homologada, barra de empuje horizontal, cierre automático con resorte
          regulable, tope de apertura a 90°, umbral bajo de 15mm máximo y señalización reflectiva según código de
          edificación. Incluye instalación profesional, pruebas de funcionamiento y documentación para habilitaciones
          comerciales.
        </p>

        <h3>Mantenimiento Preventivo Especializado</h3>
        <p>
          Nuestro programa de mantenimiento preventivo incluye: lubricación de rodamientos con grasa de litio grado 2,
          ajuste de tensión de resortes con llave dinamométrica, verificación de desgaste en guías y burletes, limpieza
          de fotocélulas y sensores, prueba de funcionamiento de sistemas de emergencia, medición de consumo eléctrico
          de motores, ajuste de finales de carrera, verificación de fijaciones y anclajes, retoque de pintura en zonas
          de desgaste, reemplazo preventivo de elementos de desgaste y emisión de certificado de mantenimiento. La
          frecuencia recomendada es semestral para uso comercial intensivo, anual para uso residencial y trimestral para
          uso industrial con ambiente agresivo.
        </p>

        <h3>Cobertura Geográfica Detallada Zona Sur</h3>
        <p>
          Brindamos servicio completo en los siguientes partidos y localidades: Ezeiza (El Jagüel, Tristán Suárez,
          Carlos Spegazzini, 9 de Abril), Lomas de Zamora (Lomas centro, Temperley, Banfield, Llavallol, Turdera, Villa
          Fiorito, Villa Albertina), Quilmes (Quilmes centro, Bernal, Ezpeleta, Don Bosco, San Francisco Solano, Villa
          La Florida), Avellaneda (Avellaneda centro, Dock Sud, Villa Domínico, Sarandí, Villa Luján, Gerli), Lanús
          (Lanús Este, Lanús Oeste, Remedios de Escalada, Monte Chingolo, Villa Caraza), Florencio Varela (Florencio
          Varela centro, Villa San Luis, Bosques, Ingeniero Allan, Zeballos), Berazategui (Berazategui centro, Ranelagh,
          Sourigues, Villa España, El Pato, Hudson), Almirante Brown (Adrogué, Burzaco, Longchamps, Glew, Rafael
          Calzada, Claypole, José Mármol, Malvinas Argentinas), La Plata (La Plata centro, Villa Elisa, City Bell,
          Gonnet, Ringuelet, Tolosa, Los Hornos, Altos de San Lorenzo), Ensenada (Ensenada centro, Punta Lara), Berisso
          (Berisso centro, Villa Progreso, Villa Nueva) y Capital Federal (todos los barrios de CABA con especial
          cobertura en zona sur: Barracas, La Boca, San Telmo, Constitución, Pompeya, Nueva Pompeya, Parque Patricios).
        </p>

        <h3>Certificaciones y Normativas Técnicas</h3>
        <p>
          Cumplimos estrictamente con las siguientes normativas: IRAM 11.507 "Medios de escape - Puertas de emergencia",
          IRAM-IAS U 500-503 "Galvanizado por inmersión en caliente", Código de Edificación de la Ciudad de Buenos
          Aires, Reglamento de Instalaciones Eléctricas en Inmuebles (RIEI), normas de seguridad e higiene en el trabajo
          según Ley 19.587, certificación CE para motores importados, homologación de bomberos para puertas de escape,
          habilitación municipal para instalaciones comerciales, seguro de responsabilidad civil por $50.000.000,
          técnicos matriculados en el Consejo Profesional de Ingeniería Industrial (CPII) y certificación ISO 9001 en
          procesos de fabricación e instalación.
        </p>

        <h3>Financiación y Formas de Pago 2024</h3>
        <p>
          Aceptamos todas las formas de pago: efectivo con descuento del 10%, tarjetas de crédito Visa, Mastercard,
          American Express y Diners Club en hasta 18 cuotas sin interés, tarjetas de débito con descuento del 5%,
          transferencia bancaria con descuento del 8%, Mercado Pago con todas las promociones vigentes, cheques al día y
          diferidos hasta 180 días, pagarés con aval bancario, leasing financiero para empresas, créditos del Banco
          Nación línea PyME, Ahora 12 y Ahora 18 del gobierno nacional, financiación propia hasta 24 cuotas con tasa
          preferencial, descuentos especiales para jubilados y pensionados, promociones por volumen para constructoras e
          inmobiliarias, y planes de pago personalizados según cada situación particular.
        </p>

        <h3>Keywords SEO Long-Tail Específicas</h3>
        <p>
          cortinas metálicas automáticas buenos aires capital federal, fabricación cortinas metálicas medida zona sur
          gba, instalación cortinas metálicas profesional 24 horas, cortinas enrollables metálicas motor somfy premium,
          cortinas metálicas microperforadas ventilación comercial, cortinas metálicas galvanizadas anticorrosión
          residencial, cortinas metálicas automatizadas control remoto múltiple, persianas enrollables metálicas chapa
          galvanizada z275, cortinas metálicas comerciales locales shopping centros, cortinas metálicas industriales
          depósitos galpones fábricas, cortinas metálicas residenciales casas departamentos cocheras, puertas cortinas
          metálicas escape emergencia comercial, cortinas metálicas sistema automatizado domótica wifi, cortinas
          metálicas motor tubular encoder posición, cortinas metálicas persiana enrollable doble pared, cortinas
          metálicas seguridad comercial antirrobo alarma, cortinas metálicas herrería especializada fabricación propia,
          cortinas metálicas instalación domicilio medición gratuita, cortinas metálicas el jagüel ezeiza zona sur,
          cortinas metálicas lomas zamora quilmes avellaneda, cortinas metálicas lanús banfield temperley adrogué,
          cortinas metálicas florencio varela berazategui hudson, cortinas metálicas almirante brown claypole glew,
          cortinas metálicas esteban echeverría monte grande, cortinas metálicas la matanza ramos mejía laferrere,
          cortinas metálicas merlo moreno libertad san justo, cortinas metálicas morón castelar haedo villa sarmiento,
          cortinas metálicas tres febrero caseros santos lugares, cortinas metálicas san martín villa ballester
          chilavert, cortinas metálicas vicente lópez olivos florida munro, cortinas metálicas san isidro acassuso
          beccar, cortinas metálicas tigre don torcuato benavídez, cortinas metálicas san fernando virreyes victoria,
          cortinas metálicas malvinas argentinas grand bourg, cortinas metálicas josé paz derqui guernica, cortinas
          metálicas san miguel bella vista, cortinas metálicas hurlingham william morris villa tesei, cortinas metálicas
          ituzaingó castelar norte villa udaondo, cortinas metálicas la plata city bell villa elisa, cortinas metálicas
          ensenada berisso punta lara, cortinas metálicas brandsen jeppener altamirano, cortinas metálicas cañuelas
          uribelarrea máximo paz, cortinas metálicas general rodríguez ingeniero budge, cortinas metálicas marcos paz
          merlo san antonio, cortinas metálicas pilar del viso manzanares, cortinas metálicas escobar belén de escobar
          matheu, cortinas metálicas campana zárate lima baradero, cortinas metálicas luján mercedes suipacha chivilcoy,
          cortinas metálicas navarro lobos saladillo 25 mayo, cortinas metálicas pergamino rojas salto arrecifes
        </p>
      </div>

      <footer className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-white py-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Mónaco Cortinas Metálicas - Fabricación, instalación y reparación de cortinas metálicas premium,
                galvanizadas, microperforadas y automatizadas. Herrería especializada, motores Somfy-Pujol-Mofic y
                servicio técnico 24/7 en Buenos Aires, zona sur GBA y Capital Federal.
              </p>
              <ul className="flex space-x-4" role="list" aria-label="Redes sociales">
                <li>
                  <a
                    href="https://www.facebook.com/MonacoCortinas"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                    aria-label="Síguenos en Facebook - Cortinas Metálicas Mónaco Buenos Aires"
                  >
                    <span className="text-white font-bold text-sm">f</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/monacocortinas"
                    className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer"
                    aria-label="Síguenos en Instagram - Fotos cortinas metálicas instaladas zona sur"
                  >
                    <span className="text-white font-bold text-sm">@</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5491144393030"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                    aria-label="Contáctanos por WhatsApp - Presupuesto gratuito cortinas metálicas 24hs"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-white">Servicios Principales</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="#productos" className="hover:text-blue-400 transition-colors duration-300">
                    Cortinas Metálicas Residenciales Garages
                  </a>
                </li>
                <li>
                  <a href="#productos" className="hover:text-blue-400 transition-colors duration-300">
                    Cortinas Metálicas Comerciales Locales
                  </a>
                </li>
                <li>
                  <a href="#productos" className="hover:text-blue-400 transition-colors duration-300">
                    Cortinas Metálicas Industriales Fábricas
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-blue-400 transition-colors duration-300">
                    Automatización con Motores Somfy
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-blue-400 transition-colors duration-300">
                    Reparaciones Urgentes 24 Horas
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-white">Información de Contacto</h3>
              <address className="space-y-4 text-gray-300 not-italic">
                <p className="flex items-center hover:text-blue-400 transition-colors duration-300">
                  <Phone className="w-5 h-5 mr-3" aria-hidden="true" />
                  <a href="tel:+541128817818">+54 9 11 4439-3030</a>
                </p>
                <p className="flex items-center hover:text-blue-400 transition-colors duration-300">
                  <Mail className="w-5 h-5 mr-3" aria-hidden="true" />
                  <a href="mailto:info.monacocortinas@gmail.com">info.monacocortinas@gmail.com</a>
                </p>
                <p className="flex items-start hover:text-blue-400 transition-colors duration-300">
                  <MapPin className="w-5 h-5 mr-3 mt-1" aria-hidden="true" />
                  Mariano Castex 100, El Jagüel, Buenos Aires, Argentina
                </p>
              </address>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-white">Newsletter</h3>
              <p className="text-gray-300 mb-4">Recibe novedades y ofertas especiales</p>
              <div className="space-y-3">
                <Input
                  placeholder="Tu email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                />
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  aria-label="Suscribirse al newsletter"
                >
                  Suscribirse
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p className="text-lg">
              &copy; 2025 Mónaco Cortinas Metálicas. Todos los derechos reservados. | Fabricación e instalación de
              cortinas metálicas en Buenos Aires
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

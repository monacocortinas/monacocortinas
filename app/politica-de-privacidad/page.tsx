"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <nav aria-label="Navegación principal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logo-monaco.webp"
                alt="Mónaco Cortinas Metálicas - Logo"
                className="h-10 lg:h-12 w-auto"
                width={120}
                height={48}
                priority
              />
            </Link>

            <Link href="/">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('/modern-industrial-building-with-metal-shutters.webp')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95"></div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-6 py-2 text-base">
              Información Legal
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">Política de Privacidad</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              En Mónaco Cortinas Metálicas nos comprometemos a proteger tu privacidad y datos personales
            </p>
            <div className="flex items-center justify-center gap-4 mt-8 text-sm text-slate-400">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                Datos Protegidos
              </div>
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-2 text-blue-400" />
                Información Segura
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction Card */}
          <Card className="mb-12 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Compromiso con tu Privacidad</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Esta Política de Privacidad describe cómo Mónaco Cortinas Metálicas recopila, utiliza y protege la
                    información personal que nos proporcionas a través de nuestro sitio web{" "}
                    <strong>monacocortinas.com.ar</strong> y nuestros servicios.
                  </p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                <strong>Última actualización:</strong> Enero 2025
              </p>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">1. Información que Recopilamos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 lg:p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Recopilamos información personal que nos proporcionas voluntariamente cuando:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Solicitas un presupuesto o información sobre nuestros servicios</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Completas formularios de contacto en nuestro sitio web</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Te comunicas con nosotros por teléfono, email o WhatsApp</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Contratas nuestros servicios de instalación o reparación</span>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-gray-700 font-medium mb-2">Los datos que podemos recopilar incluyen:</p>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Nombre y apellido</li>
                    <li>• Dirección de correo electrónico</li>
                    <li>• Número de teléfono</li>
                    <li>• Dirección física (para instalaciones)</li>
                    <li>• Información sobre el servicio solicitado</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">2. Uso de la Información</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 lg:p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Utilizamos la información recopilada para los siguientes propósitos:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Prestación de servicios:</strong> Procesar solicitudes de presupuestos, coordinar
                      instalaciones y reparaciones
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Comunicación:</strong> Responder consultas, enviar confirmaciones y actualizaciones sobre
                      servicios
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Mejora de servicios:</strong> Analizar y mejorar la calidad de nuestros productos y
                      atención al cliente
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Marketing:</strong> Enviar información sobre promociones y novedades (solo con tu
                      consentimiento)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Cumplimiento legal:</strong> Cumplir con obligaciones legales y regulatorias aplicables
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 3 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Lock className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">3. Protección de Datos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 lg:p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Cifrado SSL/TLS para transmisión segura de datos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Acceso restringido a información personal solo a personal autorizado</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Almacenamiento seguro en servidores protegidos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Revisiones periódicas de nuestras prácticas de seguridad</span>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-gray-700 font-medium flex items-center">
                    <Shield className="w-5 h-5 text-amber-600 mr-2" />
                    Importante:
                  </p>
                  <p className="text-gray-600 mt-2">
                    Ningún método de transmisión por Internet es 100% seguro. Aunque nos esforzamos por proteger tu
                    información, no podemos garantizar su seguridad absoluta.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 4 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">4. Compartir Información</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 lg:p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  <strong>No vendemos, alquilamos ni compartimos</strong> tu información personal con terceros para
                  fines de marketing. Podemos compartir información solo en los siguientes casos:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar nuestro negocio (ej:
                      hosting, procesamiento de pagos)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Requisitos legales:</strong> Cuando sea necesario para cumplir con la ley o proteger
                      nuestros derechos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Con tu consentimiento:</strong> En cualquier otro caso, solo con tu autorización expresa
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 5 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">5. Tus Derechos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 lg:p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  De acuerdo con la Ley de Protección de Datos Personales N° 25.326 de Argentina, tienes derecho a:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Acceso:</strong> Solicitar información sobre los datos personales que tenemos sobre ti
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Rectificación:</strong> Corregir datos inexactos o incompletos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Supresión:</strong> Solicitar la eliminación de tus datos personales
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Oposición:</strong> Oponerte al procesamiento de tus datos para ciertos fines
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Portabilidad:</strong> Recibir tus datos en un formato estructurado y de uso común
                    </span>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-gray-700 font-medium mb-2">Para ejercer estos derechos, contáctanos:</p>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-blue-600" />
                      info.monacocortinas@gmail.com
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-blue-600" />
                      +54 9 11 4439-3030
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 6 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Eye className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">6. Cookies y Tecnologías Similares</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 lg:p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Nuestro sitio web utiliza cookies y tecnologías similares para mejorar tu experiencia:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Cookies analíticas:</strong> Para entender cómo los usuarios interactúan con nuestro sitio
                      (Google Analytics)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Cookies de marketing:</strong> Para mostrar anuncios relevantes (Google Ads)
                    </span>
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del
                  sitio.
                </p>
              </CardContent>
            </Card>

            {/* Section 7 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">7. Retención de Datos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 lg:p-8">
                <p className="text-gray-600 leading-relaxed">
                  Conservamos tu información personal solo durante el tiempo necesario para cumplir con los fines para
                  los que fue recopilada, incluyendo requisitos legales, contables o de informes. Cuando ya no sea
                  necesaria, eliminaremos o anonimizaremos tu información de manera segura.
                </p>
              </CardContent>
            </Card>

            {/* Section 8 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <Shield className="w-6 h-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">8. Cambios a esta Política</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 lg:p-8">
                <p className="text-gray-600 leading-relaxed">
                  Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras
                  prácticas o por razones legales. Te notificaremos sobre cambios significativos publicando la nueva
                  política en nuestro sitio web con una fecha de "última actualización" revisada. Te recomendamos
                  revisar esta política regularmente.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <Card className="mt-12 border-0 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">¿Tienes Preguntas sobre tu Privacidad?</h2>
                <p className="text-slate-300 text-lg">
                  Estamos aquí para ayudarte. Contáctanos si tienes dudas sobre cómo manejamos tu información.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-white font-semibold text-center mb-2">Email</p>
                  <p className="text-slate-300 text-center text-sm">info.monacocortinas@gmail.com</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Phone className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <p className="text-white font-semibold text-center mb-2">Teléfono</p>
                  <p className="text-slate-300 text-center text-sm">+54 9 11 4439-3030</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-white font-semibold text-center mb-2">Dirección</p>
                  <p className="text-slate-300 text-center text-sm">Mariano Castex 100, El Jagüel, Buenos Aires</p>
                </div>
              </div>

              <div className="text-center mt-8">
                <Link href="/">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
                  >
                    Volver al Inicio
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 mb-4">&copy; 2025 Mónaco Cortinas Metálicas. Todos los derechos reservados.</p>
            <div className="flex justify-center gap-6 text-sm text-gray-400">
              <Link href="/politica-de-privacidad" className="hover:text-blue-400 transition-colors">
                Política de Privacidad
              </Link>
              <span>|</span>
              <Link href="/#contacto" className="hover:text-blue-400 transition-colors">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

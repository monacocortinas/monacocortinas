"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Package, FileText, Settings, CheckCircle, Truck, Calculator } from 'lucide-react'
import Link from "next/link"

const TABLILLA_OPTIONS = [
  { id: "tablilla-1", name: "Tablilla Galvanizada 0.6", pricePerUnit: 1843 },
  { id: "tablilla-2", name: "Tablilla Galvanizada 0.7", pricePerUnit: 2483 },
  { id: "tablilla-3", name: "Tablilla Galvanizada microperforada 0.6", pricePerUnit: 2030 },
  { id: "tablilla-4", name: "Tablilla Galvanizada microperforada 0.7", pricePerUnit: 2684 },
]

const GUIDE_OPTIONS = [
  { id: "guia-ga", name: "Guía Galvanizada", pricePerMeter: 4126 },
  { id: "guia-de", name: "Guía De seguridad Galvanizada", pricePerMeter: 10500 },
]

const AXIS_PRICE_PER_METER = 13500
const MOTOR_PRICE = 180000
const ESCAPE_DOOR_PRICE = 200000
const ZOCALO_PRICE = 26000
const TRANSMISSION_MANUAL_PRICE = 100000

const TABLILLAS_PER_METER_HEIGHT = 13

export default function DesgloseProveedores() {
  const [height, setHeight] = useState("")
  const [width, setWidth] = useState("")
  const [addDevelopment, setAddDevelopment] = useState(false)
  const [selectedTablillaId, setSelectedTablillaId] = useState(TABLILLA_OPTIONS[0].id)
  const [selectedGuideId, setSelectedGuideId] = useState(GUIDE_OPTIONS[0].id)
  const [includeMotor, setIncludeMotor] = useState(false)
  const [hasEscapeDoor, setHasEscapeDoor] = useState(false)
  const [includeTransmissionManual, setIncludeTransmissionManual] = useState(false)
  const [clientName, setClientName] = useState("")
  const [showSupplierList, setShowSupplierList] = useState(false)
  const [supplierListText, setSupplierListText] = useState("")

  const [materialBreakdown, setMaterialBreakdown] = useState({
    totalTablillasNeeded: 0,
    guideMetersNeeded: 0,
    axisMetersNeeded: 0,
    zocaloMetersNeeded: 0,
    finalHeight: 0,
  })

  const selectedTablilla = TABLILLA_OPTIONS.find((t) => t.id === selectedTablillaId)
  const selectedGuide = GUIDE_OPTIONS.find((g) => g.id === selectedGuideId)

  useEffect(() => {
    const heightValue = Number.parseFloat(height) || 0
    const widthValue = Number.parseFloat(width) || 0
    const finalHeight = addDevelopment ? heightValue + 0.4 : heightValue

    const totalTablillasNeeded = Math.ceil(TABLILLAS_PER_METER_HEIGHT * finalHeight)
    const guideMetersNeeded = finalHeight * 2 // Par de guías
    const axisMetersNeeded = widthValue
    const zocaloMetersNeeded = widthValue

    setMaterialBreakdown({
      totalTablillasNeeded,
      guideMetersNeeded,
      axisMetersNeeded,
      zocaloMetersNeeded,
      finalHeight,
    })
  }, [height, width, addDevelopment])

  const generateSupplierList = () => {
    const heightValue = Number.parseFloat(height) || 0
    const widthValue = Number.parseFloat(width) || 0
    const currentDate = new Date().toLocaleDateString("es-AR")

    const supplierList = `LISTA DE MATERIALES PARA PROVEEDORES

Cliente: ${clientName || "[Nombre del Cliente]"}
Fecha: ${currentDate}
Proyecto: Cortina Metálica ${widthValue.toFixed(2)}m (ancho) x ${materialBreakdown.finalHeight.toFixed(2)}m (alto)${addDevelopment ? " (incluye desarrollo)" : ""}

═══════════════════════════════════════════════════════════════

📋 MATERIALES PRINCIPALES

🔹 TABLILLAS:
   • Tipo: ${selectedTablilla?.name}
   • Cantidad: ${materialBreakdown.totalTablillasNeeded} unidades
   • Cálculo: ${TABLILLAS_PER_METER_HEIGHT} tablillas/metro × ${materialBreakdown.finalHeight.toFixed(2)}m = ${(TABLILLAS_PER_METER_HEIGHT * materialBreakdown.finalHeight).toFixed(1)} → ${materialBreakdown.totalTablillasNeeded} unidades (redondeado hacia arriba)

🔹 GUÍAS:
   • Tipo: ${selectedGuide?.name}
   • Cantidad: ${materialBreakdown.guideMetersNeeded.toFixed(2)} metros lineales (PAR)
   • Cálculo: ${materialBreakdown.finalHeight.toFixed(2)}m × 2 guías = ${materialBreakdown.guideMetersNeeded.toFixed(2)}m
   • Especificación: Se necesitan 2 guías de ${materialBreakdown.finalHeight.toFixed(2)}m cada una

🔹 EJE REFORZADO:
   • Tipo: Eje Galvanizado Reforzado
   • Cantidad: ${materialBreakdown.axisMetersNeeded.toFixed(2)} metros lineales
   • Medida: ${widthValue.toFixed(2)}m de ancho

🔹 ZÓCALO:
   • Tipo: Zócalo Reforzado Galvanizado
   • Cantidad: ${materialBreakdown.zocaloMetersNeeded.toFixed(2)} metros lineales
   • Medida: ${widthValue.toFixed(2)}m de ancho

═══════════════════════════════════════════════════════════════

🔧 ACCESORIOS Y AUTOMATIZACIÓN

${includeMotor ? `✅ MOTOR AUTOMÁTICO:
   • Tipo: Motor Tubular con 2 Controles Remotos
   • Cantidad: 1 unidad
   • Especificación: Motor para cortina de ${widthValue.toFixed(2)}m × ${materialBreakdown.finalHeight.toFixed(2)}m

` : "❌ Motor: NO incluido\n\n"}${hasEscapeDoor ? `✅ PUERTA DE ESCAPE:
   • Tipo: Puerta de Escape Certificada
   • Cantidad: 1 unidad
   • Especificación: Cumple normativas de seguridad

` : "❌ Puerta de Escape: NO incluida\n\n"}${includeTransmissionManual ? `✅ TRANSMISIÓN MANUAL:
   • Tipo: Sistema de Transmisión Manual Reforzado
   • Cantidad: 1 unidad
   • Especificación: Operación manual con cadena

` : "❌ Transmisión Manual: NO incluida\n\n"}═══════════════════════════════════════════════════════════════

🔩 HERRAJES Y COMPONENTES ADICIONALES

• Tiros reforzados galvanizados
• Herrajes de fijación y montaje
• Tornillería galvanizada completa
• Burletes de goma (si corresponde)
• Cerradura de seguridad
• Manijas y accesorios de operación

═══════════════════════════════════════════════════════════════

📐 ESPECIFICACIONES TÉCNICAS

• Dimensiones del vano: ${widthValue.toFixed(2)}m (ancho) × ${Number.parseFloat(height) || 0}m (alto)
• Altura total con desarrollo: ${materialBreakdown.finalHeight.toFixed(2)}m
• Área total: ${(widthValue * materialBreakdown.finalHeight).toFixed(2)}m²
• Desarrollo adicional: ${addDevelopment ? "SÍ (+40cm)" : "NO"}

═══════════════════════════════════════════════════════════════

📞 CONTACTO PARA PEDIDOS

Empresa: Mónaco Cortinas Metálicas
Teléfono: +54 11 2881-7818
Email: Monaco.cor@gmail.com
Dirección: Mariano Castex 100, El Jagüel, Ezeiza

═══════════════════════════════════════════════════════════════

⚠️  NOTAS IMPORTANTES:

• Verificar disponibilidad de stock antes de confirmar
• Coordinar tiempos de entrega con cronograma de obra
• Todos los materiales deben ser galvanizados Z275
• Solicitar certificados de calidad de galvanizado
• Confirmar medidas exactas antes de fabricación

═══════════════════════════════════════════════════════════════

Generado el: ${currentDate}
Válido por: 15 días`

    setSupplierListText(supplierList)
    setShowSupplierList(true)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50/30 p-4">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 pt-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Inicio
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/cotizador" className="hover:text-blue-600 transition-colors">
                Cotizador
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Desglose para Proveedores</li>
          </ol>
        </nav>

        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Package className="h-8 w-8 text-green-600" aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-gray-900">
              Desglose de Materiales para Proveedores
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Herramienta especializada para generar listas detalladas de materiales y cantidades exactas que necesitas solicitar a tus proveedores.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">✓ Cantidades Exactas</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">✓ Especificaciones Técnicas</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">✓ Lista Lista para Enviar</span>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-green-600" aria-hidden="true" />
                  <CardTitle className="font-heading text-xl">Configuración del Proyecto</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  Configure las especificaciones para generar la lista de materiales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="client-name" className="text-sm font-medium text-gray-700">
                    Nombre del Cliente/Proyecto
                  </Label>
                  <Input
                    id="client-name"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ingrese el nombre del cliente o proyecto"
                    className="transition-all duration-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Dimensiones de la Cortina Metálica
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height" className="text-sm font-medium text-gray-700">
                        Altura (metros)
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        min="0"
                        step="0.1"
                        placeholder="0.00"
                        className="transition-all duration-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width" className="text-sm font-medium text-gray-700">
                        Ancho (metros)
                      </Label>
                      <Input
                        id="width"
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        min="0"
                        step="0.1"
                        placeholder="0.00"
                        className="transition-all duration-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-green-500/30 transition-colors">
                    <Checkbox
                      id="add-development"
                      checked={addDevelopment}
                      onCheckedChange={(checked) => setAddDevelopment(Boolean(checked))}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <div className="flex-1">
                      <Label htmlFor="add-development" className="font-medium text-gray-900 cursor-pointer">
                        Agregar Desarrollo de Cortina
                      </Label>
                      <p className="text-sm text-gray-500">Añade 40cm adicionales a la altura para el enrollado</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Materiales y Especificaciones
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="tablilla-select" className="text-sm font-medium text-gray-700">
                      Tipo de Tablilla
                    </Label>
                    <Select value={selectedTablillaId} onValueChange={setSelectedTablillaId}>
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-green-500/20">
                        <SelectValue placeholder="Selecciona el tipo de tablilla" />
                      </SelectTrigger>
                      <SelectContent>
                        {TABLILLA_OPTIONS.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{option.name}</span>
                              <span className="text-sm text-gray-500">
                                {formatCurrency(option.pricePerUnit)}/unidad
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guide-select" className="text-sm font-medium text-gray-700">
                      Sistema de Guías
                    </Label>
                    <Select value={selectedGuideId} onValueChange={setSelectedGuideId}>
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-green-500/20">
                        <SelectValue placeholder="Selecciona el tipo de guía" />
                      </SelectTrigger>
                      <SelectContent>
                        {GUIDE_OPTIONS.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{option.name}</span>
                              <span className="text-sm text-gray-500">
                                {formatCurrency(option.pricePerMeter)}/metro
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Accesorios Adicionales
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-green-500/30 transition-colors">
                      <Checkbox
                        id="include-motor"
                        checked={includeMotor}
                        onCheckedChange={(checked) => setIncludeMotor(Boolean(checked))}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <div className="flex-1">
                        <Label htmlFor="include-motor" className="font-medium text-gray-900 cursor-pointer">
                          Motor Automatizado
                        </Label>
                        <p className="text-sm text-gray-500">Motor tubular con 2 controles remotos</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-green-500/30 transition-colors">
                      <Checkbox
                        id="escape-door"
                        checked={hasEscapeDoor}
                        onCheckedChange={(checked) => setHasEscapeDoor(Boolean(checked))}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <div className="flex-1">
                        <Label htmlFor="escape-door" className="font-medium text-gray-900 cursor-pointer">
                          Puerta de Escape
                        </Label>
                        <p className="text-sm text-gray-500">Puerta certificada para emergencias</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-green-500/30 transition-colors">
                      <Checkbox
                        id="transmission-manual"
                        checked={includeTransmissionManual}
                        onCheckedChange={(checked) => setIncludeTransmissionManual(Boolean(checked))}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <div className="flex-1">
                        <Label htmlFor="transmission-manual" className="font-medium text-gray-900 cursor-pointer">
                          Transmisión Manual
                        </Label>
                        <p className="text-sm text-gray-500">Sistema de operación manual con cadena</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-blue-50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-2xl text-gray-900 flex items-center gap-2">
                  <Truck className="h-6 w-6 text-green-600" />
                  Resumen de Materiales
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Cantidades exactas para solicitar a proveedores
                </CardDescription>
              </CardHeader>
              <CardContent>
                {Number.parseFloat(height) > 0 && Number.parseFloat(width) > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-white/60 rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Package className="h-4 w-4 text-green-600" />
                        Materiales Principales
                      </h4>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center p-2 bg-white/80 rounded">
                          <span className="font-medium">Tablillas ({selectedTablilla?.name}):</span>
                          <span className="font-bold text-green-700">{materialBreakdown.totalTablillasNeeded} unidades</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-2 bg-white/80 rounded">
                          <span className="font-medium">Guías ({selectedGuide?.name}):</span>
                          <span className="font-bold text-green-700">{materialBreakdown.guideMetersNeeded.toFixed(2)} metros</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-2 bg-white/80 rounded">
                          <span className="font-medium">Eje Reforzado:</span>
                          <span className="font-bold text-green-700">{materialBreakdown.axisMetersNeeded.toFixed(2)} metros</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-2 bg-white/80 rounded">
                          <span className="font-medium">Zócalo Reforzado:</span>
                          <span className="font-bold text-green-700">{materialBreakdown.zocaloMetersNeeded.toFixed(2)} metros</span>
                        </div>
                      </div>
                    </div>

                    {(includeMotor || hasEscapeDoor || includeTransmissionManual) && (
                      <div className="bg-white/60 rounded-lg p-4 space-y-3">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Settings className="h-4 w-4 text-blue-600" />
                          Accesorios Adicionales
                        </h4>
                        
                        <div className="space-y-2 text-sm">
                          {includeMotor && (
                            <div className="flex justify-between items-center p-2 bg-white/80 rounded">
                              <span className="font-medium">Motor con Controles:</span>
                              <span className="font-bold text-blue-700">1 unidad</span>
                            </div>
                          )}
                          
                          {hasEscapeDoor && (
                            <div className="flex justify-between items-center p-2 bg-white/80 rounded">
                              <span className="font-medium">Puerta de Escape:</span>
                              <span className="font-bold text-blue-700">1 unidad</span>
                            </div>
                          )}
                          
                          {includeTransmissionManual && (
                            <div className="flex justify-between items-center p-2 bg-white/80 rounded">
                              <span className="font-medium">Transmisión Manual:</span>
                              <span className="font-bold text-blue-700">1 unidad</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Especificaciones del Proyecto:</h4>
                      <div className="text-sm space-y-1 text-gray-700">
                        <p>• Dimensiones: {Number.parseFloat(width) || 0}m × {materialBreakdown.finalHeight.toFixed(2)}m</p>
                        <p>• Área total: {((Number.parseFloat(width) || 0) * materialBreakdown.finalHeight).toFixed(2)}m²</p>
                        {addDevelopment && <p>• Incluye desarrollo: +40cm</p>}
                      </div>
                    </div>

                    <Button
                      onClick={generateSupplierList}
                      size="lg"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Generar Lista para Proveedores
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Ingresa las dimensiones para ver el desglose de materiales</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {Number.parseFloat(height) > 0 && Number.parseFloat(width) > 0 && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Cálculos Detallados</CardTitle>
                  <CardDescription>Cómo se calculan las cantidades</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">Tablillas:</h5>
                      <p className="text-gray-600">
                        {TABLILLAS_PER_METER_HEIGHT} tablillas/metro × {materialBreakdown.finalHeight.toFixed(2)}m = {(TABLILLAS_PER_METER_HEIGHT * materialBreakdown.finalHeight).toFixed(1)} → {materialBreakdown.totalTablillasNeeded} unidades
                      </p>
                      <p className="text-xs text-gray-500 mt-1">(Se redondea hacia arriba)</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">Guías (Par):</h5>
                      <p className="text-gray-600">
                        {materialBreakdown.finalHeight.toFixed(2)}m × 2 guías = {materialBreakdown.guideMetersNeeded.toFixed(2)}m totales
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Se necesitan 2 guías de {materialBreakdown.finalHeight.toFixed(2)}m cada una</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">Eje y Zócalo:</h5>
                      <p className="text-gray-600">
                        Ambos requieren {Number.parseFloat(width) || 0}m lineales (ancho de la cortina)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {showSupplierList && (
          <Card className="mt-8 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                <CardTitle className="font-heading text-xl">Lista de Materiales para Proveedores</CardTitle>
              </div>
              <CardDescription>Lista detallada lista para enviar a tus proveedores</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={supplierListText}
                onChange={(e) => setSupplierListText(e.target.value)}
                className="min-h-[600px] font-mono text-sm bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                placeholder="La lista de materiales aparecerá aquí..."
              />
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button
                onClick={() => navigator.clipboard.writeText(supplierListText)}
                variant="outline"
                className="hover:bg-green-50 hover:border-green-500/30 transition-colors"
              >
                Copiar al Portapapeles
              </Button>
              <Button
                onClick={() => setShowSupplierList(false)}
                variant="outline"
                className="hover:bg-gray-50 transition-colors"
              >
                Ocultar Lista
              </Button>
            </CardFooter>
          </Card>
        )}

        <section className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Cómo Funciona el Desglose de Materiales?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Configura el Proyecto</h3>
              <p className="text-gray-600 text-sm">
                Ingresa las medidas y selecciona los materiales y accesorios necesarios
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cálculo Automático</h3>
              <p className="text-gray-600 text-sm">
                El sistema calcula automáticamente las cantidades exactas de cada material
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lista para Proveedores</h3>
              <p className="text-gray-600 text-sm">
                Genera una lista detallada con especificaciones técnicas lista para enviar
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ventajas de Usar Esta Herramienta</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Cantidades exactas sin desperdicios
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Especificaciones técnicas detalladas
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Lista profesional para proveedores
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Ahorra tiempo en pedidos
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Evita errores de cálculo
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Formato listo para WhatsApp/Email
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

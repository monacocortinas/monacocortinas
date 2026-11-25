"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calculator, FileText, Settings, CheckCircle } from "lucide-react"
import Link from "next/link"

const TABLILLA_OPTIONS = [
  { id: "tablilla-1", name: "Tablilla Galvanizada 0.6", pricePerUnit: 1843 },
  { id: "tablilla-2", name: "Tablilla Galvanizada 0.7", pricePerUnit: 2483 },
  { id: "tablilla-3", name: "Tablilla Galvanizada microperforada 0.6", pricePerUnit: 2030 },
  { id: "tablilla-4", name: "Tablilla Galvanizada microperforada 0.7", pricePerUnit: 2684 },
]

const GUIDE_OPTIONS = [
  { id: "guia-ga", name: "Guía Galvanizada", pricePerMeter: 4126 },
  { id: "guia-de", name: "Guía De seguridad Galvanizada", pricePerMeter: 11500 },
]

const AXIS_PRICE_PER_METER = 13500
const MOTOR_PRICE = 210000
const ESCAPE_DOOR_PRICE = 200000
const LABOR_COST_PER_SQM = 40000
const ZOCALO_PRICE = 26000
const TRANSMISSION_MANUAL_PRICE = 100000

const TABLILLAS_PER_METER_HEIGHT = 13

export default function QuoteCalculator() {
  const [height, setHeight] = useState("")
  const [width, setWidth] = useState("")
  const [addDevelopment, setAddDevelopment] = useState(false)
  const [selectedTablillaId, setSelectedTablillaId] = useState(TABLILLA_OPTIONS[0].id)
  const [selectedGuideId, setSelectedGuideId] = useState(GUIDE_OPTIONS[0].id)
  const [customTablillaPrice, setCustomTablillaPrice] = useState<number>(0)
  const [includeMotor, setIncludeMotor] = useState(false)
  const [hasEscapeDoor, setHasEscapeDoor] = useState(false)
  const [includeTransmissionManual, setIncludeTransmissionManual] = useState(false)
  const [totalQuote, setTotalQuote] = useState(0)
  const [showBudget, setShowBudget] = useState(false)
  const [clientName, setClientName] = useState("")
  const [budgetText, setBudgetText] = useState("")

  const [calculationBreakdown, setCalculationBreakdown] = useState({
    pañoCost: 0,
    guideCost: 0,
    axisCost: 0,
    motorCost: 0,
    escapeDoorCost: 0,
    zocaloCost: 0,
    laborCost: 0,
    transmissionManualCost: 0,
    tablillaPriceAdjusted: 0,
    totalTablillasNeeded: 0,
  })

  const selectedTablilla = TABLILLA_OPTIONS.find((t) => t.id === selectedTablillaId)
  const selectedGuide = GUIDE_OPTIONS.find((g) => g.id === selectedGuideId)

  useEffect(() => {
    if (selectedTablilla) {
      setCustomTablillaPrice(selectedTablilla.pricePerUnit)
    }
  }, [selectedTablilla])

  useEffect(() => {
    const heightValue = Number.parseFloat(height) || 0
    const widthValue = Number.parseFloat(width) || 0
    const finalHeight = addDevelopment ? heightValue + 0.4 : heightValue

    const tablillaPriceAdjusted = customTablillaPrice * widthValue
    const totalTablillasNeeded = Math.ceil(TABLILLAS_PER_METER_HEIGHT * finalHeight)
    const pañoCost = totalTablillasNeeded * tablillaPriceAdjusted

    const guideCost = (selectedGuide?.pricePerMeter || 0) * finalHeight * 2

    const axisCost = AXIS_PRICE_PER_METER * widthValue

    const zocaloCost = ZOCALO_PRICE * widthValue

    const motorCost = includeMotor ? MOTOR_PRICE : 0
    const escapeDoorCost = hasEscapeDoor ? ESCAPE_DOOR_PRICE : 0
    const transmissionManualCost = includeTransmissionManual ? TRANSMISSION_MANUAL_PRICE : 0

    const squareMeters = finalHeight * widthValue
    const laborCost = squareMeters * LABOR_COST_PER_SQM

    const calculatedTotal =
      pañoCost + guideCost + axisCost + motorCost + escapeDoorCost + zocaloCost + laborCost + transmissionManualCost

    setTotalQuote(calculatedTotal)

    setCalculationBreakdown({
      pañoCost,
      guideCost,
      axisCost,
      motorCost,
      escapeDoorCost,
      zocaloCost,
      laborCost,
      transmissionManualCost,
      tablillaPriceAdjusted,
      totalTablillasNeeded,
    })
  }, [
    height,
    width,
    addDevelopment,
    selectedTablillaId,
    selectedGuideId,
    customTablillaPrice,
    includeMotor,
    hasEscapeDoor,
    includeTransmissionManual,
  ])

  const generateBudget = () => {
    const heightValue = Number.parseFloat(height) || 0
    const widthValue = Number.parseFloat(width) || 0
    const finalHeight = addDevelopment ? heightValue + 0.4 : heightValue

    const currentDate = new Date().toLocaleDateString("es-AR")
    const materials = []

    if (selectedTablilla) {
      materials.push(`- ${selectedTablilla.name}`)
    }
    if (selectedGuide) {
      materials.push(`- ${selectedGuide.name} (Par)`)
    }
    materials.push(`- Eje Reforzado`)
    materials.push(`- Tiros Reforzados`)
    materials.push(`- Zócalo Reforzado`)
    if (includeMotor) {
      materials.push(`- Motor Motic PM700 Con 3 años de garantia`)
    }
    if (hasEscapeDoor) {
      materials.push(`- Puerta de Escape`)
    }
    if (includeTransmissionManual) {
      materials.push(`- Transmisión Manual`)
    }

    const budget = `PRESUPUESTO

Cliente: ${clientName || "[Nombre del Cliente]"}
Fecha: ${currentDate}
Proyecto: Cortina Metálica ${widthValue.toFixed(2)}m (ancho) x ${finalHeight.toFixed(2)}m (alto)${addDevelopment ? " (incluye desarrollo)" : ""}

DETALLE DE MATERIALES

Materiales:
${materials.join("\n")}

Mano de Obra: Incluida

TOTAL: ${formatCurrency(totalQuote)}`

    setBudgetText(budget)
    setShowBudget(true)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Cotizador de Cortinas Metálicas",
            description: "Herramienta online para calcular presupuestos de cortinas metálicas con precios actualizados",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "ARS",
            },
            featureList: [
              "Cálculo automático de materiales",
              "Presupuesto detallado",
              "Múltiples opciones de configuración",
              "Exportación de presupuesto",
            ],
          }),
        }}
      />

      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 pt-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Inicio
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Cotizador</li>
          </ol>
        </nav>

        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Calculator className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-gray-900">
              Cotizador Profesional de Cortinas Metálicas
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculadora online gratuita para obtener presupuestos detallados e instantáneos de cortinas metálicas.
            Incluye materiales premium, instalación profesional y accesorios especializados.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">✓ Precios Actualizados 2025</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">✓ Cálculo Automático</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">✓ Presupuesto Detallado</span>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" aria-hidden="true" />
                  <CardTitle className="font-heading text-xl">Configuración del Proyecto</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  Configure las especificaciones técnicas de su cortina metálica para obtener un presupuesto preciso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="client-name" className="text-sm font-medium text-gray-700">
                    Nombre del Cliente
                  </Label>
                  <Input
                    id="client-name"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ingrese el nombre del cliente"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
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
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        aria-describedby="height-help"
                      />
                      <p id="height-help" className="text-xs text-gray-500">
                        Altura del vano en metros
                      </p>
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
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        aria-describedby="width-help"
                      />
                      <p id="width-help" className="text-xs text-gray-500">
                        Ancho del vano en metros
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                    <Checkbox
                      id="add-development"
                      checked={addDevelopment}
                      onCheckedChange={(checked) => setAddDevelopment(Boolean(checked))}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
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
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Materiales y Especificaciones
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="tablilla-select" className="text-sm font-medium text-gray-700">
                      Tipo de Tablilla (Paño de la Cortina)
                    </Label>
                    <Select value={selectedTablillaId} onValueChange={setSelectedTablillaId}>
                      <SelectTrigger
                        id="tablilla-select"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        aria-label="Seleccionar tipo de tablilla"
                      >
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

                  {selectedTablilla && (
                    <div className="space-y-2">
                      <Label htmlFor="customTablillaPrice" className="text-sm font-medium text-gray-700">
                        Precio Personalizado por Unidad de Tablilla
                      </Label>
                      <Input
                        id="customTablillaPrice"
                        type="number"
                        min="0"
                        value={customTablillaPrice || ""}
                        onChange={(e) => setCustomTablillaPrice(Number.parseFloat(e.target.value) || 0)}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Ingresa el precio personalizado"
                      />
                      <p className="text-xs text-gray-500">
                        Precio base: {formatCurrency(selectedTablilla.pricePerUnit)}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="guide-select" className="text-sm font-medium text-gray-700">
                      Sistema de Guías
                    </Label>
                    <Select value={selectedGuideId} onValueChange={setSelectedGuideId}>
                      <SelectTrigger
                        id="guide-select"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        aria-label="Seleccionar sistema de guías"
                      >
                        <SelectValue placeholder="Selecciona el tipo de guía" />
                      </SelectTrigger>
                      <SelectContent>
                        {GUIDE_OPTIONS.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{option.name}</span>
                              <span className="text-sm text-gray-500">
                                {formatCurrency(option.pricePerMeter)}/metro - Par de guías
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
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Accesorios y Automatización
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                      <Checkbox
                        id="include-motor"
                        checked={includeMotor}
                        onCheckedChange={(checked) => setIncludeMotor(Boolean(checked))}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <div className="flex-1">
                        <Label htmlFor="include-motor" className="font-medium text-gray-900 cursor-pointer">
                          Motor Motic PM700 Con 3 años de garantia
                        </Label>
                        <p className="text-sm text-gray-500">{formatCurrency(MOTOR_PRICE)} - Incluye instalación</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                      <Checkbox
                        id="escape-door"
                        checked={hasEscapeDoor}
                        onCheckedChange={(checked) => setHasEscapeDoor(Boolean(checked))}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <div className="flex-1">
                        <Label htmlFor="escape-door" className="font-medium text-gray-900 cursor-pointer">
                          Puerta de Escape Certificada
                        </Label>
                        <p className="text-sm text-gray-500">
                          {formatCurrency(ESCAPE_DOOR_PRICE)} - Cumple normativas de seguridad
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                      <Checkbox
                        id="transmission-manual"
                        checked={includeTransmissionManual}
                        onCheckedChange={(checked) => setIncludeTransmissionManual(Boolean(checked))}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <div className="flex-1">
                        <Label htmlFor="transmission-manual" className="font-medium text-gray-900 cursor-pointer">
                          Sistema de Transmisión Manual
                        </Label>
                        <p className="text-sm text-gray-500">
                          {formatCurrency(TRANSMISSION_MANUAL_PRICE)} - Operación manual reforzada
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Componentes Incluidos en el Precio Base
                  </h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex justify-between">
                      <span>• Eje Reforzado Galvanizado</span>
                      <span className="font-medium">{formatCurrency(AXIS_PRICE_PER_METER)}/metro</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Zócalo Reforzado</span>
                      <span className="font-medium">{formatCurrency(ZOCALO_PRICE)} × ancho</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Mano de Obra Especializada</span>
                      <span className="font-medium">{formatCurrency(LABOR_COST_PER_SQM)}/m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Herrajes y Accesorios</span>
                      <span className="font-medium">Incluido</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-2xl text-gray-900">Presupuesto Detallado</CardTitle>
                <CardDescription className="text-gray-600">
                  Cotización profesional con precios actualizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="text-sm text-gray-500 mb-2">Precio Total Estimado</div>
                  <div className="text-4xl font-heading font-bold text-primary count-up shimmer">
                    {formatCurrency(totalQuote)}
                  </div>
                  {Number.parseFloat(height) > 0 && Number.parseFloat(width) > 0 && (
                    <div className="text-sm text-gray-500 mt-2">
                      Cortina metálica de {Number.parseFloat(width) || 0}m (ancho) ×{" "}
                      {addDevelopment
                        ? ((Number.parseFloat(height) || 0) + 0.4).toFixed(1)
                        : Number.parseFloat(height) || 0}
                      m (alto)
                      {addDevelopment && <span className="text-primary"> (incluye desarrollo)</span>}
                    </div>
                  )}
                  <div className="mt-4 text-xs text-gray-500">* Incluye materiales, instalación y garantía</div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={generateBudget}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105"
                    aria-label="Generar presupuesto profesional detallado"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generar Presupuesto Profesional
                  </Button>
                </div>
              </CardContent>
            </Card>

            {(Number.parseFloat(height) > 0 || Number.parseFloat(width) > 0) && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Desglose de Cálculos</CardTitle>
                  <CardDescription>Detalle paso a paso de la cotización</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold text-sm text-gray-900 mb-2">1. Cálculo del Paño (Tablillas):</h5>
                      <div className="text-sm space-y-1 text-gray-600">
                        <p>• Precio por tablilla: {formatCurrency(selectedTablilla?.pricePerUnit || 0)}</p>
                        <p>
                          • Precio ajustado por tablilla: {formatCurrency(customTablillaPrice)} ×{" "}
                          {Number.parseFloat(width) || 0}m ={" "}
                          {formatCurrency(calculationBreakdown.tablillaPriceAdjusted)}
                        </p>
                        {addDevelopment && (
                          <p>
                            • Altura con desarrollo: {Number.parseFloat(height) || 0}m + 0.4m ={" "}
                            {((Number.parseFloat(height) || 0) + 0.4).toFixed(1)}m
                          </p>
                        )}
                        <p>
                          • Total tablillas necesarias: {TABLILLAS_PER_METER_HEIGHT} tablillas/m ×{" "}
                          {addDevelopment
                            ? ((Number.parseFloat(height) || 0) + 0.4).toFixed(1)
                            : Number.parseFloat(height) || 0}
                          m = {calculationBreakdown.totalTablillasNeeded} tablillas
                        </p>
                        <p className="font-medium text-gray-900">
                          • Costo del Paño: {calculationBreakdown.totalTablillasNeeded} tablillas ×{" "}
                          {formatCurrency(calculationBreakdown.tablillaPriceAdjusted)} ={" "}
                          {formatCurrency(calculationBreakdown.pañoCost)}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold text-sm text-gray-900 mb-2">2. Cálculo de Guías:</h5>
                      <div className="text-sm space-y-1 text-gray-600">
                        <p>• Precio por unidad: {formatCurrency(selectedGuide?.pricePerMeter || 0)}</p>
                        <p className="font-medium text-gray-900">
                          • Costo de Guías: {formatCurrency(selectedGuide?.pricePerMeter || 0)} ×{" "}
                          {addDevelopment
                            ? ((Number.parseFloat(height) || 0) + 0.4).toFixed(1)
                            : Number.parseFloat(height) || 0}
                          m × 2 unidades = {formatCurrency(calculationBreakdown.guideCost)}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold text-sm text-gray-900 mb-2">3. Cálculo del Eje:</h5>
                      <div className="text-sm space-y-1 text-gray-600">
                        <p className="font-medium text-gray-900">
                          • Costo del Eje: {formatCurrency(AXIS_PRICE_PER_METER)} × {Number.parseFloat(width) || 0}m ={" "}
                          {formatCurrency(calculationBreakdown.axisCost)}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold text-sm text-gray-900 mb-2">4. Cálculo del Zócalo:</h5>
                      <div className="text-sm space-y-1 text-gray-600">
                        <p className="font-medium text-gray-900">
                          • Costo del Zócalo: {formatCurrency(ZOCALO_PRICE)} × {Number.parseFloat(width) || 0}m ={" "}
                          {formatCurrency(calculationBreakdown.zocaloCost)}
                        </p>
                      </div>
                    </div>

                    {includeMotor && (
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <h5 className="font-semibold text-sm text-gray-900 mb-2">5. Motor:</h5>
                        <div className="text-sm space-y-1 text-gray-600">
                          <p className="font-medium text-gray-900">
                            • Costo del Motor: {formatCurrency(calculationBreakdown.motorCost)}
                          </p>
                        </div>
                      </div>
                    )}

                    {hasEscapeDoor && (
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <h5 className="font-semibold text-sm text-gray-900 mb-2">6. Puerta de Escape:</h5>
                        <div className="text-sm space-y-1 text-gray-600">
                          <p className="font-medium text-gray-900">
                            • Costo de Puerta de Escape: {formatCurrency(calculationBreakdown.escapeDoorCost)}
                          </p>
                        </div>
                      </div>
                    )}

                    {includeTransmissionManual && (
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <h5 className="font-semibold text-sm text-gray-900 mb-2">7. Transmisión Manual:</h5>
                        <div className="text-sm space-y-1 text-gray-600">
                          <p className="font-medium text-gray-900">
                            • Costo de Transmisión Manual: {formatCurrency(calculationBreakdown.transmissionManualCost)}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold text-sm text-gray-900 mb-2">8. Mano de Obra:</h5>
                      <div className="text-sm space-y-1 text-gray-600">
                        <p>
                          • Metros cuadrados: {Number.parseFloat(width) || 0}m ×{" "}
                          {addDevelopment
                            ? ((Number.parseFloat(height) || 0) + 0.4).toFixed(1)
                            : Number.parseFloat(height) || 0}
                          m ={" "}
                          {(
                            (Number.parseFloat(width) || 0) *
                            (addDevelopment ? (Number.parseFloat(height) || 0) + 0.4 : Number.parseFloat(height) || 0)
                          ).toFixed(2)}
                          m²
                        </p>
                        <p className="font-medium text-gray-900">
                          • Costo de Mano de Obra:{" "}
                          {(
                            (Number.parseFloat(width) || 0) *
                            (addDevelopment ? (Number.parseFloat(height) || 0) + 0.4 : Number.parseFloat(height) || 0)
                          ).toFixed(2)}
                          m² × {formatCurrency(LABOR_COST_PER_SQM)}/m² ={" "}
                          {formatCurrency(calculationBreakdown.laborCost)}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4 mt-6">
                      <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                        <h5 className="font-heading font-bold text-lg text-primary mb-3">RESUMEN TOTAL:</h5>
                        <div className="text-sm space-y-2 text-gray-700">
                          <div className="flex justify-between">
                            <span>• Paño:</span>
                            <span className="font-medium">{formatCurrency(calculationBreakdown.pañoCost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Guías:</span>
                            <span className="font-medium">{formatCurrency(calculationBreakdown.guideCost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Eje:</span>
                            <span className="font-medium">{formatCurrency(calculationBreakdown.axisCost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Zócalo:</span>
                            <span className="font-medium">{formatCurrency(calculationBreakdown.zocaloCost)}</span>
                          </div>
                          {includeMotor && (
                            <div className="flex justify-between">
                              <span>• Motor:</span>
                              <span className="font-medium">{formatCurrency(calculationBreakdown.motorCost)}</span>
                            </div>
                          )}
                          {hasEscapeDoor && (
                            <div className="flex justify-between">
                              <span>• Puerta de Escape:</span>
                              <span className="font-medium">{formatCurrency(calculationBreakdown.escapeDoorCost)}</span>
                            </div>
                          )}
                          {includeTransmissionManual && (
                            <div className="flex justify-between">
                              <span>• Transmisión Manual:</span>
                              <span className="font-medium">
                                {formatCurrency(calculationBreakdown.transmissionManualCost)}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span>• Mano de Obra:</span>
                            <span className="font-medium">{formatCurrency(calculationBreakdown.laborCost)}</span>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between">
                              <span className="font-heading font-bold text-xl text-primary">TOTAL:</span>
                              <span className="font-heading font-bold text-xl text-primary">
                                {formatCurrency(totalQuote)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {showBudget && (
          <Card className="mt-8 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="font-heading text-xl">Presupuesto Profesional</CardTitle>
              </div>
              <CardDescription>Presupuesto detallado listo para enviar al cliente</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={budgetText}
                onChange={(e) => setBudgetText(e.target.value)}
                className="min-h-[500px] font-mono text-sm bg-gray-50 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="El presupuesto aparecerá aquí..."
              />
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button
                onClick={() => navigator.clipboard.writeText(budgetText)}
                variant="outline"
                className="hover:bg-primary/5 hover:border-primary/30 transition-colors"
                aria-label="Copiar presupuesto al portapapeles"
              >
                Copiar al Portapapeles
              </Button>
              <Button
                onClick={() => setShowBudget(false)}
                variant="outline"
                className="hover:bg-gray-50 transition-colors"
                aria-label="Ocultar presupuesto"
              >
                Ocultar Presupuesto
              </Button>
            </CardFooter>
          </Card>
        )}

        <section className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Cómo Funciona Nuestro Cotizador?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ingresa las Medidas</h3>
              <p className="text-gray-600 text-sm">
                Especifica las dimensiones exactas de tu vano y selecciona los materiales deseados
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cálculo Automático</h3>
              <p className="text-gray-600 text-sm">
                Nuestro sistema calcula automáticamente materiales, mano de obra y accesorios
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Presupuesto Detallado</h3>
              <p className="text-gray-600 text-sm">Obtén un presupuesto profesional listo para enviar a tu cliente</p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ventajas de Nuestro Cotizador Online</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Precios actualizados en tiempo real
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Cálculo preciso de materiales
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Incluye mano de obra especializada
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Múltiples opciones de configuración
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Presupuesto profesional exportable
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Respaldo de +20 años de experiencia
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

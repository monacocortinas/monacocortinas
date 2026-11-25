"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calculator, FileText, Copy } from "lucide-react"

// Opciones de tablillas con precios de la hoja de cálculo
const TABLILLA_OPTIONS = [
  { id: "galv-06", name: "Tablilla Galvanizada 0.6", pricePerUnit: 1843 },
  { id: "galv-07", name: "Tablilla Galvanizada 0.7", pricePerUnit: 2483 },
  { id: "micro-06", name: "Tablilla Galvanizada microperforada 0.6", pricePerUnit: 2030 },
  { id: "micro-07", name: "Tablilla Galvanizada microperforada 0.7", pricePerUnit: 2684 },
]

const TABLILLAS_PER_METER_HEIGHT = 13

export default function CotizadorTablillas() {
  const [selectedTablillaId, setSelectedTablillaId] = useState<string>("")
  const [height, setHeight] = useState<number>(0)
  const [width, setWidth] = useState<number>(0)
  const [customPrice, setCustomPrice] = useState<number>(0)
  const [showBudget, setShowBudget] = useState(false)
  const [budgetText, setBudgetText] = useState("")

  const [calculationBreakdown, setCalculationBreakdown] = useState({
    tablillaPriceAdjusted: 0,
    totalTablillasNeeded: 0,
    pañoCost: 0,
  })

  const selectedTablilla = TABLILLA_OPTIONS.find((t) => t.id === selectedTablillaId)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  useEffect(() => {
    if (selectedTablilla) {
      setCustomPrice(selectedTablilla.pricePerUnit)
    }
  }, [selectedTablilla])

  useEffect(() => {
    if (selectedTablilla && height > 0 && width > 0 && customPrice > 0) {
      const tablillaPriceAdjusted = customPrice * width
      const totalTablillasNeeded = Math.ceil(TABLILLAS_PER_METER_HEIGHT * height)
      const pañoCost = totalTablillasNeeded * tablillaPriceAdjusted

      setCalculationBreakdown({
        tablillaPriceAdjusted,
        totalTablillasNeeded,
        pañoCost,
      })
    } else {
      setCalculationBreakdown({
        tablillaPriceAdjusted: 0,
        totalTablillasNeeded: 0,
        pañoCost: 0,
      })
    }
  }, [selectedTablilla, height, width, customPrice])

  const generateBudget = () => {
    const today = new Date()
    const formattedDate = today.toLocaleDateString("es-AR")

    const budget = `PRESUPUESTO DE TABLILLAS

Cliente: [                    ]
Fecha: ${formattedDate}
Proyecto: Paño de Tablillas ${width.toFixed(2)}m x ${height.toFixed(2)}m

DETALLE DE MATERIALES:
- ${selectedTablilla?.name || "Tablilla seleccionada"}

ESPECIFICACIONES TÉCNICAS:
- Dimensiones: ${width.toFixed(2)}m (ancho) x ${height.toFixed(2)}m (alto)
- Área total: ${(width * height).toFixed(2)}m²
- Tablillas necesarias: ${calculationBreakdown.totalTablillasNeeded} unidades
- Tablillas por metro de altura: ${TABLILLAS_PER_METER_HEIGHT}

TOTAL: ${formatCurrency(calculationBreakdown.pañoCost)}

NOTAS:
"Nuestras tablillas galvanizadas de alta calidad ofrecen durabilidad excepcional y resistencia a la corrosión. Fabricadas con los más altos estándares de calidad para garantizar una protección duradera y confiable."

Presupuesto válido por 30 días.`

    setBudgetText(budget)
    setShowBudget(true)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(budgetText)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2 font-space-grotesk px-2">
            Cotizador de Tablillas
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-dm-sans px-2">
            Calculadora especializada para paños de tablillas galvanizadas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-t-lg p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 font-space-grotesk text-base sm:text-lg">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                Configuración del Paño
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tablilla" className="text-xs sm:text-sm font-semibold text-slate-700 font-dm-sans">
                  Tipo de Tablilla
                </Label>
                <Select value={selectedTablillaId} onValueChange={setSelectedTablillaId}>
                  <SelectTrigger className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500/20 h-10 sm:h-11 text-sm">
                    <SelectValue placeholder="Selecciona el tipo de tablilla" />
                  </SelectTrigger>
                  <SelectContent>
                    {TABLILLA_OPTIONS.map((tablilla) => (
                      <SelectItem key={tablilla.id} value={tablilla.id} className="text-sm">
                        <span className="block sm:hidden">{tablilla.name.replace("Tablilla Galvanizada", "T.G.")}</span>
                        <span className="hidden sm:block">{tablilla.name}</span>
                        <span className="ml-1">- {formatCurrency(tablilla.pricePerUnit)}/unidad</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTablilla && (
                <div className="space-y-2">
                  <Label htmlFor="customPrice" className="text-xs sm:text-sm font-semibold text-slate-700 font-dm-sans">
                    Precio Personalizado por Unidad
                  </Label>
                  <Input
                    id="customPrice"
                    type="number"
                    min="0"
                    value={customPrice || ""}
                    onChange={(e) => setCustomPrice(Number.parseFloat(e.target.value) || 0)}
                    className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500/20 h-10 sm:h-11 text-sm"
                    placeholder="Ingresa el precio personalizado"
                  />
                  <p className="text-xs text-slate-500 font-dm-sans">
                    Precio base: {formatCurrency(selectedTablilla.pricePerUnit)}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-xs sm:text-sm font-semibold text-slate-700 font-dm-sans">
                    Altura (metros)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.01"
                    min="0"
                    value={height || ""}
                    onChange={(e) => setHeight(Number.parseFloat(e.target.value) || 0)}
                    className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500/20 h-10 sm:h-11 text-sm"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width" className="text-xs sm:text-sm font-semibold text-slate-700 font-dm-sans">
                    Ancho (metros)
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.01"
                    min="0"
                    value={width || ""}
                    onChange={(e) => setWidth(Number.parseFloat(e.target.value) || 0)}
                    className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500/20 h-10 sm:h-11 text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 font-space-grotesk text-base sm:text-lg">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                Resultado de la Cotización
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {calculationBreakdown.pañoCost > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-slate-50 rounded-lg p-3 sm:p-4 space-y-3">
                    <h3 className="font-semibold text-slate-800 font-space-grotesk text-sm sm:text-base">
                      Desglose de Cálculos
                    </h3>
                    <div className="space-y-2 text-xs sm:text-sm font-dm-sans">
                      <div className="flex justify-between items-start">
                        <span className="flex-1 pr-2">Precio base por tablilla:</span>
                        <span className="font-mono text-right">{formatCurrency(customPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ancho:</span>
                        <span className="font-mono">{width.toFixed(2)}m</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="flex-1 pr-2">Precio ajustado por tablilla:</span>
                        <span className="font-mono text-right">
                          {formatCurrency(calculationBreakdown.tablillaPriceAdjusted)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 break-all">
                        ({formatCurrency(customPrice)} × {width.toFixed(2)}m)
                      </div>

                      <div className="flex justify-between mt-3">
                        <span>Altura:</span>
                        <span className="font-mono">{height.toFixed(2)}m</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tablillas por metro:</span>
                        <span className="font-mono">{TABLILLAS_PER_METER_HEIGHT}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="flex-1 pr-2">Total tablillas necesarias:</span>
                        <span className="font-mono text-right">{calculationBreakdown.totalTablillasNeeded}</span>
                      </div>
                      <div className="text-xs text-slate-600 break-all">
                        (⌈{TABLILLAS_PER_METER_HEIGHT} × {height.toFixed(2)}m⌉ = ⌈
                        {(TABLILLAS_PER_METER_HEIGHT * height).toFixed(1)}⌉)
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg p-3 sm:p-4 border border-cyan-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="text-base sm:text-lg font-semibold text-slate-800 font-space-grotesk">
                        TOTAL PAÑO:
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-cyan-700 font-mono">
                        {formatCurrency(calculationBreakdown.pañoCost)}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1 font-dm-sans break-all">
                      ({calculationBreakdown.totalTablillasNeeded} tablillas ×{" "}
                      {formatCurrency(calculationBreakdown.tablillaPriceAdjusted)})
                    </div>
                  </div>

                  <Button
                    onClick={generateBudget}
                    className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold py-2 sm:py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl font-dm-sans text-sm sm:text-base h-10 sm:h-auto"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Generar Presupuesto
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8 text-slate-500 font-dm-sans">
                  <Calculator className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm sm:text-base px-4">Completa todos los campos para ver la cotización</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {showBudget && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-hidden shadow-2xl mx-2 sm:mx-0">
              <CardHeader className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-4 sm:p-6">
                <CardTitle className="flex items-center justify-between font-space-grotesk text-base sm:text-lg">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    Presupuesto Generado
                  </span>
                  <div className="flex gap-1 sm:gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      className="text-white hover:bg-white/20 h-8 w-8 sm:h-9 sm:w-9 p-0"
                    >
                      <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBudget(false)}
                      className="text-white hover:bg-white/20 h-8 w-8 sm:h-9 sm:w-9 p-0"
                    >
                      ✕
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 overflow-y-auto">
                <Textarea
                  value={budgetText}
                  onChange={(e) => setBudgetText(e.target.value)}
                  className="w-full h-72 sm:h-96 font-mono text-xs sm:text-sm border-slate-300 focus:border-cyan-500 focus:ring-cyan-500/20"
                  placeholder="El presupuesto aparecerá aquí..."
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

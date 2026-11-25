"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Package, FileText } from "lucide-react"
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
const ZOCALO_PRICE = 26000
const TRANSMISSION_MANUAL_PRICE = 100000
const TABLILLAS_PER_METER_HEIGHT = 13

interface Cortina {
  id: string
  height: string
  width: string
  addDevelopment: boolean
  selectedTablillaId: string
  customTablillaPrice: number
  selectedGuideId: string
  includeMotor: boolean
  hasEscapeDoor: boolean
  includeTransmissionManual: boolean
  name: string
}

export default function RecuentoMateriales() {
  const [cortinas, setCortinas] = useState<Cortina[]>([
    {
      id: "1",
      height: "",
      width: "",
      addDevelopment: false,
      selectedTablillaId: TABLILLA_OPTIONS[0].id,
      customTablillaPrice: TABLILLA_OPTIONS[0].pricePerUnit,
      selectedGuideId: GUIDE_OPTIONS[0].id,
      includeMotor: false,
      hasEscapeDoor: false,
      includeTransmissionManual: false,
      name: "Cortina 1",
    },
  ])

  const [totales, setTotales] = useState({
    totalMateriales: 0,
    totalGeneral: 0,
    desglosePorTipo: {} as Record<string, { cantidad: number; precio: number }>,
  })

  const agregarCortina = () => {
    const nuevaCortina: Cortina = {
      id: Date.now().toString(),
      height: "",
      width: "",
      addDevelopment: false,
      selectedTablillaId: TABLILLA_OPTIONS[0].id,
      customTablillaPrice: TABLILLA_OPTIONS[0].pricePerUnit,
      selectedGuideId: GUIDE_OPTIONS[0].id,
      includeMotor: false,
      hasEscapeDoor: false,
      includeTransmissionManual: false,
      name: `Cortina ${cortinas.length + 1}`,
    }
    setCortinas([...cortinas, nuevaCortina])
  }

  const eliminarCortina = (id: string) => {
    if (cortinas.length > 1) {
      setCortinas(cortinas.filter((c) => c.id !== id))
    }
  }

  const actualizarCortina = (id: string, campo: keyof Cortina, valor: any) => {
    setCortinas(
      cortinas.map((c) => {
        if (c.id === id) {
          const updated = { ...c, [campo]: valor }
          // Si cambia el tipo de tablilla, actualizar el precio personalizado
          if (campo === "selectedTablillaId") {
            const tablilla = TABLILLA_OPTIONS.find((t) => t.id === valor)
            if (tablilla) {
              updated.customTablillaPrice = tablilla.pricePerUnit
            }
          }
          return updated
        }
        return c
      }),
    )
  }

  useEffect(() => {
    const desglose: Record<string, { cantidad: number; precio: number }> = {}
    let totalMateriales = 0

    cortinas.forEach((cortina) => {
      const heightValue = Number.parseFloat(cortina.height) || 0
      const widthValue = Number.parseFloat(cortina.width) || 0
      const finalHeight = cortina.addDevelopment ? heightValue + 0.4 : heightValue

      if (heightValue === 0 || widthValue === 0) return

      // Tablillas
      const tablilla = TABLILLA_OPTIONS.find((t) => t.id === cortina.selectedTablillaId)
      if (tablilla) {
        const tablillaPriceAdjusted = cortina.customTablillaPrice * widthValue
        const totalTablillasNeeded = Math.ceil(TABLILLAS_PER_METER_HEIGHT * finalHeight)
        const pañoCost = totalTablillasNeeded * tablillaPriceAdjusted

        const key = `${tablilla.name} (${widthValue}m)`
        if (!desglose[key]) {
          desglose[key] = { cantidad: 0, precio: 0 }
        }
        desglose[key].cantidad += totalTablillasNeeded
        desglose[key].precio += pañoCost
        totalMateriales += pañoCost
      }

      // Guías
      const guia = GUIDE_OPTIONS.find((g) => g.id === cortina.selectedGuideId)
      if (guia) {
        const guideCost = guia.pricePerMeter * finalHeight * 2
        const key = `${guia.name} (Par)`
        if (!desglose[key]) {
          desglose[key] = { cantidad: 0, precio: 0 }
        }
        desglose[key].cantidad += finalHeight * 2
        desglose[key].precio += guideCost
        totalMateriales += guideCost
      }

      // Eje
      const axisCost = AXIS_PRICE_PER_METER * widthValue
      const keyEje = "Eje Reforzado Galvanizado"
      if (!desglose[keyEje]) {
        desglose[keyEje] = { cantidad: 0, precio: 0 }
      }
      desglose[keyEje].cantidad += widthValue
      desglose[keyEje].precio += axisCost
      totalMateriales += axisCost

      // Zócalo
      const zocaloCost = ZOCALO_PRICE * widthValue
      const keyZocalo = "Zócalo Reforzado"
      if (!desglose[keyZocalo]) {
        desglose[keyZocalo] = { cantidad: 0, precio: 0 }
      }
      desglose[keyZocalo].cantidad += widthValue
      desglose[keyZocalo].precio += zocaloCost
      totalMateriales += zocaloCost

      // Motor
      if (cortina.includeMotor) {
        const keyMotor = "Motor PM700"
        if (!desglose[keyMotor]) {
          desglose[keyMotor] = { cantidad: 0, precio: 0 }
        }
        desglose[keyMotor].cantidad += 1
        desglose[keyMotor].precio += MOTOR_PRICE
        totalMateriales += MOTOR_PRICE
      }

      // Puerta de Escape
      if (cortina.hasEscapeDoor) {
        const keyEscape = "Puerta de Escape"
        if (!desglose[keyEscape]) {
          desglose[keyEscape] = { cantidad: 0, precio: 0 }
        }
        desglose[keyEscape].cantidad += 1
        desglose[keyEscape].precio += ESCAPE_DOOR_PRICE
        totalMateriales += ESCAPE_DOOR_PRICE
      }

      // Transmisión Manual
      if (cortina.includeTransmissionManual) {
        const keyTransmission = "Transmisión Manual"
        if (!desglose[keyTransmission]) {
          desglose[keyTransmission] = { cantidad: 0, precio: 0 }
        }
        desglose[keyTransmission].cantidad += 1
        desglose[keyTransmission].precio += TRANSMISSION_MANUAL_PRICE
        totalMateriales += TRANSMISSION_MANUAL_PRICE
      }
    })

    setTotales({
      totalMateriales,
      totalGeneral: totalMateriales,
      desglosePorTipo: desglose,
    })
  }, [cortinas])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const generarReporte = () => {
    let reporte = "RECUENTO DE MATERIALES - SIN MANO DE OBRA\n"
    reporte += "=".repeat(60) + "\n\n"
    reporte += `Fecha: ${new Date().toLocaleDateString("es-AR")}\n`
    reporte += `Total de Cortinas: ${cortinas.filter((c) => Number.parseFloat(c.height) > 0 && Number.parseFloat(c.width) > 0).length}\n\n`

    cortinas.forEach((cortina, index) => {
      const heightValue = Number.parseFloat(cortina.height) || 0
      const widthValue = Number.parseFloat(cortina.width) || 0
      if (heightValue === 0 || widthValue === 0) return

      const finalHeight = cortina.addDevelopment ? heightValue + 0.4 : heightValue
      reporte += `${cortina.name}:\n`
      reporte += `  Medidas: ${widthValue}m (ancho) × ${finalHeight.toFixed(2)}m (alto)\n`
      if (cortina.addDevelopment) reporte += `  (Incluye desarrollo de 0.4m)\n`
      if (cortina.hasEscapeDoor) reporte += `  ✓ Con puerta de escape\n`
      reporte += "\n"
    })

    reporte += "\nDESGLOSE DE MATERIALES:\n"
    reporte += "-".repeat(60) + "\n"

    Object.entries(totales.desglosePorTipo).forEach(([material, datos]) => {
      reporte += `${material}\n`
      reporte += `  Cantidad: ${datos.cantidad.toFixed(2)} unidades/metros\n`
      reporte += `  Subtotal: ${formatCurrency(datos.precio)}\n\n`
    })

    reporte += "=".repeat(60) + "\n"
    reporte += `TOTAL MATERIALES: ${formatCurrency(totales.totalMateriales)}\n`
    reporte += "=".repeat(60) + "\n"
    reporte += "\n* Este presupuesto NO incluye mano de obra\n"

    return reporte
  }

  const copiarReporte = () => {
    const reporte = generarReporte()
    navigator.clipboard.writeText(reporte)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 pt-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Inicio
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Recuento de Materiales</li>
          </ol>
        </nav>

        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Package className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-gray-900">Recuento de Materiales</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calcula los materiales necesarios para múltiples cortinas metálicas sin incluir mano de obra
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {cortinas.map((cortina, index) => (
              <Card key={cortina.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="font-heading text-lg">{cortina.name}</CardTitle>
                    </div>
                    {cortinas.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => eliminarCortina(cortina.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <CardDescription>Configure las especificaciones de esta cortina</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`height-${cortina.id}`}>Altura (metros)</Label>
                      <Input
                        id={`height-${cortina.id}`}
                        type="number"
                        value={cortina.height}
                        onChange={(e) => actualizarCortina(cortina.id, "height", e.target.value)}
                        min="0"
                        step="0.1"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`width-${cortina.id}`}>Ancho (metros)</Label>
                      <Input
                        id={`width-${cortina.id}`}
                        type="number"
                        value={cortina.width}
                        onChange={(e) => actualizarCortina(cortina.id, "width", e.target.value)}
                        min="0"
                        step="0.1"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                    <Checkbox
                      id={`development-${cortina.id}`}
                      checked={cortina.addDevelopment}
                      onCheckedChange={(checked) => actualizarCortina(cortina.id, "addDevelopment", Boolean(checked))}
                    />
                    <Label htmlFor={`development-${cortina.id}`} className="cursor-pointer">
                      Agregar Desarrollo (+0.4m)
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`tablilla-${cortina.id}`}>Tipo de Tablilla</Label>
                    <Select
                      value={cortina.selectedTablillaId}
                      onValueChange={(value) => actualizarCortina(cortina.id, "selectedTablillaId", value)}
                    >
                      <SelectTrigger id={`tablilla-${cortina.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TABLILLA_OPTIONS.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name} - {formatCurrency(option.pricePerUnit)}/u
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`custom-price-${cortina.id}`}>Precio Personalizado por Unidad</Label>
                    <Input
                      id={`custom-price-${cortina.id}`}
                      type="number"
                      value={cortina.customTablillaPrice || ""}
                      onChange={(e) =>
                        actualizarCortina(cortina.id, "customTablillaPrice", Number.parseFloat(e.target.value) || 0)
                      }
                      min="0"
                      placeholder="Precio personalizado"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`guide-${cortina.id}`}>Sistema de Guías</Label>
                    <Select
                      value={cortina.selectedGuideId}
                      onValueChange={(value) => actualizarCortina(cortina.id, "selectedGuideId", value)}
                    >
                      <SelectTrigger id={`guide-${cortina.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {GUIDE_OPTIONS.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name} - {formatCurrency(option.pricePerMeter)}/m
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                      <Checkbox
                        id={`motor-${cortina.id}`}
                        checked={cortina.includeMotor}
                        onCheckedChange={(checked) => actualizarCortina(cortina.id, "includeMotor", Boolean(checked))}
                      />
                      <Label htmlFor={`motor-${cortina.id}`} className="cursor-pointer">
                        Motor ({formatCurrency(MOTOR_PRICE)})
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                      <Checkbox
                        id={`escape-${cortina.id}`}
                        checked={cortina.hasEscapeDoor}
                        onCheckedChange={(checked) => actualizarCortina(cortina.id, "hasEscapeDoor", Boolean(checked))}
                      />
                      <Label htmlFor={`escape-${cortina.id}`} className="cursor-pointer">
                        Puerta de Escape ({formatCurrency(ESCAPE_DOOR_PRICE)})
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                      <Checkbox
                        id={`transmission-${cortina.id}`}
                        checked={cortina.includeTransmissionManual}
                        onCheckedChange={(checked) =>
                          actualizarCortina(cortina.id, "includeTransmissionManual", Boolean(checked))
                        }
                      />
                      <Label htmlFor={`transmission-${cortina.id}`} className="cursor-pointer">
                        Transmisión Manual ({formatCurrency(TRANSMISSION_MANUAL_PRICE)})
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button onClick={agregarCortina} className="w-full bg-transparent" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Otra Cortina
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-primary/5 to-accent/5 sticky top-4">
              <CardHeader>
                <CardTitle className="font-heading text-xl">Resumen Total</CardTitle>
                <CardDescription>Materiales sin mano de obra</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-sm text-gray-500 mb-2">Total Materiales</div>
                  <div className="text-3xl font-heading font-bold text-primary">
                    {formatCurrency(totales.totalMateriales)}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-sm text-gray-900 mb-3">Desglose por Material:</h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {Object.entries(totales.desglosePorTipo).map(([material, datos]) => (
                      <div key={material} className="p-3 bg-white rounded-lg border border-gray-100">
                        <div className="font-medium text-sm text-gray-900">{material}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Cantidad: {datos.cantidad.toFixed(2)} {material.includes("Tablilla") ? "unidades" : "metros"}
                        </div>
                        <div className="text-sm font-semibold text-primary mt-1">{formatCurrency(datos.precio)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={copiarReporte} className="w-full" size="lg">
                  <FileText className="h-4 w-4 mr-2" />
                  Copiar Reporte Completo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

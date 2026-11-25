export function DebugInfo() {
  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded text-xs z-50">
      <p>Debug: Servidor funcionando correctamente</p>
      <p>Puerto: {process.env.PORT || 3000}</p>
    </div>
  )
}

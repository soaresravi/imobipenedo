import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Modal({ aberto, onFechar, titulo, children, largura = 'max-w-lg' }) {
  useEffect(() => {
    if (!aberto) return
    const onEsc = (e) => e.key === 'Escape' && onFechar()
    document.addEventListener('keydown', onEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [aberto, onFechar])

  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
        onClick={onFechar}
      />
      <div
        className={`relative w-full ${largura} max-h-[92vh] overflow-y-auto rounded-t-2xl bg-white shadow-modal animate-slide-up sm:rounded-2xl`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-3 backdrop-blur">
          <h2 className="text-base font-bold text-slate-900">{titulo}</h2>
          <button onClick={onFechar} className="btn-ghost !px-2" aria-label="Fechar">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
import { ShieldCheck, MapPin } from 'lucide-react'

export default function BarraTitulo({ total }) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Imóveis em Penedo, AL
            </h1>
            <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-3.5 w-3.5" />
              {total} {total === 1 ? 'anúncio disponível' : 'anúncios disponíveis'} · Atualizado agora
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <ShieldCheck className="h-4 w-4" />
            Anúncios verificados por CRECI / matrícula
          </div>
        </div>
      </div>
    </div>
  )
}
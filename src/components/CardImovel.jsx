import { MapPin, Bed, Bath, Maximize2, ShieldCheck, AlertTriangle, Eye, Flag } from 'lucide-react'

export function formatarPreco(imovel) {
  const valor = imovel.preco.toLocaleString('pt-BR')
  return imovel.finalidade === 'Aluguel' ? `R$ ${valor}/mês` : `R$ ${valor}`
}

export default function CardImovel({ imovel, onVerDetalhes, onDenunciar }) {
  const emAnalise = imovel.status === 'em_analise'
  return (
    <article
      className={`group relative overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-card-hover ${
        emAnalise ? 'opacity-80' : ''
      }`}
    >
      {/* Foto */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={imovel.imagem}
          alt={imovel.titulo}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop'
          }}
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          <span className="badge bg-white/95 text-slate-800 ring-1 ring-slate-200 backdrop-blur">
            {imovel.finalidade} · {imovel.tipo}
          </span>
          {imovel.historicoPreco && (
            <span className="badge bg-white/95 text-slate-700 ring-1 ring-slate-200 backdrop-blur">
              {imovel.historicoPreco}
            </span>
          )}
        </div>

        {emAnalise && (
          <div className="absolute inset-0 flex items-center justify-center bg-amber-500/15 backdrop-blur-[1px]">
            <div className="flex items-center gap-2 rounded-lg bg-amber-600 px-3 py-2 text-xs font-bold text-white shadow-lg">
              <AlertTriangle className="h-4 w-4" />
              Em análise de segurança
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-lg font-extrabold text-slate-900">{formatarPreco(imovel)}</p>
        <h3 className="mt-0.5 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-slate-700">
          {imovel.titulo}
        </h3>
        <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="h-3 w-3" />
          {imovel.bairro} · {imovel.endereco}
        </p>

        <div className="mt-3 flex items-center gap-3 text-xs text-slate-600">
          {imovel.quartos > 0 && (
            <span className="inline-flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" /> {imovel.quartos}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" /> {imovel.banheiros}
          </span>
          <span className="inline-flex items-center gap-1">
            <Maximize2 className="h-3.5 w-3.5" /> {imovel.area} m²
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-700">{imovel.anunciante}</p>
            {imovel.verificado ? (
              <span className="badge-verified mt-1 !text-[10px]">
                <ShieldCheck className="h-3 w-3" />
                Verificado · {imovel.creci}
              </span>
            ) : (
              <span className="badge-review mt-1 !text-[10px]">
                <AlertTriangle className="h-3 w-3" />
                Não verificado
              </span>
            )}
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onVerDetalhes(imovel)}
            className="btn-primary flex-1 !py-2 !text-xs"
          >
            <Eye className="h-3.5 w-3.5" />
            Ver detalhes
          </button>
          <button
            onClick={() => onDenunciar(imovel)}
            className="btn-ghost !px-2.5 !py-2"
            title="Denunciar anúncio suspeito"
          >
            <Flag className="h-4 w-4 text-amber-600" />
          </button>
        </div>
      </div>
    </article>
  )
}
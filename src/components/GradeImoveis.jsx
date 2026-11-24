import CardImovel from './CardImovel'
import { SearchX } from 'lucide-react'

export default function GradeImoveis({ imoveis, onVerDetalhes, onDenunciar, onLimparFiltros }) {
  if (imoveis.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
        <SearchX className="mx-auto h-10 w-10 text-slate-300" />
        <h3 className="mt-3 text-base font-semibold text-slate-800">
          Nenhum imóvel encontrado
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Tente ajustar os filtros ou buscar por outro bairro.
        </p>
        <button onClick={onLimparFiltros} className="btn-secondary mt-4">
          Limpar filtros
        </button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {imoveis.map((im) => (
        <CardImovel
          key={im.id}
          imovel={im}
          onVerDetalhes={onVerDetalhes}
          onDenunciar={onDenunciar}
        />
      ))}
    </div>
  )
}
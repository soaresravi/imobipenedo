import { X } from 'lucide-react'
import { BAIRROS, TIPOS, FINALIDADES } from '../data/imoveis'

export default function Filtros({
  filtros,
  setFiltros,
  onLimpar,
  abertoMobile,
  fecharMobile,
}) {
  const atualizar = (campo, valor) => {
    setFiltros((f) => ({ ...f, [campo]: valor }))
  }

  const conteudo = (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">Filtros</h3>
        <button
          onClick={onLimpar}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700"
        >
          Limpar
        </button>
      </div>

      {/* Finalidade */}
      <div>
        <p className="label">Finalidade</p>
        <div className="grid grid-cols-3 gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
          {['Todos', ...FINALIDADES].map((f) => (
            <button
              key={f}
              onClick={() => atualizar('finalidade', f)}
              className={`rounded-md px-2 py-1.5 text-xs font-semibold transition ${
                filtros.finalidade === f
                  ? 'bg-white text-brand-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tipo */}
      <div>
        <p className="label">Tipo de imóvel</p>
        <div className="space-y-1">
          {['Todos', ...TIPOS].map((t) => (
            <label
              key={t}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              <input
                type="radio"
                name="tipo"
                checked={filtros.tipo === t}
                onChange={() => atualizar('tipo', t)}
                className="h-3.5 w-3.5 text-brand-600 focus:ring-brand-500"
              />
              {t}
            </label>
          ))}
        </div>
      </div>

      {/* Bairro */}
      <div>
        <p className="label">Bairro</p>
        <select
          value={filtros.bairro}
          onChange={(e) => atualizar('bairro', e.target.value)}
          className="input"
        >
          <option value="Todos">Todos os bairros</option>
          {BAIRROS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Faixa de preço */}
      <div>
        <p className="label">Preço máximo</p>
        <input
          type="range"
          min={500}
          max={500000}
          step={500}
          value={filtros.precoMax}
          onChange={(e) => atualizar('precoMax', Number(e.target.value))}
          className="w-full accent-brand-600"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-500">
          <span>R$ 500</span>
          <span className="font-semibold text-brand-700">
            {filtros.precoMax >= 500000
              ? 'Sem limite'
              : `R$ ${filtros.precoMax.toLocaleString('pt-BR')}`}
          </span>
        </div>
      </div>

      {/* Quartos */}
      <div>
        <p className="label">Quartos (mínimo)</p>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => atualizar('quartosMin', n)}
              className={`flex-1 rounded-md border px-2 py-1.5 text-xs font-semibold transition ${
                filtros.quartosMin === n
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {n === 0 ? 'Todos' : `${n}+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-4">
          {conteudo}
        </div>
      </aside>

      {/* Mobile drawer */}
      {abertoMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 animate-fade-in"
            onClick={fecharMobile}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto bg-white p-5 shadow-2xl animate-slide-up">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Filtros</h2>
              <button onClick={fecharMobile} className="btn-ghost !px-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            {conteudo}
            <button onClick={fecharMobile} className="btn-primary mt-5 w-full">
              Ver resultados
            </button>
          </div>
        </div>
      )}
    </>
  )
}
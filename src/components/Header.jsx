import { Search, MapPin, User, Building2, Menu, X, Heart, MessageCircle, PlusCircle } from 'lucide-react'
import { useState } from 'react'

export default function Header({ perfil, setPerfil, onAnunciar, busca, setBusca, onBuscar }) {
  const [menuAberto, setMenuAberto] = useState(false)

  const trocarPerfil = (novo) => {
    setPerfil(novo)
    setMenuAberto(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      {/* Barra superior fina */}
      <div className="hidden border-b border-slate-100 bg-slate-50 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Penedo, AL
          </span>
          <div className="flex items-center gap-4">
            <button className="hover:text-brand-600">Ajuda</button>
            <button className="hover:text-brand-600">Segurança</button>
            <span className="text-slate-300">|</span>
            <button className="font-semibold text-brand-600 hover:text-brand-700">
              Anuncie grátis
            </button>
          </div>
        </div>
      </div>

      {/* Barra principal */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        {/* Logo + nome — container com altura fixa */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex shrink-0 items-center gap-2"
          aria-label="ImobiPenedo - início"
        >
          <div className="flex h-14 items-center">
          <img 
  src="/logo.svg" 
  alt="ImobiPenedo" 
  className="h-28 w-auto object-contain scale-125 origin-left -ml-7" 
/>
</div>
<span className="hidden text-2xl font-extrabold leading-none tracking-tight text-slate-900 sm:inline -ml-7">
  Imobi<span className="text-brand-600">Penedo</span>
</span>
</button>


        {/* Campo de busca */}
        <form
          onSubmit={(e) => { e.preventDefault(); onBuscar?.() }}
          className="flex flex-1 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100"
        >
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Busque por bairro, rua ou palavra-chave..."
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
        </form>

        {/* Ações desktop */}
        <div className="hidden items-center gap-1 md:flex">
          <div className="mr-2 flex items-center rounded-md border border-slate-200 bg-slate-50 p-0.5 text-xs">
            <button
              onClick={() => trocarPerfil('cliente')}
              className={`flex items-center gap-1 rounded px-2.5 py-1.5 font-semibold transition ${
                perfil === 'cliente'
                  ? 'bg-white text-brand-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              Cliente
            </button>
            <button
              onClick={() => trocarPerfil('anunciante')}
              className={`flex items-center gap-1 rounded px-2.5 py-1.5 font-semibold transition ${
                perfil === 'anunciante'
                  ? 'bg-white text-brand-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              Anunciante
            </button>
          </div>

          <button className="btn-ghost flex-col !gap-0 !px-2 !py-1 text-[10px] font-medium text-slate-600">
            <Heart className="h-4 w-4" />
            Favoritos
          </button>
          <button className="btn-ghost flex-col !gap-0 !px-2 !py-1 text-[10px] font-medium text-slate-600">
            <MessageCircle className="h-4 w-4" />
            Chat
          </button>
          <button
            onClick={onAnunciar}
            disabled={perfil !== 'anunciante'}
            className="btn-primary ml-1"
            title={perfil !== 'anunciante' ? 'Alterne para o perfil Anunciante' : ''}
          >
            <PlusCircle className="h-4 w-4" />
            Anunciar
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="btn-ghost md:hidden !px-2"
          onClick={() => setMenuAberto((v) => !v)}
          aria-label="Menu"
        >
          {menuAberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuAberto && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden animate-fade-in">
          <div className="mb-3 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => trocarPerfil('cliente')}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold ${
                perfil === 'cliente' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              Cliente
            </button>
            <button
              onClick={() => trocarPerfil('anunciante')}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold ${
                perfil === 'anunciante' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              Anunciante
            </button>
          </div>
          <button
            onClick={() => { onAnunciar(); setMenuAberto(false) }}
            disabled={perfil !== 'anunciante'}
            className="btn-primary w-full"
          >
            <PlusCircle className="h-4 w-4" />
            Anunciar Imóvel
          </button>
        </div>
      )}
    </header>
  )
}
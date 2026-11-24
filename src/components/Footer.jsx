import { ShieldCheck, RotateCcw } from 'lucide-react'

export default function Footer({ onReset }) {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-1">
            <img 
  src="/logo.svg" 
  alt="ImobiPenedo" 
  className="h-24 w-auto object-contain scale-125 origin-left -ml-10 mr-2" 
/>
<span className="text-lg font-extrabold text-slate-900">
  Imobi<span className="text-brand-600">Penedo</span>
</span>

            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Plataforma de gestão e intermediação imobiliária de Penedo-AL.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-700">Plataforma</h4>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-500">
              <li><a href="#" className="hover:text-brand-600">Explorar imóveis</a></li>
              <li><a href="#" className="hover:text-brand-600">Anunciar imóvel</a></li>
              <li><a href="#" className="hover:text-brand-600">Como funciona</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-700">Segurança</h4>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-500">
              <li><a href="#" className="hover:text-brand-600">Verificação CRECI</a></li>
              <li><a href="#" className="hover:text-brand-600">Denunciar anúncio</a></li>
              <li><a href="#" className="hover:text-brand-600">Central de ajuda</a></li>
            </ul>
          </div>
          <div>
  <h4 className="text-xs font-bold uppercase tracking-wide text-slate-700">Atendimento</h4>
  <ul className="mt-3 space-y-1.5 text-sm text-slate-500">
    <li><a href="#" className="hover:text-brand-600">Fale conosco</a></li>
    <li><a href="#" className="hover:text-brand-600">Termos de uso</a></li>
    <li><a href="#" className="hover:text-brand-600">Política de privacidade</a></li>
  </ul>
</div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-1.5">
  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
  © {new Date().getFullYear()} ImobiPenedo · Penedo, AL · Todos os direitos reservados
</span>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1 font-medium hover:bg-slate-50 hover:text-slate-800"
            title="Restaura os 6 imóveis originais e apaga cadastros/denúncias locais"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Resetar demo
          </button>
        </div>
      </div>
    </footer>
  )
}
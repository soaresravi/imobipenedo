import { MapPin, Bed, Bath, Maximize2, ShieldCheck, AlertTriangle, MessageCircle, Flag, Phone, Clock } from 'lucide-react'
import Modal from './Modal'
import { formatarPreco } from './CardImovel'

export default function ModalDetalhes({ imovel, aberto, onFechar, onDenunciar, onContatoSeguro }) {
  if (!imovel) return null
  const emAnalise = imovel.status === 'em_analise'

  return (
    <Modal aberto={aberto} onFechar={onFechar} titulo="Detalhes do imóvel" largura="max-w-3xl">
      <div className="overflow-hidden rounded-xl">
        <img
          src={imovel.imagem}
          alt={imovel.titulo}
          className="h-64 w-full object-cover sm:h-80"
        />
      </div>

      {emAnalise && (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">Este anúncio está em análise de segurança.</p>
            <p className="text-xs">
              Recebemos uma denúncia e a equipe está verificando. Evite qualquer pagamento até a
              conclusão da análise.
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="badge-brand">
            {imovel.finalidade} · {imovel.tipo}
          </span>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{imovel.titulo}</h3>
          <p className="mt-1 inline-flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5" />
            {imovel.bairro} · {imovel.endereco}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold text-brand-700">{formatarPreco(imovel)}</p>
          {imovel.historicoPreco && (
            <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              {imovel.historicoPreco}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-slate-50 p-3 text-center">
        {imovel.quartos > 0 && (
          <div>
            <Bed className="mx-auto h-5 w-5 text-slate-400" />
            <p className="mt-1 text-sm font-semibold text-slate-800">{imovel.quartos}</p>
            <p className="text-xs text-slate-500">Quartos</p>
          </div>
        )}
        <div>
          <Bath className="mx-auto h-5 w-5 text-slate-400" />
          <p className="mt-1 text-sm font-semibold text-slate-800">{imovel.banheiros}</p>
          <p className="text-xs text-slate-500">Banheiros</p>
        </div>
        <div>
          <Maximize2 className="mx-auto h-5 w-5 text-slate-400" />
          <p className="mt-1 text-sm font-semibold text-slate-800">{imovel.area} m²</p>
          <p className="text-xs text-slate-500">Área</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-bold text-slate-900">Sobre o imóvel</h4>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{imovel.descricao}</p>
      </div>

      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-emerald-900">Anunciante verificado</p>
            <p className="text-sm text-emerald-800">{imovel.anunciante}</p>
            <p className="text-xs text-emerald-700">{imovel.creci}</p>
            <p className="mt-1 text-xs text-emerald-700">
              Documentação (CRECI / matrícula) conferida pela equipe ImobiPenedo.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
        <p className="font-semibold">⚠️ Alerta anti-golpe</p>
        <p className="mt-0.5">
          Nunca faça depósito de sinal antecipado sem antes visitar o imóvel pessoalmente e
          conferir a documentação com o(a) corretor(a). A ImobiPenedo não solicita pagamentos
          pelo chat.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button onClick={() => onContatoSeguro(imovel)} className="btn-primary flex-1">
          <MessageCircle className="h-4 w-4" />
          Entrar em Contato Seguro
        </button>
        <button onClick={() => onDenunciar(imovel)} className="btn-danger-ghost">
          <Flag className="h-4 w-4" />
          Denunciar Anúncio Suspeito
        </button>
      </div>
    </Modal>
  )
}
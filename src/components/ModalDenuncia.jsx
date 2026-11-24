import { useState } from 'react'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import Modal from './Modal'

const MOTIVOS = [
  'Pedido de sinal antecipado',
  'Fotos falsas ou de outro imóvel',
  'Preço irreal / abaixo do mercado',
  'Imóvel inexistente',
  'Outro motivo',
]

export default function ModalDenuncia({ imovel, aberto, onFechar, onConfirmar }) {
  const [motivo, setMotivo] = useState('')
  const [detalhe, setDetalhe] = useState('')
  const [enviado, setEnviado] = useState(false)

  if (!imovel) return null

  const confirmar = () => {
    if (!motivo) return
    onConfirmar({ imovel, motivo, detalhe })
    setEnviado(true)
  }

  const fechar = () => {
    setMotivo('')
    setDetalhe('')
    setEnviado(false)
    onFechar()
  }

  return (
    <Modal aberto={aberto} onFechar={fechar} titulo="Denunciar anúncio suspeito">
      {enviado ? (
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
          <h3 className="mt-3 text-lg font-bold text-slate-900">Denúncia registrada!</h3>
          <p className="mt-1 text-sm text-slate-600">
            O anúncio foi marcado como <strong>"Em análise de segurança"</strong> e nossa equipe
            irá revisá-lo. Obrigado por ajudar a proteger a comunidade de Penedo.
          </p>
          <button onClick={fechar} className="btn-primary mt-4 w-full">
            Entendi
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Sua denúncia é <strong>anônima</strong>. O anúncio ficará oculto do catálogo
              público enquanto for revisado.
            </span>
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-800">
            Por que este anúncio parece suspeito?
          </p>

          <div className="mt-2 space-y-1">
            {MOTIVOS.map((m) => (
              <label
                key={m}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                  motivo === m
                    ? 'border-brand-400 bg-brand-50 text-brand-800'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="motivo"
                  value={m}
                  checked={motivo === m}
                  onChange={() => setMotivo(m)}
                  className="h-3.5 w-3.5 text-brand-600 focus:ring-brand-500"
                />
                {m}
              </label>
            ))}
          </div>

          <label className="label mt-4">Detalhes (opcional)</label>
          <textarea
            value={detalhe}
            onChange={(e) => setDetalhe(e.target.value)}
            placeholder="Conte o que aconteceu. Ex.: pediram PIX de R$ 500 antes da visita..."
            rows={3}
            className="input resize-none"
          />

          <div className="mt-5 flex gap-2">
            <button onClick={fechar} className="btn-secondary flex-1">
              Cancelar
            </button>
            <button onClick={confirmar} disabled={!motivo} className="btn-primary flex-1">
              Confirmar denúncia
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}
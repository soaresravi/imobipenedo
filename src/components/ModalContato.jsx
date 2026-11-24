import { useState } from 'react'
import { ShieldCheck, MessageCircle, Phone, Send, CheckCircle2 } from 'lucide-react'
import Modal from './Modal'

export default function ModalContato({ imovel, aberto, onFechar }) {
  const [mensagem, setMensagem] = useState('')
  const [enviado, setEnviado] = useState(false)

  if (!imovel) return null

  const enviar = () => {
    if (!mensagem.trim()) return
    setEnviado(true)
  }

  const fechar = () => {
    setMensagem('')
    setEnviado(false)
    onFechar()
  }

  return (
    <Modal aberto={aberto} onFechar={fechar} titulo="Contato seguro">
      {enviado ? (
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
          <h3 className="mt-3 text-lg font-bold text-slate-900">Mensagem enviada!</h3>
          <p className="mt-1 text-sm text-slate-600">
            O anunciante <strong>{imovel.anunciante}</strong> receberá sua mensagem pelo canal
            seguro da ImobiPenedo. Nunca envie pagamentos fora deste canal.
          </p>
          <button onClick={fechar} className="btn-primary mt-4 w-full">
            Fechar
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <span>
              Este é o <strong>canal oficial</strong> da ImobiPenedo. Conversas fora daqui não são
              verificadas e podem ser golpe.
            </span>
          </div>

          <div className="mt-4 rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-500">Anunciante</p>
            <p className="text-sm font-bold text-slate-800">{imovel.anunciante}</p>
            <p className="text-xs text-emerald-700">{imovel.creci}</p>
            <p className="mt-1 text-xs text-slate-500">
              {imovel.titulo} — {imovel.bairro}
            </p>
          </div>

          <label className="label mt-4">Sua mensagem</label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder={`Olá, tenho interesse no imóvel "${imovel.titulo}". Poderia me passar mais informações?`}
            rows={4}
            className="input resize-none"
          />

          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
            <p className="font-semibold">⚠️ Antes de qualquer pagamento:</p>
            <ul className="mt-1 list-inside list-disc space-y-0.5">
              <li>Visite o imóvel pessoalmente</li>
              <li>Confira o CRECI ou matrícula com o cartório</li>
              <li>Nunca deposite sinal antes da vistoria</li>
            </ul>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button onClick={enviar} disabled={!mensagem.trim()} className="btn-primary flex-1">
              <Send className="h-4 w-4" />
              Enviar mensagem
            </button>
            <button onClick={fechar} className="btn-secondary">
              Cancelar
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}
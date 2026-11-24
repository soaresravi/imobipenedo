import { useState } from 'react'
import { AlertTriangle, PlusCircle } from 'lucide-react'
import Modal from './Modal'
import { BAIRROS, TIPOS, FINALIDADES } from '../data/imoveis'
import { existeDuplicidade } from '../utils/storage'

const FORM_INICIAL = {
  titulo: '',
  finalidade: 'Aluguel',
  tipo: 'Casa',
  bairro: 'Centro Histórico',
  endereco: '',
  preco: '',
  quartos: '2',
  banheiros: '1',
  area: '',
  anunciante: '',
  creci: '',
  imagem: '',
  descricao: '',
}

const IMAGEM_FALLBACK =
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop'

export default function ModalCadastro({ aberto, onFechar, onSalvar }) {
  const [form, setForm] = useState(FORM_INICIAL)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(null)

  const atualizar = (campo, valor) => {
    setForm((f) => ({ ...f, [campo]: valor }))
    if (erro) setErro('')
  }

  const fechar = () => {
    setForm(FORM_INICIAL)
    setErro('')
    setSucesso(null)
    onFechar()
  }

  const validarESalvar = () => {
    setErro('')
    // Campos obrigatórios
    if (!form.titulo.trim()) return setErro('Informe o título do anúncio.')
    if (!form.endereco.trim()) return setErro('Informe o endereço / rua do imóvel.')
    if (!form.preco || Number(form.preco) <= 0) return setErro('Informe um preço válido.')
    if (!form.area || Number(form.area) <= 0) return setErro('Informe a área em m².')
    if (!form.anunciante.trim()) return setErro('Informe o nome do anunciante.')
    if (!form.creci.trim())
      return setErro('Informe o CRECI ou a matrícula do imóvel (obrigatório para verificação).')

    // Regra de segurança: duplicidade
    const duplicado = existeDuplicidade({
      endereco: form.endereco,
      bairro: form.bairro,
    })
    if (duplicado) {
      setErro(
        `Alerta de Segurança: já existe um anúncio ativo para este endereço no bairro ${form.bairro}. ` +
          `Cadastro bloqueado para evitar duplicidade/fraude.`
      )
      return
    }

    const novo = {
      titulo: form.titulo.trim(),
      finalidade: form.finalidade,
      tipo: form.tipo,
      bairro: form.bairro,
      endereco: form.endereco.trim(),
      preco: Number(form.preco),
      quartos: Number(form.quartos),
      banheiros: Number(form.banheiros),
      area: Number(form.area),
      anunciante: form.anunciante.trim(),
      creci: form.creci.trim(),
      imagem: form.imagem.trim() || IMAGEM_FALLBACK,
      descricao:
        form.descricao.trim() ||
        'Anúncio recém-publicado. Entre em contato pelo canal seguro para mais informações.',
    }

    const salvo = onSalvar(novo)
    setSucesso(salvo)
  }

  return (
    <Modal aberto={aberto} onFechar={fechar} titulo="Anunciar imóvel" largura="max-w-2xl">
      {sucesso ? (
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <PlusCircle className="h-7 w-7 text-emerald-600" />
          </div>
          <h3 className="mt-3 text-lg font-bold text-slate-900">Anúncio publicado!</h3>
          <p className="mt-1 text-sm text-slate-600">
            Seu imóvel já está visível no catálogo com o selo de verificação.
          </p>
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-left text-sm">
            <p className="font-semibold text-slate-800">{sucesso.titulo}</p>
            <p className="text-xs text-slate-500">
              {sucesso.bairro} · {sucesso.endereco}
            </p>
          </div>
          <button onClick={fechar} className="btn-primary mt-4 w-full">
            Concluir
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs text-slate-500">
            Todos os campos com <span className="text-amber-600">*</span> são obrigatórios. O
            anúncio passa por checagem automática de duplicidade.
          </p>

          <div className="mt-4 space-y-3">
            <div>
              <label className="label">Título do anúncio <span className="text-amber-600">*</span></label>
              <input
                value={form.titulo}
                onChange={(e) => atualizar('titulo', e.target.value)}
                className="input"
                placeholder="Ex.: Casa com quintal no bairro Santa Luzia"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="label">Finalidade</label>
                <select
                  value={form.finalidade}
                  onChange={(e) => atualizar('finalidade', e.target.value)}
                  className="input"
                >
                  {FINALIDADES.map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Tipo</label>
                <select
                  value={form.tipo}
                  onChange={(e) => atualizar('tipo', e.target.value)}
                  className="input"
                >
                  {TIPOS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="label">Bairro</label>
                <select
                  value={form.bairro}
                  onChange={(e) => atualizar('bairro', e.target.value)}
                  className="input"
                >
                  {BAIRROS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Endereço / Rua <span className="text-amber-600">*</span></label>
                <input
                  value={form.endereco}
                  onChange={(e) => atualizar('endereco', e.target.value)}
                  className="input"
                  placeholder="Ex.: Rua da Esperança, 57"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="label">Preço (R$) <span className="text-amber-600">*</span></label>
                <input
                  type="number"
                  value={form.preco}
                  onChange={(e) => atualizar('preco', e.target.value)}
                  className="input"
                  placeholder="850"
                />
              </div>
              <div>
                <label className="label">Área (m²) <span className="text-amber-600">*</span></label>
                <input
                  type="number"
                  value={form.area}
                  onChange={(e) => atualizar('area', e.target.value)}
                  className="input"
                  placeholder="85"
                />
              </div>
              <div>
                <label className="label">Quartos</label>
                <select
                  value={form.quartos}
                  onChange={(e) => atualizar('quartos', e.target.value)}
                  className="input"
                >
                  {[0, 1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="label">Banheiros</label>
                <select
                  value={form.banheiros}
                  onChange={(e) => atualizar('banheiros', e.target.value)}
                  className="input"
                >
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="label">URL da foto (opcional)</label>
                <input
                  value={form.imagem}
                  onChange={(e) => atualizar('imagem', e.target.value)}
                  className="input"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="label">Nome do anunciante <span className="text-amber-600">*</span></label>
                <input
                  value={form.anunciante}
                  onChange={(e) => atualizar('anunciante', e.target.value)}
                  className="input"
                  placeholder="Ex.: Maria Silva"
                />
              </div>
              <div>
                <label className="label">CRECI ou Matrícula <span className="text-amber-600">*</span></label>
                <input
                  value={form.creci}
                  onChange={(e) => atualizar('creci', e.target.value)}
                  className="input"
                  placeholder="Ex.: CRECI-AL 12345"
                />
              </div>
            </div>

            <div>
              <label className="label">Descrição (opcional)</label>
              <textarea
                value={form.descricao}
                onChange={(e) => atualizar('descricao', e.target.value)}
                rows={3}
                className="input resize-none"
                placeholder="Detalhes do imóvel, condições, proximidades..."
              />
            </div>
          </div>

          {erro && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{erro}</span>
            </div>
          )}

          <div className="mt-5 flex gap-2">
            <button onClick={fechar} className="btn-secondary flex-1">
              Cancelar
            </button>
            <button onClick={validarESalvar} className="btn-primary flex-1">
              Publicar anúncio
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}
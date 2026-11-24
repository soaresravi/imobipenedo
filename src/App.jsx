import { useState, useEffect, useRef, useMemo } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import Header from './components/Header'
import BarraTitulo from './components/BarraTitulo'
import Filtros from './components/Filtros'
import GradeImoveis from './components/GradeImoveis'
import Footer from './components/Footer'
import ModalDetalhes from './components/ModalDetalhes'
import ModalDenuncia from './components/ModalDenuncia'
import ModalContato from './components/ModalContato'
import ModalCadastro from './components/ModalCadastro'
import {
  inicializarStorage,
  getImoveis,
  resetarDemo,
  adicionarImovel,
  marcarEmAnalise,
  registrarDenuncia,
} from './utils/storage'

const FILTROS_INICIAIS = {
  finalidade: 'Todos',
  tipo: 'Todos',
  bairro: 'Todos',
  precoMax: 500000,
  quartosMin: 0,
}

export default function App() {
  const [perfil, setPerfil] = useState('cliente')
  const [busca, setBusca] = useState('')
  const [imoveis, setImoveis] = useState([])
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS)
  const [filtrosMobileAberto, setFiltrosMobileAberto] = useState(false)
  const catalogoRef = useRef(null)

  // Modais
  const [detalhes, setDetalhes] = useState(null) // imóvel aberto
  const [denuncia, setDenuncia] = useState(null)
  const [contato, setContato] = useState(null)
  const [cadastroAberto, setCadastroAberto] = useState(false)

  useEffect(() => {
    inicializarStorage()
    setImoveis(getImoveis())
  }, [])

  const imoveisFiltrados = useMemo(() => {
    const norm = (s) =>
      String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const termo = norm(busca)
    return imoveis.filter((im) => {
      if (termo) {
        const alvo = norm(`${im.titulo} ${im.bairro} ${im.endereco} ${im.tipo}`)
        if (!alvo.includes(termo)) return false
      }
      if (filtros.finalidade !== 'Todos' && im.finalidade !== filtros.finalidade) return false
      if (filtros.tipo !== 'Todos' && im.tipo !== filtros.tipo) return false
      if (filtros.bairro !== 'Todos' && im.bairro !== filtros.bairro) return false
      if (im.preco > filtros.precoMax) return false
      if (im.quartos < filtros.quartosMin) return false
      return true
    })
  }, [imoveis, filtros, busca])

  const handleReset = () => {
    if (confirm('Restaurar os 6 imóveis originais e apagar cadastros/denúncias desta máquina?')) {
      resetarDemo()
      window.location.reload()
    }
  }

  // Só permite cadastro no perfil anunciante
  const abrirCadastro = () => {
    if (perfil !== 'anunciante') {
      alert('Alterne para o perfil "Anunciante" no topo para publicar um imóvel.')
      return
    }
    setCadastroAberto(true)
  }

  const salvarImovel = (dados) => {
    const novo = adicionarImovel(dados)
    setImoveis(getImoveis())
    return novo
  }

  const confirmarDenuncia = ({ imovel, motivo, detalhe }) => {
    registrarDenuncia({ idImovel: imovel.id, motivo, detalhe })
    const atualizados = marcarEmAnalise(imovel.id)
    setImoveis(atualizados)
  }

  const scrollParaCatalogo = () =>
    catalogoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const limparFiltros = () => {
    setFiltros(FILTROS_INICIAIS)
    setBusca('')
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Header
        perfil={perfil}
        setPerfil={setPerfil}
        onAnunciar={abrirCadastro}
        busca={busca}
        setBusca={setBusca}
        onBuscar={scrollParaCatalogo}
      />

      <main className="flex-1">
        <BarraTitulo total={imoveisFiltrados.length} />

        <div ref={catalogoRef} className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <Filtros
              filtros={filtros}
              setFiltros={setFiltros}
              onLimpar={limparFiltros}
              abertoMobile={filtrosMobileAberto}
              fecharMobile={() => setFiltrosMobileAberto(false)}
            />

            <div>
              <div className="mb-4 flex items-center justify-between lg:hidden">
                <p className="text-sm text-slate-600">
                  <strong className="text-slate-900">{imoveisFiltrados.length}</strong>{' '}
                  {imoveisFiltrados.length === 1 ? 'resultado' : 'resultados'}
                </p>
                <button
                  onClick={() => setFiltrosMobileAberto(true)}
                  className="btn-secondary !py-2 !text-xs"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                </button>
              </div>

              <GradeImoveis
                imoveis={imoveisFiltrados}
                onVerDetalhes={(im) => setDetalhes(im)}
                onDenunciar={(im) => setDenuncia(im)}
                onLimparFiltros={limparFiltros}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer onReset={handleReset} />

      {/* Modais */}
      <ModalDetalhes
        imovel={detalhes}
        aberto={!!detalhes}
        onFechar={() => setDetalhes(null)}
        onDenunciar={(im) => {
          setDetalhes(null)
          setDenuncia(im)
        }}
        onContatoSeguro={(im) => {
          setDetalhes(null)
          setContato(im)
        }}
      />

      <ModalDenuncia
        imovel={denuncia}
        aberto={!!denuncia}
        onFechar={() => setDenuncia(null)}
        onConfirmar={confirmarDenuncia}
      />

      <ModalContato
        imovel={contato}
        aberto={!!contato}
        onFechar={() => setContato(null)}
      />

      <ModalCadastro
        aberto={cadastroAberto}
        onFechar={() => setCadastroAberto(false)}
        onSalvar={salvarImovel}
      />
    </div>
  )
}
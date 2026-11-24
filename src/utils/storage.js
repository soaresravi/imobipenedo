import { IMOVEIS_SEED } from '../data/imoveis';

const KEY_IMOVEIS = 'imobipenedo:imoveis'
const KEY_DENUNCIAS = 'imobipenedo:denuncias'

export function inicializarStorage() {

    const existente = localStorage.getItem(KEY_IMOVEIS)

    if (!existente) {
        localStorage.getItem(KEY_IMOVEIS, JSON.stringify(IMOVEIS_SEED))
    }

}

export function getImoveis() {

    try {

        const raw = localStorage.getItem(KEY_IMOVEIS)

        if (!raw) {
            inicializarStorage()
            return IMOVEIS_SEED
        }

        return JSON.parse(raw)

    } catch (e) {
        console.error('Erro ao ler imóveis do storage:', e)
        return IMOVEIS_SEED
    }

}

export function salvarImoveis(lista) {
    localStorage.setItem(KEY_IMOVEIS, JSON.stringify(lista))
}

export function adicionarImovel(imovel) {

    const atuais = getImoveis()

    const novo = {
        ...imovel,
        id: `user-${Date.now()}`,
        verificado: true,
        status: 'ativo',
        criadoEm: new Date().toISOString().slice(0, 10),
        historicoPreco: 'Anúncio recém publicado',
    }

    const atualizada = [novo, ...atuais]
    salvarImoveis(atualizada)
    return novo

}

export function marcarEmAnalise(idImovel) {
    const atuais = getImoveis()
    const atualizada = atuais.map((im) => im.id === idImovel ? { ...im, status: 'em_analise' } : im)
    salvarImoveis(atualizada)
    return atualizada
}

export function registrarDenuncia({ idImovel, motivo, detalhe }) {

    const atuais = getDenuncias()
    
    const nova = {
        id: `den-${Date.now()}`,
        idImovel,
        motivo,
        detalhe: detalhe || '',
        criadoEm: new Date().toISOString(),
    }

    localStorage.setItem(KEY_DENUNCIAS, JSON.stringify([nova, ...atuais]))
    return nova

}

export function getDenuncias() {

    try {
        const raw = localStorage.getItem(KEY_DENUNCIAS)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }

}

export function existeDuplicidade({ endereco, bairro, idIgnorar }) {

    const atuais = getImoveis()
    const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '').trim()
    const alvoEnd = norm(endereco)
    const alvoBai = norm(bairro)

    return atuais.find((im) => im.id !== idIgnorar && norm(im.endereco) === alvoEnd && norm(im.bairro) === alvoBai)

}

export function resetarDemo() {
    localStorage.setItem(KEY_IMOVEIS, JSON.stringify(IMOVEIS_SEED))
    localStorage.removeItem(KEY_DENUNCIAS)
}
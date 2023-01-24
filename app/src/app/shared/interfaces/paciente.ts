export interface Pacientes {
    id: number | null,
    nome: string,
    genero: string,
    data: string,
    cpf: string,
    rg: string,
    estado_civil: string,
    telefone: string,
    email: string,
    naturalidade: string,
    contatos_emergencia: ContatosEmergencia[],
    convenio: string,
    numero_carteira_covenio: string,
    validade_carteira_covenio: string,
    alergias: Alergia[],
    cep: string,
    cidade: string,
    estado: string,
    logradouro: string,
    numero: number,
    complemento: string,
    bairro: string
}

interface ContatosEmergencia {
    nome_contato_emergencia: string,
    numero_telefone_contato_emergencia: string
}

interface Alergia {
    tipo_alergia: string
}
export interface Consulta {
    id: number | null,
    motivo: string,
    data_da_consulta: string,
    hora_da_consulta: string,
    descricao_do_problema: string,
    medicacao_receitada: string,
    dosagem_e_precauções: string,
    pacienteId: number
}
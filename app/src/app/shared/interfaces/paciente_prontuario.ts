import { Pacientes } from "./paciente";

export interface PacienteProntuario extends Pacientes {
    consultas: Consulta[],
    exames: Exame[]
}

interface Consulta {
    id: number,
    motivo: string,
    data_da_consulta: string,
    hora_da_consulta: string,
    descricao_do_problema: string,
    medicacao_receitada: string,
    dosagem_e_precauções: string,
    pacienteId: number
}

interface Exame {
    id: number,
    nome_do_exame: string,
    data_do_exame: string,
    hora_do_exame: string,
    tipo_do_exame: string,
    laboratorio: string,
    url_do_documento_do_exame: string,
    resultado_do_exame: string,
    pacienteId: number
}
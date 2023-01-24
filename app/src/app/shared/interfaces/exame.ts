export interface Exame {
    id: number | null,
    nome_do_exame: string,
    data_do_exame: string,
    hora_do_exame: string,
    tipo_do_exame: string,
    laboratorio: string,
    url_do_documento_do_exame: string,
    resultado_do_exame: string,
    pacienteId: number
}
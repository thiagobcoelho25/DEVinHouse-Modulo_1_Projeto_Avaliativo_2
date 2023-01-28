import { Consulta } from "./consulta";
import { Exame } from "./exame";
import { Pacientes } from "./paciente";

export interface PacienteProntuario extends Pacientes {
    consultas: Consulta[],
    exames: Exame[]
}


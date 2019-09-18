export class Pacientes {
    constructor (
        public idPersona:number,
        public nombre: string,
        public apellido: string,
        public telefono: string,
        public email: string,
        public ruc: string,
        public cedula: string,
        public fechaNacimiento: string,
        public tipoPersona: string,
    ){ }
}

export class ListaPacientes{
    public lista : Pacientes[];
    public totalDatos:number;
}
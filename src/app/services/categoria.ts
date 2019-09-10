export class Categoria {
    constructor(
        public idCategoria: number,
        public descripcion: string,
        public flagVisible: string,
        public posicion: number
    ) {}
}

export class ListaCategoria{
    public lista: Categoria[];
    public totalDatos: number;
}
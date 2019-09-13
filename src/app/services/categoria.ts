export class Categoria {
    constructor(
        public idCategoria: number,
        public descripcion: string,
    ) {}
}

export class ListaCategoria {
    public lista: Categoria[];
    public totalDatos: number;
}

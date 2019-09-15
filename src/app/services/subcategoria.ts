export class SubCategoria {
    constructor(
        public idTipoProducto: number,
        public descripcion: string,
        public idCategoria: number,
    ) {}
}

export class ListaCategoria {
    public lista: SubCategoria[];
    public totalDatos: number;
}

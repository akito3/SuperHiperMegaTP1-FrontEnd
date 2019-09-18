export class Productos {
    constructor (
        public idPresentacionProducto:number,
        public nombre: string,
        public idProducto: IdProducto,
        public descripcion: string,
    ){ }
}

export class IdProducto {
    constructor(
        public idProducto: number,
        public idTipoProducto: IdTipoProducto,
    ){}
}

export class IdTipoProducto{
    constructor(
        public idTipoProducto :number,
    ){}
}

export class ListaProductos{
    public lista : Productos[];
    public totalDatos:number;
}

export class ListaIdProductos{
    public lista: IdProducto[];
    public totalDatos:number;
}
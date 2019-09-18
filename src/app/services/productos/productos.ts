export class Productos {
    constructor (
        public idPresentacionProducto:number,
        public codigo :number,
        public flagServicio:String,
        public existenciaProducto : ExistenciaProducto,
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

export class ExistenciaProducto{
    constructor(
        public precioVenta:number,
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
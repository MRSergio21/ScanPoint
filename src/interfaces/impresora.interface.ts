import { Types } from "mongoose";

export interface Impresora {
    marca: string;
    modelo: string;
    fechaCompra: string;
    createdBY: Types.ObjectId;
}
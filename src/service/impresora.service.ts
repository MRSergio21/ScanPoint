import { Impresora } from "../interfaces/impresora.interface";
import ImpresoraModel from "../models/impresora.model";

const insertImpresora = async (impresora: Impresora) => {
    const resposeInsert = await ImpresoraModel.create(impresora);
    return resposeInsert;
};

const actualizarImpresora = async (id: string, data: Impresora) => {
    const responseImpresora =  await ImpresoraModel.findOneAndUpdate({ _id:id }, data, { new: true });
    return responseImpresora;
};

const eliminarImpresora = async (id: string) => {
    const responseImpresora = await ImpresoraModel.deleteOne({_id:id});
    return responseImpresora;
};

const obtenerImpresoras = async () => {
    const responseImpresora = await ImpresoraModel.find({});
    return responseImpresora;
};

const obtenerImpresora = async (id: string) => {
    const responseImpresora = await ImpresoraModel.findOne({_id:id});
    return responseImpresora;
};

export { insertImpresora, actualizarImpresora, eliminarImpresora, obtenerImpresora, obtenerImpresoras  };
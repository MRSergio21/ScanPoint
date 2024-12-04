import { Response, Request } from "express"
import { handleHttp } from "../utils/error.handle"
import { insertImpresora, obtenerImpresora, obtenerImpresoras, actualizarImpresora, eliminarImpresora} from "../service/impresora.service"

const getImpresora = async ({ params }: Request, res: Response) => {
    try{
        const { id } = params
        const response = await obtenerImpresora(id);
        res.send(response);
    }catch(e){
        handleHttp(res, 'Error para obtener la informacion')
    }
}

const getImpresoras = async (req: Request, res: Response) => {
    try{
        const response = await obtenerImpresoras();
        res.send(response);
    }catch(e){
        handleHttp(res, 'Error para obtener la informacion')
    }
}

const postImpresora = async ({ body }: Request, res: Response) => {
    try{
        const responseImpresora = await insertImpresora(body);
        res.send(responseImpresora);
    }catch(e){
        handleHttp(res, 'Error para guardar impresora')
    }
}

const updateImpresora = async ({ params, body }: Request, res: Response) =>{
    try{
        const { id } = params;
        const response = await actualizarImpresora(id, body);
        res.send(response);
    }catch(e){
        handleHttp(res, 'Error para actualizar impresora')
    }
}

const deleteImpresora = async ({ params }: Request, res: Response) => {
    try{
        const { id } = params;
        const response = await eliminarImpresora(id);
        res.send(response);
    }catch(e){
        handleHttp(res, 'Error para eliminar impresora')
    }
}

export { getImpresora, getImpresoras, postImpresora, updateImpresora, deleteImpresora }
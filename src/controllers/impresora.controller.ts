import { Response, Request } from "express"
import { handleHttp } from "../utils/error.handle"

const getImpresora = (req: Request, res: Response) => {
    try{
        
    }catch(e){
        handleHttp(res, 'Error para obtener la informacion')
    }
}

const getImpresoras = (req: Request, res: Response) => {
    try{

    }catch(e){
        handleHttp(res, 'Error para obtener la informacion')
    }
}

const postImpresora = ({ body }: Request, res: Response) => {
    try{
        res.send(body);
    }catch(e){
        handleHttp(res, 'Error para guardar impresora')
    }
}

const updateImpresora = (req: Request, res: Response) =>{
    try{

    }catch(e){
        handleHttp(res, 'Error para actualizar impresora')
    }
}

const deleteImpresora = (req: Request, res: Response) => {
    try{

    }catch(e){
        handleHttp(res, 'Error para eliminar impresora')
    }
}

export { getImpresora, getImpresoras, postImpresora, updateImpresora, deleteImpresora }
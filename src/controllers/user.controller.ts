import { Response, Request } from "express"
import { handleHttp } from "../utils/error.handle"
import { insertUser, obtenerUser } from "../service/user.service"

const getUser = async ({ params }: Request, res: Response) =>  {
    try{
        const { id } = params
        const response = await obtenerUser(id)
        res.send(response);
    }catch(e){
        handleHttp(res, 'Error para obtener la informacion')
    }
}

const postUser = async ({ body }: Request, res: Response) => {
    try{
        const responseImpresora = await insertUser(body);
        res.send(responseImpresora);
    }catch(e){
        handleHttp(res, 'Error para guardar impresora')
    }
}

export { getUser, postUser }
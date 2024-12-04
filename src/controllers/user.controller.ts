import { Response, Request } from "express"
import { handleHttp } from "../utils/error.handle"

const getUser = (req: Request, res: Response) => {
    try{
        
    }catch(e){
        handleHttp(res, 'Error para obtener la informacion')
    }
}

const postUser = ({ body }: Request, res: Response) => {
    try{
        res.send(body);
    }catch(e){
        handleHttp(res, 'Error para guardar el usuario')
    }
}

export { getUser, postUser }
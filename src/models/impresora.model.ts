import {Schema, Types, model, Model} from "mongoose";

const IntemSchema = new Schema(
    {
        marca: {
            type: String,
            required: true,
        },
        modelo: {
            type: String,
            required: true,
        },
        fechaCompra: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Types.ObjectId,
            ref: 'users',
            required: true,
        },
    },
    {
        collection: 'impresoras',
        timestamps: true,
        versionKey: false,
    }
)

const ImpresoraModel = model('impresoras', IntemSchema);

export default ImpresoraModel;
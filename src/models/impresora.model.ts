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
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const ImpresoraModel = model('impresora', IntemSchema);

export default ImpresoraModel;
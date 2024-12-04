import {Schema, Types, model, Model} from "mongoose";

const IntemSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const UserModel = model('user', IntemSchema);

export default UserModel;
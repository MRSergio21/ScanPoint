import {Schema, Types, model, Model} from "mongoose";

const UserSchema = new Schema(
    {
        user: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
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

const UserModel = model('user', UserSchema);

export default UserModel;
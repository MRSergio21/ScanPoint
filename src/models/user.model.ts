import {Schema, Types, model, Model} from "mongoose";

const UserSchema = new Schema(
    {
        user: {
            type: String,
            unique: true,
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
        collection: 'users',
        timestamps: true,
        versionKey: false,
    }
)

const UserModel = model('users', UserSchema);

export default UserModel;
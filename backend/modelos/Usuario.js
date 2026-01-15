import { Int32 } from "bson";
import mongoose from "mongoose";
import { type } from "os";
import { hash } from "bcryptjs";

const esquemaUsuario = new mongoose.Schema(
    {
        usuario: {
            type: String,
            required: true,
            unique: true
        },
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        edad: {
            type: Int32,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /.+\@.+\..+/
        },
        contrasenha: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

esquemaUsuario.pre("save", async function () {
    if (!this.isModified("contrasenha")) return;
    this.contrasenha = await hash(this.contrasenha, 10);
    /* if (!this.isModified("contrasenha")) {
        return siguiente();
    }
    this.contrasenha = await hash(this.contrasenha, 10);
    siguiente(); */
});

const Usuario = mongoose.model("Usuario", esquemaUsuario);


export default Usuario;

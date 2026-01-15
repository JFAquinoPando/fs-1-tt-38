/* import { datos } from "../datos/usuarios.js"; */
import Usuario from "../modelos/Usuario.js";
import { hash } from "bcryptjs";

export async function obtenerUsuarios(peticion, respuesta) {
    const datos = await Usuario.find()
    respuesta.send(datos)
}

export async function obtenerUsuario(peticion, respuesta) {
    const pos = peticion.params.posicion
    const dato = await Usuario.find({usuario: pos})
    respuesta.send(dato)
}

export async function crearUsuario(peticion, respuesta) {
    const usuarioNuevo = peticion.body
    /* const passEncrypt = await hash(usuarioNuevo.contrasenha, 3)
    const dato = new Usuario ({...usuarioNuevo, contrasenha: passEncrypt }) */
    const dato = new Usuario (usuarioNuevo)
    const respuestaGuardado = await dato.save()
    respuesta.status(201).json({
        mensaje: "Usuario creado",
        respuestaGuardado
    })
}


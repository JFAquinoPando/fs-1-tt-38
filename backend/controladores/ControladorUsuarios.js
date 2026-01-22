/* import { datos } from "../datos/usuarios.js"; */
import Usuario from "../modelos/Usuario.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { loadEnvFile } from 'node:process';

export async function obtenerUsuarios(peticion, respuesta) {
    //const datos = await Usuario.find()

    const {busqueda, pagina = 1, limite = 10} = peticion.query
    const consulta = {}
    if (busqueda) {
        consulta.$or = [
            { nombre:   { $regex: busqueda, $options: 'i' } },
            { apellido: { $regex: busqueda, $options: 'i' } }
        ]
    }



    // Paginación de datos del usuario:
    const numeroPagina = parseInt(pagina, 10) || 1
    const numeroLimite = parseInt(limite, 10) || 10
    const salto = (numeroPagina - 1 ) * numeroLimite

    /* respuesta.send(datos) */

    const datosFiltrados = await Usuario.find(consulta)
                                .limit(numeroLimite)
                                .skip(salto)
                                .sort({createdAt: -1})
    const total = await Usuario.countDocuments(consulta)
    respuesta.status(200).json(
        {
            totalUsuariosFiltrados : total,
            pagina: numeroPagina,
            limite: numeroLimite,
            totalPaginas: Math.ceil(total/numeroLimite),
            usuariosEncontrados: datosFiltrados
        }
    )

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

export async function actualizarUsuario(peticion, respuesta){
    const usuarioActualizar = peticion.params.posicion
    const datosActualizacion = peticion.body
    
    try {
        const usuarioActualizado = await Usuario.findOneAndUpdate(
            {usuario: usuarioActualizar},
            datosActualizacion,
            {new: true, runValidators: true}
        )
        
        if (!usuarioActualizado) {
            return respuesta.status(404).json({
                mensaje: "Usuario no encontrado",
                usuario_id: usuarioActualizar
            })
        }
        
        respuesta.status(200).json({
            mensaje: "Usuario actualizado",
            usuarioActualizado
        })
    } catch (error) {
        respuesta.status(400).json({
            mensaje: "Error al actualizar usuario",
            error: error.message
        })
    }
}

export async function eliminarUsuario(peticion, respuesta){
    const usuarioEliminar = peticion.params.posicion
    await Usuario.deleteOne({usuario: usuarioEliminar})
    respuesta.status(200).json({
        mensaje: "Usuario eliminado",
        usuario_id: usuarioEliminar
    })
}

export async function loginUsuario(peticion, respuesta){
    loadEnvFile();
    try {
        const { email, contrasenha } = peticion.body

        // Validar que los campos requeridos existan
        if (!email || !contrasenha) {
            return respuesta.status(400).json({
                mensaje: "Email y contraseña son requeridos"
            })
        }

        // Buscar usuario por email
        const usuario = await Usuario.findOne({ email })

        if (!usuario) {
            return respuesta.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }

        // Comparar contraseñas
        const passwordValida = await compare(contrasenha, usuario.contrasenha)

        if (!passwordValida) {
            return respuesta.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }

        

        // Generar JWT
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email, usuario: usuario.usuario },
            process.env.JWT_PASS, // En producción usar variable de entorno
            { expiresIn: "24h" }
        )

        // Respuesta exitosa
        respuesta.status(200).json({
            mensaje: "Login correcto",
            usuario: {
                id: usuario._id,
                usuario: usuario.usuario,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                edad: usuario.edad
            },
            token
        })

    } catch (error) {
        respuesta.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        })
    }
}
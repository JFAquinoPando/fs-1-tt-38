import express from "express";
import { crearUsuario, obtenerUsuario, obtenerUsuarios, eliminarUsuario, actualizarUsuario, loginUsuario } 
    from "../controladores/ControladorUsuarios.js";

export const Enrutador = express.Router()


Enrutador.get("/", obtenerUsuarios)

Enrutador.get("/:posicion", obtenerUsuario)

Enrutador.post("/", crearUsuario)

Enrutador.post("/login", loginUsuario)

Enrutador.put("/:posicion", actualizarUsuario)

Enrutador.delete("/:posicion", eliminarUsuario)

/* export default Enrutador; */
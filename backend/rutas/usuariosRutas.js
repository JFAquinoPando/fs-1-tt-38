import express from "express";
import { crearUsuario, obtenerUsuario, obtenerUsuarios } from "../controladores/ControladorUsuarios.js";

export const Enrutador = express.Router()


Enrutador.get("/", obtenerUsuarios)

Enrutador.get("/:posicion", obtenerUsuario)

Enrutador.post("/", crearUsuario)

/* export default Enrutador; */
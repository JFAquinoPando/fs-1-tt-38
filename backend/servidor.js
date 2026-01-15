import express from "express";
import cors from "cors";
import {Enrutador} from "./rutas/usuariosRutas.js";
import { conectarDB } from "./config/basedatos.js";

const servidor = express()

servidor.use(cors())
servidor.use(express.json())

conectarDB()

servidor.use("/usuarios", Enrutador)

servidor.listen(3000,() => {
    console.log("Hola desde el puerto 3000");
    
})
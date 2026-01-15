import mongoose from "mongoose";

const url = "mongodb://localhost:27017";
const baseDatos = "idt";

export const conectarDB = async () => {
    try {
        await mongoose.connect(`${url}/${baseDatos}`);
        console.log("✓ Conectado a MongoDB");
    } catch (error) {
        console.error("✗ Error al conectar a MongoDB:", error.message);
        process.exit(1);
    }
};

export default mongoose;

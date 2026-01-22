import mongoose from "mongoose";

const url = "mongodb://localhost:27017";
const baseDatos = "idt";

export const conectarDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Vercel-Admin-proyectofullstack:7gxrs8LCgYgqvVbV@proyectofullstack.f8atc4p.mongodb.net/?retryWrites=true&w=majority`);
        console.log("✓ Conectado a MongoDB");
    } catch (error) {
        console.error("✗ Error al conectar a MongoDB:", error.message);
        process.exit(1);
    }
};

export default mongoose;

import mongoose from "mongoose";

// const url = "mongodb://localhost:27017";
// const baseDatos = "idt";

/* export const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✓ Conectado a MongoDB");
    } catch (error) {
        console.error("✗ Error al conectar a MongoDB:", error.message);
        process.exit(1);
    }
}; */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Falta la variable MONGODB_URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const conectarDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("✓ Conectado a MongoDB");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default mongoose;

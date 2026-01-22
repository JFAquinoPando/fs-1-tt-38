# 🚀 Guía Completa de Ejecución - Full Stack

## 📋 Requisitos Previos

- Node.js v16+ instalado
- npm o yarn
- MongoDB corriendo (puerto 27017)
- Git (opcional)

## 🔧 Paso 1: Preparar el Entorno

### Verificar Node.js
```bash
node --version
npm --version
```

### Verificar MongoDB
```bash
# En Windows, verifica que el servicio de MongoDB esté corriendo
# Si usas MongoDB local, asegúrate de que sea accesible en mongodb://localhost:27017
```

## 📦 Paso 2: Instalar Backend

```bash
# Navegar a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Verificar que el package.json tenga:
# - bcryptjs
# - cors
# - dotenv
# - express
# - jsonwebtoken
# - mongoose
```

## 🎨 Paso 3: Instalar Frontend

```bash
# Navegar a la carpeta del frontend
cd ../frontend

# Instalar dependencias
npm install

# Debería instalar:
# - react ^19.2.0
# - react-dom ^19.2.0
```

## ▶️ Paso 4: Ejecutar la Aplicación

### Terminal 1: Backend

```bash
cd backend
npm run dev

# Output esperado:
# > node --watch servidor.js
# Hola desde el puerto 3000
```

✅ El servidor backend estará disponible en `http://localhost:3000`

### Terminal 2: Frontend (nueva terminal)

```bash
cd frontend
npm run dev

# Output esperado:
# ➜  Local:   http://localhost:5173/
# ➜  press h to show help
```

✅ La aplicación frontend estará disponible en `http://localhost:5173`

## 🌐 Acceder a la Aplicación

Abre tu navegador y ve a: **http://localhost:5173**

Deberías ver:
- Header: "🔐 Gestión de Usuarios"
- Barra de búsqueda
- Botón "+ Nuevo Usuario"
- Lista de usuarios (si existen)

## ✨ Funcionalidades Disponibles

### 1. Ver Usuarios
La lista se carga automáticamente desde el backend

### 2. Buscar Usuarios
Escribe en la barra de búsqueda:
```
Ejemplo: "Juan" → busca usuarios con nombre o apellido "Juan"
```

### 3. Crear Usuario
- Click en "+ Nuevo Usuario"
- Llenar el formulario:
  - Usuario: `johndoe` (único)
  - Nombre: `John`
  - Apellido: `Doe`
  - Edad: `25` (mínimo 18)
  - Email: `john@example.com` (único)
  - Contraseña: `password123`
- Click en "✓ Crear Usuario"

### 4. Editar Usuario
- Click en "✏️ Editar" en la tarjeta
- Modificar los datos
- Click en "✓ Guardar"

### 5. Eliminar Usuario
- Click en "🗑️ Eliminar"
- Confirmar la acción

## 🔍 Probar API con cURL

### Obtener todos los usuarios
```bash
curl http://localhost:3000/usuarios
```

### Buscar usuario
```bash
curl "http://localhost:3000/usuarios?search=juan"
```

### Crear usuario
```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "usuario": "johndoe",
    "nombre": "John",
    "apellido": "Doe",
    "edad": 25,
    "email": "john@example.com",
    "contrasenha": "password123"
  }'
```

### Actualizar usuario
```bash
curl -X PUT http://localhost:3000/usuarios/johndoe \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Jonathan"
  }'
```

### Eliminar usuario
```bash
curl -X DELETE http://localhost:3000/usuarios/johndoe
```

## 🐛 Solución de Problemas

### Error: "Cannot connect to backend"
- ✅ Verifica que el backend esté corriendo (puerto 3000)
- ✅ Revisa la consola del navegador (F12) para más detalles

### Error: "MongoDB connection failed"
- ✅ Verifica que MongoDB esté corriendo
- ✅ Revisa el archivo `config/basedatos.js`

### Error: "CORS error"
- ✅ El servidor backend tiene CORS habilitado
- ✅ El proxy en `vite.config.js` está configurado

### Error: "Port 3000 or 5173 already in use"
- ✅ Usa otros puertos:
  ```bash
  # Backend en otro puerto
  PORT=3001 npm run dev
  
  # Frontend en otro puerto
  vite --port 5174
  ```

## 📊 Estructura de Datos

### Usuario
```json
{
  "_id": "ObjectId",
  "usuario": "johndoe",
  "nombre": "John",
  "apellido": "Doe",
  "edad": 25,
  "email": "john@example.com",
  "contrasenha": "hashedPassword",
  "createdAt": "2024-01-21T10:00:00Z",
  "updatedAt": "2024-01-21T10:00:00Z"
}
```

## 🎯 Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/usuarios` | Listar usuarios |
| GET | `/usuarios/:posicion` | Obtener usuario |
| POST | `/usuarios` | Crear usuario |
| PUT | `/usuarios/:posicion` | Actualizar usuario |
| DELETE | `/usuarios/:posicion` | Eliminar usuario |

## 🛑 Detener la Aplicación

- **Backend**: `Ctrl + C` en Terminal 1
- **Frontend**: `Ctrl + C` en Terminal 2

## 📈 Próximos Pasos

- Agregar autenticación con JWT
- Implementar roles y permisos
- Agregar validación avanzada
- Crear más vistas
- Implementar dark mode
- Agregar tests unitarios

## 🎊 ¡Todo Listo!

Ahora tienes una aplicación Full Stack completamente funcional. 

¿Preguntas? Revisa los README individuales:
- `/backend/` - Documentación del backend
- `/frontend/FRONTEND-README.md` - Documentación del frontend

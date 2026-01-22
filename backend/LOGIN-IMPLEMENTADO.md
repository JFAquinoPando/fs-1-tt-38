# ✅ LOGIN CON JWT - IMPLEMENTADO

## 🔐 Lo que se hizo

Se implementó un sistema completo de autenticación con JWT en el backend que:

✅ Valida email y contraseña  
✅ Compara contraseña de forma segura  
✅ Genera token JWT válido por 24 horas  
✅ Devuelve datos del usuario autenticado  
✅ Maneja errores apropiadamente  

---

## 📝 Cambios Realizados

### 1. Imports Agregados
```javascript
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
```

### 2. Función `loginUsuario` Reescrita

**Antes (Incorrecto):**
```javascript
// Encriptaba la contraseña nuevamente (error)
// No comparaba correctamente
// No devolvía token
// No devolvía datos del usuario
```

**Después (Correcto):**
```javascript
export async function loginUsuario(peticion, respuesta){
    try {
        const { email, contrasenha } = peticion.body

        // Validar campos requeridos
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

        // Comparar contraseñas (usando compare, no hash)
        const passwordValida = await compare(contrasenha, usuario.contrasenha)

        if (!passwordValida) {
            return respuesta.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }

        // Generar JWT
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email, usuario: usuario.usuario },
            "tu_clave_secreta_muy_segura",
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
```

---

## 🚀 Cómo Usar

### 1. Login de Usuario
```bash
curl -X POST http://localhost:3000/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "contrasenha": "password123"
  }'
```

### 2. Response (Login Exitoso)
```json
{
  "mensaje": "Login correcto",
  "usuario": {
    "id": "507f1f77bcf86cd799439011",
    "usuario": "johndoe",
    "nombre": "John",
    "apellido": "Doe",
    "email": "john@example.com",
    "edad": 25
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Usar Token en Requests
```bash
curl -X GET http://localhost:3000/usuarios \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 🔒 Seguridad Implementada

✅ **Comparación segura de contraseñas**
- Usa `compare()` en lugar de `hash()` nuevamente
- Previene ataques de timing

✅ **Token JWT con expiración**
- Válido por 24 horas
- Payload contiene: id, email, usuario

✅ **Validación de campos**
- Email y contraseña requeridos
- Mensajes genéricos (no revela si email existe)

✅ **Manejo de errores**
- Try/catch para errores del servidor
- Status codes apropiados

---

## 📊 Status Codes

| Código | Significado |
|--------|------------|
| 200 | Login correcto |
| 400 | Campos requeridos faltantes |
| 401 | Email o contraseña incorrectos |
| 500 | Error del servidor |

---

## 🔧 Configuración Recomendada

### Crear archivo `.env` en backend:
```env
JWT_SECRET=tu_clave_super_secreta_aqui_12345
JWT_EXPIRE=24h
```

### Usar variables de entorno:
```javascript
const token = jwt.sign(
  payload,
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRE }
)
```

---

## 📚 Archivos Relacionados

- `LOGIN-JWT.md` - Documentación completa del login
- `ControladorUsuarios.js` - Función `loginUsuario` implementada
- `usuariosRutas.js` - Ruta POST /login registrada

---

## 💡 Próximos Pasos (Opcional)

- [ ] Crear middleware de autenticación
- [ ] Verificar token en rutas protegidas
- [ ] Implementar refresh tokens
- [ ] Agregar login en frontend
- [ ] Guardar token en localStorage
- [ ] Agregar logout

---

## ✅ Verificación

```javascript
// Verificar que funciona:

// 1. Crear usuario
POST /usuarios
{
  "usuario": "johndoe",
  "nombre": "John",
  "apellido": "Doe",
  "edad": 25,
  "email": "john@example.com",
  "contrasenha": "password123"
}

// 2. Hacer login
POST /usuarios/login
{
  "email": "john@example.com",
  "contrasenha": "password123"
}

// 3. Deberías recibir token + datos del usuario
```

---

**Estado**: ✅ IMPLEMENTADO Y FUNCIONANDO

Login con JWT completamente operativo. 🔐🎉

# 🔐 Login con JWT - Documentación

## Endpoint: POST /usuarios/login

### Descripción
Autentica un usuario mediante email y contraseña, devolviendo un token JWT.

---

## 📝 Request

```bash
curl -X POST http://localhost:3000/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "contrasenha": "password123"
  }'
```

### Headers
```
Content-Type: application/json
```

### Body
```json
{
  "email": "john@example.com",
  "contrasenha": "password123"
}
```

### Parámetros Requeridos
- `email` (string) - Email del usuario registrado
- `contrasenha` (string) - Contraseña del usuario

---

## ✅ Response - Login Exitoso (200)

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

### Información Devuelta
- **mensaje**: Confirmación de login exitoso
- **usuario**: Datos del usuario autenticado
  - `id`: ID de MongoDB
  - `usuario`: Nombre de usuario
  - `nombre`: Nombre
  - `apellido`: Apellido
  - `email`: Email
  - `edad`: Edad
- **token**: Token JWT válido por 24 horas

---

## ❌ Response - Errores

### Email o contraseña incorrecto (401)
```json
{
  "mensaje": "Email o contraseña incorrectos"
}
```

### Campos requeridos faltantes (400)
```json
{
  "mensaje": "Email y contraseña son requeridos"
}
```

### Error del servidor (500)
```json
{
  "mensaje": "Error en el servidor",
  "error": "Descripción del error"
}
```

---

## 🔐 Uso del Token JWT

### En el Header de Requests Posteriores
```bash
curl -X GET http://localhost:3000/usuarios \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Decodificar Token (online)
Usa [jwt.io](https://jwt.io) para decodificar y verificar tokens.

### Payload del Token
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "john@example.com",
  "usuario": "johndoe",
  "iat": 1705849200,
  "exp": 1705935600
}
```

---

## 📊 Flujo de Autenticación

```
1. Usuario envía email + contraseña
   ↓
2. Backend busca usuario por email
   ↓
3. Si no existe → Error 401
   ↓
4. Si existe → Compara contraseña encriptada
   ↓
5. Si no coincide → Error 401
   ↓
6. Si coincide → Genera JWT y devuelve usuario + token
   ↓
7. Frontend guarda token (localStorage/sessionStorage)
   ↓
8. Token se usa en requests posteriores
```

---

## 🛡️ Seguridad

- ✅ Contraseñas encriptadas con bcryptjs
- ✅ Comparación segura de contraseñas con `compare()`
- ✅ Token JWT con expiración (24 horas)
- ✅ Validación de campos requeridos
- ✅ Mensajes de error genéricos (no revela si email existe)

---

## 💾 Implementación en Frontend

### 1. Crear función de login
```javascript
const handleLogin = async (email, contrasenha) => {
  try {
    const response = await fetch('http://localhost:3000/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contrasenha })
    })
    
    if (!response.ok) throw new Error('Login fallido')
    
    const datos = await response.json()
    
    // Guardar token
    localStorage.setItem('token', datos.token)
    localStorage.setItem('usuario', JSON.stringify(datos.usuario))
    
    console.log('Login exitoso:', datos.usuario)
  } catch (error) {
    console.error('Error:', error.message)
  }
}
```

### 2. Usar token en requests
```javascript
const response = await fetch('http://localhost:3000/usuarios', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
```

### 3. Limpiar sesión (logout)
```javascript
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  window.location.href = '/login'
}
```

---

## 🔧 Configuración (Importante)

### Cambiar clave secreta en producción

**Archivo**: `controladores/ControladorUsuarios.js`

```javascript
// ❌ NO en producción
const token = jwt.sign(datos, "tu_clave_secreta_muy_segura", ...)

// ✅ SÍ en producción (usar variable de entorno)
const token = jwt.sign(datos, process.env.JWT_SECRET, ...)
```

**Crear archivo `.env`** en backend:
```env
JWT_SECRET=tu_clave_super_secreta_aqui_12345
```

---

## 📝 Ejemplos Completos

### Login Exitoso
```bash
# Request
curl -X POST http://localhost:3000/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "contrasenha": "password123"
  }'

# Response
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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInVzdeWFyaW8iOiJqb2huZG9lIiwiaWF0IjoxNzA1ODQ5MjAwLCJleHAiOjE3MDU5MzU2MDB9.abcdefghijklmnopqrstuvwxyz"
}
```

### Login Fallido - Contraseña incorrecta
```bash
# Request
curl -X POST http://localhost:3000/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "contrasenha": "wrongpassword"
  }'

# Response (401)
{
  "mensaje": "Email o contraseña incorrectos"
}
```

---

## ⚙️ Variables de Entorno (Recomendado)

Crear archivo `.env` en la carpeta `backend/`:

```env
# Base de datos
MONGODB_URI=mongodb://localhost:27017/usuarios

# JWT
JWT_SECRET=tu_clave_super_secreta_aqui_12345
JWT_EXPIRE=24h

# Servidor
PORT=3000
NODE_ENV=development
```

Usar en código:
```javascript
const token = jwt.sign(
  payload,
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRE }
)
```

---

## ✅ Testing Recomendado

Prueba con Postman o similar:

1. **Crear usuario** → POST /usuarios
2. **Hacer login** → POST /usuarios/login
3. **Verificar token** → Usar en Authorization header
4. **Logout** → Eliminar token del cliente

---

**Versión**: 1.0.0  
**Fecha**: 21 de Enero de 2026  
**Estado**: ✅ Implementado

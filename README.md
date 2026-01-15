# Proyecto Full Stack - Gestión de Usuarios

Un proyecto Full Stack moderno que implementa un sistema de gestión de usuarios con autenticación segura, utilizando tecnologías actuales en frontend y backend.

## 🏗️ Arquitectura del Proyecto

El proyecto está dividido en dos directorios principales:

### **Backend** (`/backend`)
Servidor Node.js + Express con base de datos MongoDB

### **Frontend** (`/frontend`)
Interfaz de usuario construida con React + Vite

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución JavaScript
- **Express** - Framework web minimalista
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **bcryptjs** - Encriptación de contraseñas
- **JWT** - Autenticación basada en tokens
- **CORS** - Gestión de solicitudes entre dominios
- **dotenv** - Variables de entorno

### Frontend
- **React 19** - Librería de interfaz de usuario
- **Vite** - Herramienta de construcción y desarrollo rápida
- **ESLint** - Linter para código JavaScript/JSX
- **SWC** - Compilador rápido para JavaScript

---

## 📋 Requisitos Previos

- **Node.js** v16 o superior
- **npm** o **yarn**
- **MongoDB** ejecutándose localmente (`mongodb://localhost:27017`)

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd fs-1-tt-38
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env` en `/backend`:
```env
# Variables de entorno necesarias
# Personaliza según tu configuración
```

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
```

---

## 📁 Estructura de Directorios

```
fs-1-tt-38/
├── backend/
│   ├── config/
│   │   └── basedatos.js          # Configuración de MongoDB
│   ├── controladores/
│   │   └── ControladorUsuarios.js # Lógica de negocio de usuarios
│   ├── datos/
│   │   └── usuarios.js            # Datos de ejemplo
│   ├── modelos/
│   │   └── Usuario.js             # Esquema de Usuario (Mongoose)
│   ├── rutas/
│   │   └── usuariosRutas.js       # Rutas API REST
│   ├── servidor.js                # Punto de entrada del servidor
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/            # Componentes React
│   │   ├── assets/                # Imágenes y recursos
│   │   ├── App.jsx                # Componente principal
│   │   ├── App.css                # Estilos de App
│   │   ├── index.css              # Estilos globales
│   │   └── main.jsx               # Punto de entrada
│   ├── public/                    # Archivos estáticos
│   ├── index.html
│   ├── vite.config.js             # Configuración de Vite
│   ├── eslint.config.js           # Configuración de ESLint
│   ├── package.json
│   └── README.md
│
└── .gitignore
```

---

## 🔌 API REST - Endpoints

### Obtener todos los usuarios
```http
GET /usuarios
```

### Obtener usuario por posición
```http
GET /usuarios/:posicion
```

### Crear nuevo usuario
```http
POST /usuarios
Content-Type: application/json

{
  "usuario": "johndoe",
  "nombre": "John",
  "apellido": "Doe",
  "edad": 25,
  "email": "john@example.com",
  "contrasenha": "password123"
}
```

---

## ▶️ Ejecución del Proyecto

### Iniciar el Backend

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Iniciar el Frontend

En otra terminal:

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📦 Scripts Disponibles

### Backend
- `npm run dev` - Ejecuta el servidor con nodemon

### Frontend
- `npm run dev` - Servidor de desarrollo con HMR
- `npm run build` - Construir para producción
- `npm run lint` - Verificar código con ESLint
- `npm run preview` - Previsualizar build de producción

---

## 🔐 Seguridad

- Las contraseñas se encriptan con **bcryptjs** (10 rondas)
- Se utiliza **JWT** para autenticación
- **CORS** está habilitado para comunicación entre dominios
- Las contraseñas se procesan en el servidor, nunca en el cliente

---

## 📊 Modelo de Usuario

```javascript
{
  usuario: String (requerido, único),
  nombre: String (requerido),
  apellido: String (requerido),
  edad: Int32 (requerido),
  email: String (requerido, único, minúsculas),
  contrasenha: String (requerido, encriptada),
  timestamps: true (createdAt, updatedAt automáticos)
}
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

---

## ✉️ Contacto

Para preguntas o sugerencias, abre un issue en el repositorio.

---

**Última actualización:** 2024
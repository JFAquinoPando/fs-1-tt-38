# 🎉 Frontend - Consumo de API Backend

## ✅ Lo que se ha implementado

### 📱 **Componentes React**

1. **App.jsx** - Componente principal que:
   - Gestiona el estado global de usuarios
   - Realiza peticiones al backend
   - Maneja búsqueda, paginación y filtrado
   - Coordina las operaciones CRUD

2. **ListaUsuarios.jsx** - Contenedor de usuarios:
   - Muestra grid responsive de usuarios
   - Estados de carga y sin datos
   - Renderiza componentes UsuarioCard

3. **UsuarioCard.jsx** - Tarjeta individual:
   - Mostrar datos del usuario
   - Editar usuario inline
   - Eliminar usuario
   - Validación en edición

4. **FormularioUsuario.jsx** - Crear usuarios:
   - Validación de campos
   - Confirmación de edad mínima
   - Manejo de errores

### 🎨 **Estilos CSS**

- `App.css` - Estilos principales y layout
- `ListaUsuarios.css` - Grid y estados
- `UsuarioCard.css` - Tarjetas y edición
- `FormularioUsuario.css` - Formulario
- `index.css` - Estilos globales

### 🔧 **Configuración**

- `vite.config.js` - Proxy para CORS
- Componentes modularizados
- Separación de responsabilidades

## 🚀 **Cómo Usar**

### 1. **Instalar dependencias**
```bash
cd frontend
npm install
```

### 2. **Asegúrate que el backend está corriendo**
```bash
cd backend
npm run dev
# Servidor en http://localhost:3000
```

### 3. **Iniciar el frontend**
```bash
cd frontend
npm run dev
# Aplicación en http://localhost:5173
```

## 📋 **Funcionalidades Disponibles**

### ✨ Listar Usuarios
- Ver todos los usuarios en tarjetas
- Paginación automática (10 por página)
- Vista responsive

### 🔍 Buscar Usuarios
- Búsqueda por nombre o apellido
- Búsqueda case-insensitive
- Filtrado en tiempo real

### ➕ Crear Usuario
- Formulario validado
- Campos: usuario, nombre, apellido, edad, email, contraseña
- Validación de edad mínima (18 años)

### ✏️ Editar Usuario
- Edición inline desde la tarjeta
- Validación de datos
- Confirmación de cambios

### 🗑️ Eliminar Usuario
- Confirmación antes de eliminar
- Feedback inmediato

## 🎯 **Endpoints Consumidos**

```javascript
GET    /usuarios                    // Listar con paginación
GET    /usuarios/:posicion          // Obtener específico
POST   /usuarios                    // Crear
PUT    /usuarios/:posicion          // Actualizar
DELETE /usuarios/:posicion          // Eliminar
```

## 📊 **Parámetros de Query**

```
?search=nombre      // Buscar por nombre o apellido
?page=1            // Número de página
?limit=10          // Límite de resultados por página
```

## 🎨 **Diseño Responsivo**

- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1200px+)
- ✅ Ultra-wide (1920px+)

## 🌈 **Tema de Colores**

- **Gradiente Principal**: #667eea → #764ba2
- **Botones**: Blanco, Azul, Rojo, Verde, Gris
- **Sombras**: Suaves con blur progresivo

## 🔐 **Seguridad**

- Validación de formularios
- Confirmación en acciones destructivas
- Manejo de errores

## 📈 **Performance**

- Componentes optimizados
- Actualización selectiva de estado
- Lazy loading de datos

## 🐛 **Depuración**

Abre la consola del navegador (F12) para ver:
- Logs de peticiones
- Errores de validación
- Estados de carga

¡La aplicación está lista para usar! 🎊

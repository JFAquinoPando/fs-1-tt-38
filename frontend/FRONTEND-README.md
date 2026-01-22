# Frontend - Gestión de Usuarios

Interfaz moderna construida con React + Vite para consumir la API del backend.

## 🚀 Características

- ✅ Listar usuarios con paginación
- ✅ Buscar usuarios por nombre o apellido (case-insensitive)
- ✅ Crear nuevos usuarios
- ✅ Editar usuarios existentes
- ✅ Eliminar usuarios
- ✅ Interfaz responsive y moderna
- ✅ Validación de formularios
- ✅ Animaciones suaves

## 📦 Dependencias

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

## 🛠️ Instalación

```bash
npm install
```

## ▶️ Ejecución

### Modo Desarrollo
```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Construir para Producción
```bash
npm run build
```

### Previsualizar Build
```bash
npm run preview
```

## 📁 Estructura de Componentes

```
src/
├── components/
│   ├── FormularioUsuario.jsx     # Formulario para crear usuarios
│   ├── FormularioUsuario.css
│   ├── ListaUsuarios.jsx         # Contenedor de la lista de usuarios
│   ├── ListaUsuarios.css
│   ├── UsuarioCard.jsx           # Tarjeta individual de usuario
│   └── UsuarioCard.css
├── App.jsx                        # Componente principal
├── App.css
├── main.jsx
├── index.css
└── assets/
```

## 🔗 Integración con Backend

La aplicación se conecta al backend en `http://localhost:3000`.

### Endpoints utilizados:

- `GET /usuarios` - Obtener lista de usuarios (con paginación y búsqueda)
- `GET /usuarios/:posicion` - Obtener usuario específico
- `POST /usuarios` - Crear nuevo usuario
- `PUT /usuarios/:posicion` - Actualizar usuario
- `DELETE /usuarios/:posicion` - Eliminar usuario

### Parámetros de Búsqueda:

```bash
# Buscar por nombre o apellido
?search=juan

# Paginación
?page=1&limit=10

# Combinar filtros
?search=juan&page=1&limit=10
```

## 🎨 Diseño

- **Color Principal**: Gradiente #667eea a #764ba2
- **Responsive**: Optimizado para móvil, tablet y desktop
- **Animaciones**: Transiciones suaves en todos los elementos
- **Tipografía**: Sistema de fuentes nativas del sistema operativo

## ⚙️ Configuración de Vite

El archivo `vite.config.js` incluye configuración de proxy para evitar problemas de CORS:

```javascript
server: {
  proxy: {
    '/usuarios': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  }
}
```

## 🧪 Linting

```bash
npm run lint
```

## 📝 Ejemplo de Uso

### Crear Usuario
1. Click en "+ Nuevo Usuario"
2. Llenar el formulario con:
   - Nombre de usuario (único)
   - Nombre y apellido
   - Edad (mínimo 18)
   - Email (único)
   - Contraseña
3. Click en "✓ Crear Usuario"

### Buscar Usuarios
1. Escribir en la barra de búsqueda
2. Los resultados se filtran automáticamente

### Editar Usuario
1. Click en "✏️ Editar" en la tarjeta del usuario
2. Modificar los campos deseados
3. Click en "✓ Guardar"

### Eliminar Usuario
1. Click en "🗑️ Eliminar"
2. Confirmar la eliminación

## 🌐 Navegadores Soportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📞 Soporte

Para reportar problemas, abre un issue en el repositorio.

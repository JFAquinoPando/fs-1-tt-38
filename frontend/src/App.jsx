import { useState, useEffect } from 'react'
import './App.css'
import ListaUsuarios from './components/ListaUsuarios'
import FormularioUsuario from './components/FormularioUsuario'
import FormularioLogin from './components/FormularioLogin'
import UsuarioAutenticado from './components/UsuarioAutenticado'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null)
  const [token, setToken] = useState(null)

  const API_URL = 'http://localhost:3000/usuarios'

  // Verificar si hay sesión al cargar
  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token')
    const usuarioGuardado = localStorage.getItem('usuario')
    
    if (tokenGuardado && usuarioGuardado) {
      setToken(tokenGuardado)
      setUsuarioAutenticado(JSON.parse(usuarioGuardado))
    }
  }, [])

  // Obtener usuarios del backend
  const obtenerUsuarios = async () => {
    setCargando(true)
    setError(null)
    try {
      let url = `${API_URL}?page=${page}&limit=${limit}`
      if (search) url += `&search=${search}`
      
      const respuesta = await fetch(url, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      })
      if (!respuesta.ok) throw new Error('Error al obtener usuarios')
      const datos = await respuesta.json()
      setUsuarios(datos.usuariosEncontrados || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  // Manejar login exitoso
  const handleLoginExitoso = (usuario, tokenJWT) => {
    setUsuarioAutenticado(usuario)
    setToken(tokenJWT)
  }

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuarioAutenticado(null)
    setToken(null)
    setUsuarios([])
    setSearch('')
    setPage(1)
  }

  useEffect(() => {
    if (usuarioAutenticado) {
      const timer = setTimeout(() => {
        obtenerUsuarios()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [page, limit, search, usuarioAutenticado])

  // Crear usuario
  const handleCrearUsuario = async (nuevoUsuario) => {
    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      })
      if (!respuesta.ok) throw new Error('Error al crear usuario')
      setMostrarFormulario(false)
      setPage(1)
      obtenerUsuarios()
    } catch (err) {
      setError(err.message)
    }
  }

  // Actualizar usuario
  const handleActualizarUsuario = async (usuario, datosActualizados) => {
    try {
      const respuesta = await fetch(`${API_URL}/${usuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosActualizados)
      })
      if (!respuesta.ok) throw new Error('Error al actualizar usuario')
      obtenerUsuarios()
    } catch (err) {
      setError(err.message)
    }
  }

  // Eliminar usuario
  const handleEliminarUsuario = async (usuario) => {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${usuario}?`)) {
      try {
        const respuesta = await fetch(`${API_URL}/${usuario}`, {
          method: 'DELETE'
        })
        if (!respuesta.ok) throw new Error('Error al eliminar usuario')
        obtenerUsuarios()
      } catch (err) {
        setError(err.message)
      }
    }
  }

  const handleResultados = (e) => {
    setLimit(e.target.value)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔐 Gestión de Usuarios</h1>
        <p>Aplicación Full Stack para administrar usuarios</p>
      </header>

      {!usuarioAutenticado ? (
        <FormularioLogin onLoginExitoso={handleLoginExitoso} />
      ) : (
        <>
          <UsuarioAutenticado usuario={usuarioAutenticado} onLogout={handleLogout} />

          {error && <div className="error-message">{error}</div>}

          <div className="controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar por nombre o apellido..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="search-input"
              />
            </div>

            <button 
              className="btn btn-primary"
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
            >
              {mostrarFormulario ? '✕ Cancelar' : '+ Nuevo Usuario'}
            </button>
          </div>

          {mostrarFormulario && (
            <FormularioUsuario 
              onSubmit={handleCrearUsuario}
              onCancel={() => setMostrarFormulario(false)}
            />
          )}

          <ListaUsuarios
            usuarios={usuarios}
            cargando={cargando}
            onActualizar={handleActualizarUsuario}
            onEliminar={handleEliminarUsuario}
          />

          <div className="pagination">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn btn-small"
            >
              ← Anterior
            </button>
            <span>Página {page}</span>
            <button 
              onClick={() => setPage(p => p + 1)}
              className="btn btn-small"
            >
              Siguiente →
            </button>
          </div>

          <div className="resultados-container">
            <label htmlFor="resultados">Resultados por página:</label>
            <select id="resultados" onChange={handleResultados} value={limit}>
              <option value="5">5 resultados</option>
              <option value="10">10 resultados</option>
              <option value="15">15 resultados</option>
            </select>
          </div>
        </>
      )}
    </div>
  )
}

export default App

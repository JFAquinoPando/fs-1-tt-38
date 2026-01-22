import { useState } from 'react'
import './UsuarioCard.css'

export default function UsuarioCard({ usuario, onActualizar, onEliminar }) {
  const [editando, setEditando] = useState(false)
  const [datosEditados, setDatosEditados] = useState(usuario)

  const handleGuardar = () => {
    onActualizar(usuario.usuario, {
      nombre: datosEditados.nombre,
      apellido: datosEditados.apellido,
      edad: datosEditados.edad,
      email: datosEditados.email
    })
    setEditando(false)
  }

  const handleCancelar = () => {
    setDatosEditados(usuario)
    setEditando(false)
  }

  return (
    <div className="usuario-card">
      {editando ? (
        <div className="formulario-edicion">
          <input
            type="text"
            value={datosEditados.nombre}
            onChange={(e) => setDatosEditados({ ...datosEditados, nombre: e.target.value })}
            placeholder="Nombre"
            className="input-edit"
          />
          <input
            type="text"
            value={datosEditados.apellido}
            onChange={(e) => setDatosEditados({ ...datosEditados, apellido: e.target.value })}
            placeholder="Apellido"
            className="input-edit"
          />
          <input
            type="number"
            value={datosEditados.edad}
            onChange={(e) => setDatosEditados({ ...datosEditados, edad: e.target.value })}
            placeholder="Edad"
            className="input-edit"
          />
          <input
            type="email"
            value={datosEditados.email}
            onChange={(e) => setDatosEditados({ ...datosEditados, email: e.target.value })}
            placeholder="Email"
            className="input-edit"
          />
          <div className="botones-edicion">
            <button onClick={handleGuardar} className="btn btn-guardar">✓ Guardar</button>
            <button onClick={handleCancelar} className="btn btn-cancelar">✕ Cancelar</button>
          </div>
        </div>
      ) : (
        <div className="usuario-info">
          <div className="usuario-header">
            <h3>{usuario.nombre} {usuario.apellido}</h3>
            <span className="usuario-badge">@{usuario.usuario}</span>
          </div>
          <div className="usuario-detalles">
            <p><strong>📧 Email:</strong> {usuario.email}</p>
            <p><strong>🎂 Edad:</strong> {usuario.edad} años</p>
            <p><strong>📅 Registro:</strong> {new Date(usuario.createdAt).toLocaleDateString('es-ES')}</p>
          </div>
          <div className="botones-accion">
            <button 
              onClick={() => setEditando(true)}
              className="btn btn-editar"
            >
              ✏️ Editar
            </button>
            <button 
              onClick={() => onEliminar(usuario.usuario)}
              className="btn btn-eliminar"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

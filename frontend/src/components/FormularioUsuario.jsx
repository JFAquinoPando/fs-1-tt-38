import { useState } from 'react'
import './FormularioUsuario.css'

export default function FormularioUsuario({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    usuario: '',
    nombre: '',
    apellido: '',
    edad: '',
    email: '',
    contrasenha: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Validación básica
    if (!formData.usuario || !formData.nombre || !formData.apellido || !formData.edad || !formData.email || !formData.contrasenha) {
      setError('Todos los campos son requeridos')
      return
    }

    if (formData.edad < 18) {
      setError('La edad debe ser mayor a 18 años')
      return
    }

    onSubmit(formData)
    setFormData({
      usuario: '',
      nombre: '',
      apellido: '',
      edad: '',
      email: '',
      contrasenha: ''
    })
  }

  return (
    <div className="formulario-container">
      <form onSubmit={handleSubmit} className="formulario">
        <h2>Crear Nuevo Usuario</h2>
        
        {error && <div className="error-form">{error}</div>}

        <div className="form-group">
          <label htmlFor="usuario">Nombre de Usuario *</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            placeholder="johndoe"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="John"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido *</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="edad">Edad *</label>
            <input
              type="number"
              id="edad"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              placeholder="25"
              min="18"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="contrasenha">Contraseña *</label>
          <input
            type="password"
            id="contrasenha"
            name="contrasenha"
            value={formData.contrasenha}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="form-botones">
          <button type="submit" className="btn btn-primary">✓ Crear Usuario</button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">✕ Cancelar</button>
        </div>
      </form>
    </div>
  )
}

import { useState } from 'react'
import './FormularioLogin.css'

export default function FormularioLogin({ onLoginExitoso }) {
  const [formData, setFormData] = useState({
    email: '',
    contrasenha: ''
  })

  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    // Validación básica
    if (!formData.email || !formData.contrasenha) {
      setError('Email y contraseña son requeridos')
      setCargando(false)
      return
    }

    try {
      const respuesta = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          contrasenha: formData.contrasenha
        })
      })

      if (!respuesta.ok) {
        const datos = await respuesta.json()
        throw new Error(datos.mensaje || 'Error al iniciar sesión')
      }

      const datos = await respuesta.json()

      // Guardar token en localStorage
      localStorage.setItem('token', datos.token)
      localStorage.setItem('usuario', JSON.stringify(datos.usuario))

      // Limpiar formulario
      setFormData({ email: '', contrasenha: '' })

      // Callback para notificar al padre
      onLoginExitoso(datos.usuario, datos.token)

    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="formulario-login">
        <h2>🔐 Iniciar Sesión</h2>

        {error && <div className="error-form">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contrasenha">Contraseña</label>
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

        <button 
          type="submit" 
          className="btn btn-login"
          disabled={cargando}
        >
          {cargando ? '⏳ Iniciando sesión...' : '✓ Iniciar Sesión'}
        </button>
      </form>
    </div>
  )
}

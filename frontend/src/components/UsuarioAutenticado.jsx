import './UsuarioAutenticado.css'

export default function UsuarioAutenticado({ usuario, onLogout }) {
  return (
    <div className="usuario-autenticado">
      <div className="usuario-info-autenticado">
        <span className="bienvenida">👤 Bienvenido, {usuario.nombre}!</span>
        <span className="usuario-email">{usuario.email}</span>
      </div>
      <button 
        onClick={onLogout}
        className="btn btn-logout"
      >
        🚪 Cerrar Sesión
      </button>
    </div>
  )
}

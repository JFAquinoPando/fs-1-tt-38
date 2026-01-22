import './ListaUsuarios.css'
import UsuarioCard from './UsuarioCard'

export default function ListaUsuarios({ usuarios, cargando, onActualizar, onEliminar }) {
  if (cargando) {
    return <div className="cargando">⏳ Cargando usuarios...</div>
  }

  if (!usuarios || usuarios.length === 0) {
    return <div className="sin-datos">📭 No hay usuarios registrados</div>
  }

  return (
    <div className="lista-usuarios">
      <div className="usuarios-grid">
        {usuarios.map((usuario) => (
          <UsuarioCard
            key={usuario._id}
            usuario={usuario}
            onActualizar={onActualizar}
            onEliminar={onEliminar}
          />
        ))}
      </div>
    </div>
  )
}

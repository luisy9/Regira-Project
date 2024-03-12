import { NavLink } from 'react-router-dom'

export const TargetProject = ({proyectoId,proyecto }) => {
    return (
        <>
            <NavLink to={'/proyecto/' + proyectoId}>
                <div className="py-2 px-4 border rounded-md w-62 h-40 cursor-pointer" key={proyectoId}>
                    <h1 className="text-bold">{proyecto.nombre}</h1>
                    <p>{proyecto.descripcion}</p>
                    <p>Todos los tiquets abiertos 0</p>
                </div>
            </NavLink>
        </>
    )
}

export default TargetProject

import { NavLink } from 'react-router-dom'

export const TargetProject = ({ proyectoId, proyecto }) => {
    console.log(proyecto)
    return (
        <NavLink to={'/proyecto/' + proyectoId}>
            <div className='border shadow-md rounded-md w-63 h-40 flex hover:shadow-xl hover:cursor-pointer'>
                <div className='bg-[#2681FF] rounded-l-md w-5 h-full'></div>
                <div className='w-full'>

                    <div className="py-2 px-4 cursor-pointer" key={proyectoId}>
                        <h1 className="text-bold">{proyecto.nombre}</h1>
                        <p>{proyecto.descripcion}</p>
                        <p>Todos los tiquets abiertos 0</p>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default TargetProject

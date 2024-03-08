import { useState, useContext } from 'react';
import { contextRegira } from '../context';

export const NewTarea = () => {
    let url = 'http://localhost:3000/api';
    const { logued, setLogued } = useContext(contextRegira);

    const [prioridad, setPrioridad] = useState('');
    const [data, setData] = useState(
        {
            tipo: '',
            titulo: '',
            descripcion: 0,
            prioridad: null,
            estado: null,
            proyecto_id: null,
            usuarios_id: null,
            author_id: null,
        }
    );

    const onSubmitForm = () => {
        event.preventDefault();

        const usuarios_id = logued;
        setData({ ...data, proyecto_id: 1 , usuarios_id, author_id: usuarios_id });
        const credentials = { data };

        const opcions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        };

        fetch(url + '/tarea', opcions)
            .then(res => res.json()).then(data => console.log(data)).catch(error => console.log(error));
    }

    return (
        <div className="bg-register-img flex justify-center items-center h-screen">
            <div className="w-96 py-10 border-2 rounded-md flex flex-col px-10 bg-white shadow-2xl">

                <h1 className="pt-7 text-center text-xl">Crea una Tarea</h1>
                <div className="py-0">
                    <form className="" action="" onSubmit={onSubmitForm}>
                        <div className="py-3">
                            {data.nombre}
                            <input type="text" placeholder="Introduce el tipo"
                                className="w-full rounded-md ring-1 ring-inset ring-gray-300 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0052CC]"
                                name="nombre" value={data.tipo} onChange={(event) => setData({ ...data, tipo: event.target.value })} />
                        </div>
                        <div className="py-3">
                            <input type="text" placeholder="Introduce la titulo"
                                className=" w-full rounded-md ring-1 ring-inset ring-gray-300 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0052CC]"
                                name="descripcion" value={data.titulo} onChange={() => setData({ ...data, titulo: event.target.value })} />
                        </div>

                        <div className="py-3">
                            <input type="text" placeholder="Introduce la descripcion"
                                className=" w-full rounded-md ring-1 ring-inset ring-gray-300 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0052CC]"
                                name="descripcion" value={data.descripcion} onChange={() => setData({ ...data, descripcion: event.target.value })} />
                        </div>

                        {/* <div className="py-3">
                            <input type="text" placeholder="Introduce la prioridad"
                                className=" w-full rounded-md ring-1 ring-inset ring-gray-300 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0052CC]"
                                name="descripcion" value={data.prioridad} onChange={() => setData({ ...data, prioridad: event.target.value })} />
                        </div> */}
                        <div className="py-3 flex">
                            <p>Prioridad: </p>
                            <select id='' className='max-w-auto' defaultValue="High" onChange={(event) => setData({...data, prioridad: event.target.value})}>
                                <option value={'High'}>High</option>
                                <option value={'Medium'}>Medium</option>
                                <option value={'Low'}>Low</option>
                            </select>
                        </div>

                        <div className="py-3 flex">
                            <p>Estado: </p>
                            <select id='' className='max-w-auto' defaultValue="to start" onChange={(event) => setData({...data, estado: event.target.value})}>
                                <option value={'to start'}>To Start</option>
                                <option value={'doign'}>Doing</option>
                                <option value={'finish'}>Finish</option>
                                <option value={'paused'}>Paused</option>
                            </select>
                        </div>

                        <div className="pt-3">
                            <button className="border-none rounded-md bg-[#0052CC] text-white w-full py-2 hover:bg-blue-500">Continuar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewTarea

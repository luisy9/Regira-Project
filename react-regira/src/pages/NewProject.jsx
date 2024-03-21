import { useState, useContext } from 'react';
import { contextRegira } from '../context';

export const NewProject = () => {
  let url = 'http://localhost:3000/api';
  const { logued, setLogued } = useContext(contextRegira);

  const [data, setData] = useState(
    {
      nombre: '',
      descripcion: '',
      active: 0,
      usuarios_id: null,
    }
  );

  const onSubmitForm = () => {
    event.preventDefault();
    
    const usuarios_id = logued;
    setData({ ...data, usuarios_id });
    const credentials = { data };

    const opcions = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    };

    fetch(url + '/proyecto', opcions)
      .then(res => res.json()).then(data => console.log(data)).catch(error => console.log(error));
  }

  return (
    // <div className='w-screen'>
      <div className="bg-register-img flex justify-center items-center">
        <div className="w-96 py-10 border-2 rounded-md flex flex-col px-10 bg-white shadow-2xl">

          <h1 className="pt-7 text-center text-xl">Crea un Proyecto</h1>
          <div className="py-0">
            <form className="" action="" onSubmit={onSubmitForm}>
              <div className="py-3">
                {data.nombre}
                <input type="text" placeholder="Introduce el nombre"
                  className=" w-full rounded-md ring-1 ring-inset ring-gray-300 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0052CC]"
                  name="nombre" value={data.nombre} onChange={(event) => setData({ ...data, nombre: event.target.value })} />
              </div>
              <div className="py-3">
                <input type="text" placeholder="Introduce la descripcion"
                  className=" w-full rounded-md ring-1 ring-inset ring-gray-300 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0052CC]"
                  name="descripcion" value={data.descripcion} onChange={() => setData({ ...data, descripcion: event.target.value })} />
              </div>
              <h1 className='text-start py-1'>Esta activo?</h1>
              <div className='flex pb-1'>
                <label htmlFor="">
                  {'Activo '}
                  <input type="checkbox" placeholder="Int"
                    className=""
                    checked={data.active === 1}
                    name="active" value={data.active} onChange={() => setData({ ...data, active: 1 })} />
                </label>
                <label htmlFor="" className='px-10'>
                  {'No Activo '}
                  <input type="checkbox" placeholder="Int"
                    className=""
                    checked={data.active === 0}
                    name="active" value={data.active} onChange={() => setData({ ...data, active: 0 })} />
                </label>
              </div>


              <div className="pt-3">
                <button className="border-none rounded-md bg-[#0052CC] text-white w-full py-2 hover:bg-blue-500">Continuar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    // </div>

  )
}

export default NewProject

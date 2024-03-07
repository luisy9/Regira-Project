import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    let url = 'http://localhost:3000/api';

    const onSubmitForm = () => {
        event.preventDefault();

        const data = JSON.stringify({ email, password })
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        }

        fetch(url + '/login', options)
            .then(response => response.json())
            .then(data => console.log(data), navigate('/'))
            .catch(error => console.error('Error:', error));

    }

    return (
        <div className="w-screen">
            <div className="bg-register-img flex justify-center items-center h-screen">
                <div className="w-96 py-10 border-2 rounded-md flex flex-col px-10 bg-white shadow-2xl">
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" className="w-10 h-10">
                            <defs>
                                <linearGradient x1="99.7%" y1="15.8%" x2="39.8%" y2="97.4%" id="a">
                                    <stop stop-color="#0052CC" offset="0%" />
                                    <stop stop-color="#2684FF" offset="92.3%" />
                                </linearGradient>
                            </defs>
                            <path d="M76 118c-4-4-10-4-13 1L1 245a7 7 0 0 0 6 10h88c3 0 5-1 6-4 19-39 8-98-25-133Z" fill="url(#a)" />
                            <path d="M122 4c-35 56-33 117-10 163l42 84c1 3 4 4 7 4h87a7 7 0 0 0 7-10L134 4c-2-5-9-5-12 0Z" fill="#2681FF" />
                        </svg>
                        <h1 className="pl-1 text-4xl">Regira</h1>
                    </div>

                    <h1 className="pt-7 text-center text-xl">Inicia session para continuar</h1>
                    <div className="py-0">
                        <form className="" action="" onSubmit={onSubmitForm}>
                            <div className="py-4">
                                <input type="email" placeholder="Introduce tu email" className=" w-full rounded-md ring-1 ring-inset ring-gray-300 px-1 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0052CC]" name="email" value={email} onChange={() => setEmail(event.target.value)} />
                            </div>
                            <div className="py-4">
                                <input type="password" placeholder="Introduce tu password" className=" w-full ring-1 ring-inset ring-gray-300 py-2 px-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0052CC]" name="password" value={password} onChange={() => setPassword(event.target.value)} />
                            </div>
                            <div className="pt-3">
                                <button className="border-none rounded-md bg-[#0052CC] text-white w-full py-2 hover:bg-blue-500">Continuar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

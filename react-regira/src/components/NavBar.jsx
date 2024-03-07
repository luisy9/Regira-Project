import { NavLink } from 'react-router-dom'

export const NavBar = () => {
    return (
        <nav className=" bg-[#FFFFFF] py-6 w-screen relative">
            <div className="px-5 w-screen flex">
                <div className="pr-10">
                    <div className="flex items-end text-2xl">
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


                </div>

                <div className="flex items-end text-lg flex-grow justify-between h-10">
                    <div className="">
                        <button className="mx-5 hover:bg-[#bdbec2] hover:border-none rounded-md px-5"><a href="" className="text-[#1E77FF]">Inicio</a></button>
                        <button className="mx-5 hover:bg-[#bdbec2] hover:border-none rounded-md px-5"><a href="" className=" text-[#1E77FF]">Proyectos</a></button>
                    </div>
                    <div className="">
                        <NavLink to='/register'><button className="border mx-10 px-6 py-0.5 rounded-md bg-[#1E77FF] text-white hover:bg-[#487eeb]"><a href="" className="">Register</a></button></NavLink>
                        <NavLink to='login'>Login</NavLink>
                    </div>
                </div>

            </div>

        </nav>
    )
}

export default NavBar

import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';
import { contextRegira } from '../context';
import { LoginPage } from '../pages';
import { useContext } from 'react';

export const LayoutPage = () => {

    const { logout } = useContext(contextRegira);

    return (
        <>
            <div className='flex flex-col h-screen' >
                <header>
                    <NavBar />
                </header>
                <div className='flex flex-grow px-5' id='detail'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default LayoutPage;
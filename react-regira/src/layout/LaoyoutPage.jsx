import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';

export const LayoutPage = () => {

    return (
        <div className='flex flex-col h-screen'>
            <header>
                <NavBar />
            </header>
            <div className='flex flex-grow' id='detail'>
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutPage

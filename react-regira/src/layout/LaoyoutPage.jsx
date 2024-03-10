import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';

export const LayoutPage = () => {

    return (
        <div className='h-screen'>
            <header>
                <NavBar />
            </header>
            <div className="container mx-auto mx-w-xl h-4/5" id='detail'>
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutPage

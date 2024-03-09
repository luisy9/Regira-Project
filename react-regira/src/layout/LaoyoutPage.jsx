import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';

export const LayoutPage = () => {

    return (
        <div className=''>
            <header>
                <NavBar />
            </header>
            <div className="container mx-auto mx-w-xl" id='detail'>
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutPage

import { Outlet } from 'react-router-dom';
// import { AppRegira } from '../AppRegira';
import { NavBar } from '../components';

export const LayoutPage = () => {
    return (
        <div className=''>
            <header>
                <NavBar />
            </header>
            <div className="" id='detail'>
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutPage

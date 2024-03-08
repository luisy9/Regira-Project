import { Outlet, Route } from 'react-router-dom';
import { NavBar } from '../components';
// import { MiContextoProvider } from '../context'

export const LayoutPage = () => {

    return (
        // <MiContextoProvider>
            <div className=''>
                <header>
                    <NavBar />
                </header>
                <div className="" id='detail'>
                    <Outlet />
                </div>
            </div>
        // </MiContextoProvider>
    )
}

export default LayoutPage

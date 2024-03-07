import { AppRegira } from '../AppRegira';
import { NavBar } from '../components';

export const LayoutPage = () => {
    return (
        <div className=''>
            <header>
                <NavBar />
            </header>
            <div className="">
                <AppRegira />
            </div>
        </div>
    )
}

export default LayoutPage

import React, { ReactNode } from 'react';
import Navbar from '../navbar/Navbar';
import { useAppDispatch } from '../../network/hooks';
import { resetUser } from '../../reducers/private/user/userSlice';
import { logout } from '../../reducers/auth/authSlice';
import { Link } from 'react-router-dom';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const dispatch = useAppDispatch();

    function logoutUser() {
        dispatch(logout())
        window.location.href = '/auth/login';
        setTimeout(() => { dispatch(resetUser()); }, 3000)
    }
    return (
        <div>
            <div className='fixed top-0 left-0 w-full bg-[#060226] '>
                <div className='max-w-[1220px] s-767:px-[80px] px-[16px] mx-auto py-4 flex items-center justify-between'>
                    <Link to="/"><div className=' text-[24px] font-bold'>NotesApp</div></Link>
                    <button className='font-medium' onClick={() => logoutUser()}>Logout</button>
                </div>
            </div>
            <div className='s-480:pt-[100px] pt-[73px] pb-[100px] '>
                {children}
            </div>
            <Navbar />
        </div>
    );
};

export default Layout;

import React, { ReactNode } from 'react';
import Navbar from '../navbar/Navbar';
import { useAppDispatch } from '../../network/hooks';
import { resetUser } from '../../reducers/private/user/userSlice';
import { logout } from '../../reducers/auth/authSlice';


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
            <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
                <div className=' text-[24px] font-bold'>NotesApp</div>
                <button onClick={() => logoutUser()}>Logout</button>
            </div>
            {children}
            <Navbar />
        </div>
    );
};

export default Layout;

import React, { ReactNode } from 'react';
import Navbar from '../navbar/Navbar';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <div className='py-4 border-b border-gray-200 text-[20px] font-bold'>NotesApp</div>
            {children}
            <Navbar />
        </div>
    );
};

export default Layout;

import React, { ReactNode } from 'react';
import Navbar from '../navbar/Navbar';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <div>Logo</div>
            {children}
            <Navbar />
        </div>
    );
};

export default Layout;

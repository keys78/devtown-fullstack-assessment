
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../network/hooks";

interface Props {
    Component: any
}

const PrivateRoute = ({ Component }:Props ) => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('ntp-token') : null;
    const token2 = JSON.parse(storedToken as string);
    const { user } = useAppSelector(state => state.user);
    const isAuthenticated = token2 !== null && user.username !== null;


    return isAuthenticated ? (
        <Component />
    ) : (
        <Navigate to={'/auth/login'} replace />
    );
};

export default PrivateRoute;

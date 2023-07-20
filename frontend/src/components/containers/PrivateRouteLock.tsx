
// import { Navigate } from "react-router-dom";
// import { useAppSelector } from "../../network/hooks";


// const PrivateRoute = ({ Component }) => {
//     const storedToken = typeof window !== 'undefined' ? localStorage.getItem('ent-token') : null;
//     const token2 = JSON.parse(storedToken as string);
//     const { user } = useAppSelector(state => state.user);
//     const { token } = useAppSelector(state => state.auth);
//     const isAuthenticated = token2 !== null && user?.username!== null;


//     return isAuthenticated ? (
//         <Component />
//     ) : (
//         <Navigate to={'/auth/login'} replace />
//     );
// };

// export default PrivateRoute;

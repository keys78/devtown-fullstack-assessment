import { ReactElement, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import Dashboard from "./pages/user/Dashboard";
import PersonalNotes from "./pages/user/PersonalNotes";
import SharedNotes from "./pages/user/SharedNotes";
import Layout from "./components/containers/Layout";
import NotesCatalog from "./pages/user/NotesCatalog";
import NoteDetails from "./pages/user/NoteDetails";
import PrivateRoute from "./components/containers/PrivateRouteLock";
import VerifyEmail from "./pages/user/VerifyEmail";
import { listenToNoteCreated } from "./reducers/private/notes/noteSlice";
import { io } from "socket.io-client";
import { useAppDispatch } from "./network/hooks";



interface RouteConfig {
  path: string;
  element: ReactElement;
}

function App() {
  const routes: RouteConfig[] = [
    { path: "/", element: <Dashboard /> },
    { path: "/personal", element: <PersonalNotes /> },
    { path: "/personal/catalog", element: <NotesCatalog /> },
    { path: "/shared", element: <SharedNotes /> },
    { path: "/shared/catalog", element: <NotesCatalog /> },
    { path: "/note/:noteId", element: <NoteDetails /> },

  ];
  
  const socket = io(import.meta.env.VITE_APP_BASE_API, { transports: ['websocket'] });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(listenToNoteCreated());
    return () => {
      socket.off('noteCreated');
    };
  }, [dispatch, socket]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/:id/verify/:token" element={<VerifyEmail />} />
          <Route
            path="/*"
            element={
              <PrivateRoute
                Component={() => (
                  <Routes>
                    {routes.map((val) =>
                      <Route path={val.path} element={<Layout>{val.element}</Layout>} />
                    )}
                  </Routes>
                )}
              />
            }
          />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </>

  )
}

export default App;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import Dashboard from './pages/user/Dashboard';

// const socket = io('http://localhost:4000', { transports: ['websocket'] });

// interface Note {
//   title: string;
//   note: string;
//   status: string;
//   createdBy: string;
// }

// function App() {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [newNote, setNewNote] = useState<Note>({
//     title: '',
//     note: '',
//     status: '',
//     createdBy: '',
//   });
//   const [isTyping, setIsTyping] = useState<boolean>(false);

//   useEffect(() => {
//     if (!socket) return;

//     axios.get('http://localhost:4000/api/v1/notes/get-notes').then((response) => {
//       setNotes(response.data);
//     });

//     socket.on('noteCreated', (newNote: Note) => {
//       setNotes((prevNotes) => [...prevNotes, newNote]);
//     });

//     socket.on('userTyping', () => {
//       setIsTyping(true);
//     });

//     socket.on('userNotTyping', () => {
//       setIsTyping(false);
//     });

//     return () => {
//       socket.off('noteCreated');
//     };
//   }, []);

//   const handleUserTyping = () => {
//     socket.emit('isTyping');
//     setTimeout(() => {
//       socket.emit('isNotTyping');
//     }, 1000);
//   };

//   const handleAddNote = (event: React.FormEvent) => {
//     event.preventDefault();

//     axios
//       .post('http://localhost:4000/api/v1/notes/create-note', newNote)
//       .then(() => {
//         setNewNote({
//           title: '',
//           note: '',
//           status: '',
//           createdBy: '',
//         });
//       })
//       .catch((error) => {
//         console.error('Error creating a new note:', error);
//       });
//   };

//   return (
//     <>
//     <Dashboard />
//       <div>
//         <ul>
//           {notes.map((note, index) => (
//             <li key={index}>{note.title} - {note.note} - {note.status} - {note.createdBy}</li>
//           ))}
//         </ul>
//       </div>

//       <form onSubmit={handleAddNote}>
//         <input
//         onKeyDown={handleUserTyping}
//           type="text"
//           value={newNote.title}
//           onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
//           placeholder="Enter title"
//         />
//         <input
//         onKeyDown={handleUserTyping}
//           type="text"
//           value={newNote.note}
//           onChange={(e) => setNewNote({ ...newNote, note: e.target.value })}
//           placeholder="Enter note"
//         />
//         <input
//         onKeyDown={handleUserTyping}
//           type="text"
//           value={newNote.status}
//           onChange={(e) => setNewNote({ ...newNote, status: e.target.value })}
//           placeholder="Enter status"
//         />
//         <input
//         onKeyDown={handleUserTyping}
//           type="text"
//           value={newNote.createdBy}
//           onChange={(e) => setNewNote({ ...newNote, createdBy: e.target.value })}
//           placeholder="Enter createdBy"
//         />
//         <button type="submit">Add Note</button>
//       </form>

//       <div>{isTyping && 'typing...'}</div>
//     </>
//   );
// }

// export default App;


import { ReactElement } from "react";
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
          <Route path="*" element={<div>Not foundedsda</div>} />
        </Routes>
      </Router>
    </>

  )
}

export default App;


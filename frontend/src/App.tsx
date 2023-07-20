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



interface RouteConfig {
  title: string;
  path: string;
  element: ReactElement;
}

function App() {
  const routes: RouteConfig[] = [
    // { path: "account", title: 'Account', element: <Accounts /> },

  ];
  const adminRoutes: RouteConfig[] = [
    // { path: "manage-products", title: 'Mananage Produts', element: <ManageProducts /> }
  ];


  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/user/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/user/dashboard/personal" element={<Layout><PersonalNotes /></Layout>} />
          <Route path="/user/dashboard/personal/catalog" element={<Layout><NotesCatalog /></Layout>} />
          <Route path="/user/dashboard/shared" element={<Layout><SharedNotes /></Layout>} />
          <Route path="/user/dashboard/shared/catalog" element={<Layout><NotesCatalog /></Layout>} />
          <Route path="/user/note/:noteId" element={<Layout><NoteDetails /></Layout>} />

          <Route path="*" element={<div>Not foundedsda</div>} />
        </Routes>
      </Router>
    </>

  )
}

export default App;


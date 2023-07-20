import { PlusCircle, User, WindowsLogo } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import NoteForm from '../modal/NoteForm';
import { useState } from 'react';
import Modal from '../modal/Modal';

const Navbar = () => {
    const navigate = useNavigate();
    const [isNoteForm, setIsNoteForm] = useState<boolean>(false)

    return (
        <>
            <nav className=' fixed bottom-5 w-full max-w-[70%]'>
                <section className='flex items-center justify-between max-w-[400px] mx-auto backdrop-blur bg-white bg-opacity-50 px-8 py-2 rounded-[10px]'>
                    <div onClick={() => navigate('/user/dashboard')} className='cursor-pointer flex flex-col items-center'>
                        <WindowsLogo size={28} color="#3f3f3f" />
                        <span>Home</span>
                    </div>
                    <div onClick={() => setIsNoteForm(!isNoteForm)} className='cursor-pointer flex flex-col items-center'>
                        <PlusCircle size={28} color="#3f3f3f" />
                        <span>Add Note</span>
                    </div>
                    <div onClick={() => navigate('/user/profile')} className='cursor-pointer flex flex-col items-center'>
                        <User size={28} color="#3f3f3f" />
                        <span>Profile</span>
                    </div>
                </section>
            </nav>
            <Modal setShowModal={setIsNoteForm} showModal={isNoteForm}>
                <NoteForm />
            </Modal>
        </>

    )
}

export default Navbar
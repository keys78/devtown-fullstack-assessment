import { PlusCircle, User, WindowsLogo } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import NoteForm from '../modal/NoteForm';
import { useEffect, useState } from 'react';
import Modal from '../modal/Modal';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { getUser } from '../../reducers/private/user/userSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const [isNoteForm, setIsNoteForm] = useState<boolean>(false)
    const [isProfile, setIsProfile] = useState<boolean>(false)
    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [])

    return (
        <>
            <nav className=' fixed bottom-5 w-full s-767:max-w-[70%] max-w-[91%]'>
                <section className='flex items-center justify-between max-w-[400px] mx-auto backdrop-blur bg-white bg-opacity-50 px-8 py-2 rounded-[10px]'>
                    <div onClick={() => navigate('/')} className='cursor-pointer flex flex-col items-center'>
                        <WindowsLogo size={28} color="#3f3f3f" />
                        <span>Home</span>
                    </div>
                    <div onClick={() => setIsNoteForm(!isNoteForm)} className='cursor-pointer flex flex-col items-center'>
                        <PlusCircle size={28} color="#3f3f3f" />
                        <span>Add Note</span>
                    </div>
                    <div onClick={() => setIsProfile(!isProfile)} className='cursor-pointer flex flex-col items-center'>
                        <User size={28} color="#3f3f3f" />
                        <span>Profile</span>
                    </div>
                </section>
            </nav>
            <Modal setShowModal={setIsNoteForm} showModal={isNoteForm}>
                <NoteForm />
            </Modal>
            <Modal setShowModal={setIsProfile} showModal={isProfile}>
                <div>
                    <p>{user?.username}</p>
                    <p>{user?.email}</p>
                    <p>{user?.createdAt as string}</p>
                </div>
            </Modal>
        </>

    )
}

export default Navbar
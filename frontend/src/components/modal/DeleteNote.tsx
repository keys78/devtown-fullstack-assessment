import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../network/hooks"
import { Note, deleteNote, getPersonalNotes, getSharedNotes } from "../../reducers/private/notes/noteSlice";
import { TrashSimple } from "phosphor-react";

interface Props {
    setIsDeleteNote: any,
    note: Note,
    noteId: string | undefined
}

const DeleteNote = ({ setIsDeleteNote, noteId, note }: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, isSuccess } = useAppSelector(state => state.note)

    const deleteNoteAction = () => {
        dispatch(deleteNote({ noteId: noteId }))
        setIsDeleteNote(false)
        isLoading && dispatch(getSharedNotes());
        isLoading && dispatch(getPersonalNotes());
        isSuccess && setTimeout(() => { navigate(-1) }, 2000)
    }

    return (
        <div className="space-y-6 w-full mx-auto rounded-md ">
            <h1 className="text-red-500 font-bold text-[16px]">Delete this Note?</h1>
            <p className="text-[13px] text-white">Are you sure you want to delete the &apos;{note?.title}&apos;? This action cannot be reversed.</p>
            <div className="flex gap-4">
                <button
                    onClick={deleteNoteAction}
                    className="bg-red-500 text-white text-[13px] w-[200px] rounded-[5px]" type="submit">
                    {isLoading ?
                        <span className='flex items-center justify-center text-white'> Deleting... </span>
                        :
                        <span className='flex items-center justify-center'> <TrashSimple size={16} color="#fff" weight='bold' /> &nbsp;&nbsp; Delete   </span>
                    }
                </button>
                <button onClick={() => setIsDeleteNote(false)} className="gen-btn-class w-[200px] bg-black text-white text-[13px] rounded-[5px] p-2 transition duration-200 gen-btn-class"  >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default DeleteNote
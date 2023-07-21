import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { deleteNote, getNote, getPersonalNotes, getSharedNotes } from '../../reducers/private/notes/noteSlice';
import DOMPurify from 'dompurify';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, TrashSimple } from 'phosphor-react';
import moment from 'moment';
import Modal from '../../components/modal/Modal';
import UpdateNote from '../../components/modal/UpdateNote';

const NoteDetails = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const dispatch = useAppDispatch();
  const { note, isLoading } = useAppSelector((state) => state.note);
  const navigate = useNavigate();
  const WHITELISTED_TAGS = ['a', 'b', 'i', 'p', 'u', 'ol', 'ul', 'li', 'strong', 'em'];
  const [isDeleteNote, setIsDeleteNote] = useState<boolean>(false)
  const [isUpdateNote, setIsUpdateNote] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getNote(noteId));
  }, [dispatch, noteId]);

  const sanitizeHTML = (html: string) => {
    const cleanHTML = DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: WHITELISTED_TAGS,
      ALLOWED_ATTR: ['style', 'href'],
    });
    return { __html: cleanHTML };
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!note) {
    return <div>Note not found</div>; 
  }

  const deleteNoteAction = () => {
    dispatch(deleteNote({noteId: noteId}))
    isLoading && setIsDeleteNote(false)
    isLoading && dispatch(getSharedNotes());
    isLoading && dispatch(getPersonalNotes());
    navigate(-1)
}

  return (
    <div>
      <div className='flex items-center justify-between pb-4'>
        <button className='flex items-center' onClick={() => navigate(-1)}><ArrowLeft weight='bold' size={16} color="#ececec" />&nbsp;&nbsp;Back</button>
        <div>
          <button onClick={() => setIsUpdateNote(!isUpdateNote)} className='border-0 px-4 py-1 rounded-[5px] bg-[#180540] text-white'>Update</button> &nbsp;
          <button onClick={() => setIsDeleteNote(!isDeleteNote)} className='border-0 px-4 py-1 rounded-[5px] bg-red-700 text-white'>Delete</button>
        </div>
      </div>
      <div>
        <h4 className='text-[30px]'>{note?.title}</h4>
        <h6 className=' pb-4 italic text-[12px]'>{moment(note?.createdAt).startOf('seconds').fromNow()}</h6>
        <div dangerouslySetInnerHTML={sanitizeHTML(note?.note)} />
        <div className='flex items-center justify-between border-t border-gray-50 mt-4 py-4'>
          <div>Author: {note?.author?.username}</div>
          <div className='flex space-x-2'>{note?.tags?.map((tag: any) => <span className='shadow p-1 text-[12px] rounded bg-[#0e032a]'>{tag}</span>)}</div>
        </div>
      </div>
      <Modal setShowModal={setIsDeleteNote} showModal={isDeleteNote}>
      <div className="space-y-6 w-full mx-auto rounded-md ">
            <h1 className="text-red-500 font-bold text-[16px]">Delete this Note?</h1>
            <p className="text-[13px] text-black">Are you sure you want to delete the &apos;{note?.title}&apos;? This action cannot be reversed.</p>
            <div className="flex gap-4">
                <button
                    onClick={deleteNoteAction}
                    className="bg-red-500 text-white text-[13px] w-[200px] rounded-[5px]" type="submit">
                    {isLoading ?
                        <span className='flex items-center justify-center'> Deleting... </span>
                        :
                        <span className='flex items-center justify-center'> <TrashSimple size={16} color="#fff" weight='bold' /> &nbsp;&nbsp; Delete   </span>
                    }
                </button>
                <button onClick={() => setIsDeleteNote(false)} className="gen-btn-class w-[200px] bg-black text-white text-[13px] rounded-[5px] p-2 transition duration-200 gen-btn-class"  >
                    Cancel
                </button>
            </div>
        </div>
      </Modal>
      <Modal setShowModal={setIsUpdateNote} showModal={isUpdateNote}>
       <UpdateNote note={note}/>
      </Modal>
    </div>
  );
};

export default NoteDetails;

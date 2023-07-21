import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { getNote } from '../../reducers/private/notes/noteSlice';
import DOMPurify from 'dompurify';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import moment from 'moment';
import Modal from '../../components/modal/Modal';
import UpdateNote from '../../components/modal/UpdateNote';
import DeleteNote from '../../components/modal/DeleteNote';
import Loader from '../../components/shared/Loadr';

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
    return <div className='flex items-center justify-center s-480:h-[400px] h-[200px]'><Loader /></div>

  }

  if (!note) {
    return <div>Note not found</div>;
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
        <h4 className='s-767:text-[30px] text-[18px]'>{note?.title}</h4>
        <h6 className=' pb-4 italic s-767:text-[12px] text-[10px]'>{moment(note?.createdAt).startOf('seconds').fromNow()}</h6>
        <div className='s-767:text-[16px] text-[14px]' dangerouslySetInnerHTML={sanitizeHTML(note?.note)} />
        <div className='flex items-center justify-between border-t border-gray-50 mt-4 py-4'>
          <div>Author: {note?.author?.username}</div>
          <div className='flex space-x-2'>{note?.tags?.map((tag: any) => <span className='shadow p-1 text-[12px] rounded bg-[#0e032a]'>{tag}</span>)}</div>
        </div>
      </div>
      <Modal setShowModal={setIsDeleteNote} showModal={isDeleteNote}>
       <DeleteNote setIsDeleteNote={setIsDeleteNote} note={note} noteId={noteId}/>
      </Modal>
      <Modal setShowModal={setIsUpdateNote} showModal={isUpdateNote}>
        <UpdateNote note={note} />
      </Modal>
    </div>
  );
};

export default NoteDetails;

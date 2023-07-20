import { FolderNotch } from 'phosphor-react';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import NoteForm from '../../components/modal/NoteForm';
import { useAppSelector } from '../../network/hooks';
import DOMPurify from 'dompurify';
import { useEffect } from 'react';
import { Note, getPersonalNotes, getSharedNotes } from '../../reducers/private/notes/noteSlice';
import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';

const Dashboard = () => {
  const navigate = useNavigate();
  const { notes } = useAppSelector((state) => state.note)
  // const WHITELISTED_TAGS = ['a', 'b', 'i', 'p', 'u', 'ol', 'ul', 'li', 'strong', 'em'];

  // useEffect(() => {
  //   dispatch(getPersonalNotes());
  // }, []);

  // useEffect(() => {
  //   dispatch(getSharedNotes());
  // }, []);


  // const sanitizeHTML = (html: string) => {
  //   const cleanHTML = DOMPurify.sanitize(html, {
  //     USE_PROFILES: { html: true },
  //     ALLOWED_TAGS: WHITELISTED_TAGS,
  //     ALLOWED_ATTR: ['style', 'href'],
  //   });
  //   return { __html: cleanHTML };
  // };


  return (
    <div>
      <div className='flex items-center justify-center space-x-4 py-12'>
        <div onClick={() => navigate('/user/dashboard/personal')} className='bg-[#02162e] shadow w-full rounded-[10px] px-4 py-12 cursor-pointer'>
          <FolderNotch size={40} color="#e0e0e0" />
          Personal
        </div>
        <div onClick={() => navigate('/user/dashboard/shared')} className='bg-[#02162e] shadow w-full rounded-[10px] px-4 py-12 cursor-pointer'>
          <FolderNotch size={40} color="#e0e0e0" />
          Shared
        </div>
      </div>

      {/* {notes.map((val) => 
          <div  key={val?._id}>
            <div className='border border-white mb-[20px]'>
              <h4>{val?.title}</h4>
              <h4>CATEGORY::::::::::::::::::{val?.category}</h4>
              <div dangerouslySetInnerHTML={sanitizeHTML(val?.note)} />
            </div>
          </div>
        )} */}

      <Navbar />
      {/* <NoteForm /> */}
    </div>
  );
};

export default Dashboard;
function dispatch(arg0: AsyncThunkAction<Note[], void, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown; }>) {
  throw new Error('Function not implemented.');
}


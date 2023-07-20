// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../../network/hooks';
// import { getSharedNotes, getPersonalNotes } from '../../reducers/private/notes/noteSlice';
// import DOMPurify from 'dompurify';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const NotesCatalog = () => {
//   const { notes } = useAppSelector((state) => state.note);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const WHITELISTED_TAGS = ['a', 'b', 'i', 'p', 'u', 'ol', 'ul', 'li', 'strong', 'em'];

//   useEffect(() => {
//     // Check if the current location contains 'shared' in the pathname
//     const isSharedPage = location.pathname.includes('shared');

//     // Dispatch the appropriate action based on whether it's a shared page or personal page
//     if (isSharedPage) {
//       dispatch(getSharedNotes());
//     } else {
//       dispatch(getPersonalNotes());
//     }
//   }, [dispatch, location.pathname]);

//   const sanitizeHTML = (html: string) => {
//     const cleanHTML = DOMPurify.sanitize(html, {
//       USE_PROFILES: { html: true },
//       ALLOWED_TAGS: WHITELISTED_TAGS,
//       ALLOWED_ATTR: ['style', 'href'],
//     });
//     return { __html: cleanHTML };
//   };

//   const queryParams = new URLSearchParams(window.location.search);
//   const categoryParam = queryParams.get('q')?.toLowerCase(); // Convert query param to lowercase

//   // Filter notes based on the category parameter
//   const filteredNotes = categoryParam
//     ? notes.filter((note) => note.category.toLowerCase() === categoryParam)
//     : notes;

//   return (
//     <div>
//       <button onClick={() => navigate(-1)}>Back</button>

//       {filteredNotes.map((val, i) => (
//         <Link to={`/user/note/${val?._id}`} key={i}>
//           <div className='border border-white mb-[20px]'>
//             <h4>{val?.title}</h4>
//             <h4>CATEGORY::::::::::::::::::{val?.category}</h4>
//             <div dangerouslySetInnerHTML={sanitizeHTML(val?.note)} />
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default NotesCatalog;






// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../../network/hooks';
// import { getSharedNotes, getPersonalNotes } from '../../reducers/private/notes/noteSlice';
// import DOMPurify from 'dompurify';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const NotesCatalog = () => {
//   const { notes } = useAppSelector((state) => state.note);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const WHITELISTED_TAGS = ['a', 'b', 'i', 'p', 'u', 'ol', 'ul', 'li', 'strong', 'em'];

//   useEffect(() => {
//     // Check if the current location contains 'shared' in the pathname
//     const isSharedPage = location.pathname.includes('shared');

//     // Dispatch the appropriate action based on whether it's a shared page or personal page
//     if (isSharedPage) {
//       dispatch(getSharedNotes());
//     } else {
//       dispatch(getPersonalNotes());
//     }
//   }, [dispatch, location.pathname]);

//   const sanitizeHTML = (html: string) => {
//     const cleanHTML = DOMPurify.sanitize(html, {
//       USE_PROFILES: { html: true },
//       ALLOWED_TAGS: WHITELISTED_TAGS,
//       ALLOWED_ATTR: ['style', 'href'],
//     });
//     return { __html: cleanHTML };
//   };

//   const queryParams = new URLSearchParams(window.location.search);
//   const categoryParam = queryParams.get('q')?.toLowerCase(); // Convert query param to lowercase

//   const filteredNotes = categoryParam === 'all'
//     ? notes
//     : categoryParam
//       ? notes.filter((note) => note.category.toLowerCase() === categoryParam)
//       : notes;

//   return (
//     <div>
//       <button onClick={() => navigate(-1)}>Back</button>

//       {filteredNotes.map((val, i) => (
//         <Link to={`/user/note/${val?._id}`} key={i}>
//           <div className='border border-white mb-[20px]'>
//             <h4>{val?.title}</h4>
//             <h4>CATEGORY::::::::::::::::::{val?.category}</h4>
//             <div dangerouslySetInnerHTML={sanitizeHTML(val?.note)} />
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default NotesCatalog;




import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { getSharedNotes, getPersonalNotes } from '../../reducers/private/notes/noteSlice';
import DOMPurify from 'dompurify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MagnifyingGlass } from 'phosphor-react';
import SearchFilter from '../../components/shared/SearchFilter';
import { characterLimit } from '../../utils/general';

const NotesCatalog = () => {
  const { notes } = useAppSelector((state) => state.note);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const WHITELISTED_TAGS = ['a', 'b', 'i', 'p', 'u', 'ol', 'ul', 'li', 'strong', 'em'];

  useEffect(() => {
    // Check if the current location contains 'shared' in the pathname
    const isSharedPage = location.pathname.includes('shared');

    // Dispatch the appropriate action based on whether it's a shared page or personal page
    if (isSharedPage) {
      dispatch(getSharedNotes());
    } else {
      dispatch(getPersonalNotes());
    }
  }, [dispatch, location.pathname]);

  const sanitizeHTML = (html: string) => {
    const cleanHTML = DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: WHITELISTED_TAGS,
      ALLOWED_ATTR: ['style', 'href'],
    });
    return { __html: cleanHTML };
  };

  const queryParams = new URLSearchParams(window.location.search);
  const categoryParam = queryParams.get('q')?.toLowerCase(); // Convert query param to lowercase

  const [searchQuery, setSearchQuery] = useState('');

  // Filter notes based on the category parameter or search query
  const filteredNotes = categoryParam === 'all'
    ? notes
    : categoryParam
      ? notes.filter(note => note.category.toLowerCase() === categoryParam)
      : notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <div>
      <div className='flex items-center justify-between'>
        <button className='flex items-center' onClick={() => navigate(-1)}><ArrowLeft weight='bold' size={16} color="#ececec" />&nbsp;&nbsp;Back</button>
        <div className='flex items-center'>
          <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder='Search by title' />
          <select name="" id="">
            <option value="">Title: A -Z</option>
          </select>
        </div>
      </div>


      <h1 className='capitalize pt-2 pb-3'>{categoryParam === 'all' ? 'All' : categoryParam} Notes</h1>
      {filteredNotes.length ? (
        <div className='grid grid-cols-2 gap-5'>
          {filteredNotes.map((val) => (
            <Link to={`/user/note/${val?._id}`} key={val?._id}>
              <div className='border border-white mb-[20px] rounded-[10px]'>
                <div className='p-4'>
                <h1 className='text-[24px] pb-4'>{val?.title}</h1>
                <div dangerouslySetInnerHTML={sanitizeHTML(characterLimit(val?.note, 150))} />

                </div>
                <div className='flex items-center justify-between border-t mt-4 p-4'>
                  <div>Author: {val?.author?.username}</div>
                  <div className='flex space-x-2'>{val?.tags?.map(val => <span className='shadow p-1 text-[12px] rounded bg-[#0e032a]'>{val}</span>)}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>None Found</div>
      )}



    </div>
  );
};

export default NotesCatalog;

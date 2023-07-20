import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { getSharedNotes, getPersonalNotes } from '../../reducers/private/notes/noteSlice';
import DOMPurify from 'dompurify';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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

  // Filter notes based on the category parameter
  const filteredNotes = categoryParam
    ? notes.filter((note) => note.category.toLowerCase() === categoryParam)
    : notes;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>

      {filteredNotes.map((val, i) => (
        <Link to={`/user/note/${val?._id}`} key={i}>
          <div className='border border-white mb-[20px]'>
            <h4>{val?.title}</h4>
            <h4>CATEGORY::::::::::::::::::{val?.category}</h4>
            <div dangerouslySetInnerHTML={sanitizeHTML(val?.note)} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NotesCatalog;

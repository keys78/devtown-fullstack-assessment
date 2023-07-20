import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { getNote } from '../../reducers/private/notes/noteSlice';
import DOMPurify from 'dompurify';
import { useNavigate, useParams } from 'react-router-dom';

const NoteDetails = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const dispatch = useAppDispatch();
  const { note, isLoading } = useAppSelector((state) => state.note);
  const navigate = useNavigate();
  const WHITELISTED_TAGS = ['a', 'b', 'i', 'p', 'u', 'ol', 'ul', 'li', 'strong', 'em'];

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
    return <div>Loading...</div>; // Display a loading message while the API call is in progress
  }

  if (!note) {
    return <div>Note not found</div>; // Handle the case when the note is not found
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <button onClick={() => navigate(-1)}>Back</button>
        <button>Share</button>
      </div>
      <div>
        <h4>{note?.title}</h4>
        <h4>{note?.category}</h4>
        <div>
          {note?.tags.map((tag: string) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div dangerouslySetInnerHTML={sanitizeHTML(note?.note)} />
        <h4>{note?.author?.username}</h4>
      </div>
    </div>
  );
};

export default NoteDetails;

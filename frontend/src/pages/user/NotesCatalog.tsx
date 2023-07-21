import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { getSharedNotes, getPersonalNotes, sortByNameAZ, sortByNameZA } from '../../reducers/private/notes/noteSlice';
import DOMPurify from 'dompurify';
import SearchFilter from '../../components/shared/SearchFilter';
import { characterLimit } from '../../utils/general';

const NotesCatalog = () => {
  const { notes } = useAppSelector((state) => state.note);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [sortOption, setSortOption] = useState("titleAsc");
  const WHITELISTED_TAGS = ['a', 'b', 'i', 'p', 'u', 'ol', 'ul', 'li', 'strong', 'em'];

  useEffect(() => {
    const isSharedPage = location.pathname.includes('shared');
    if (isSharedPage) {
      dispatch(getSharedNotes());
    } else {
      dispatch(getPersonalNotes());
    }
  }, [dispatch, location.pathname]);

  const sanitizeHTML = (html: string | Node) => {
    const cleanHTML = DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: WHITELISTED_TAGS,
      ALLOWED_ATTR: ['style', 'href'],
    });
    return { __html: cleanHTML };
  };

  const queryParams = new URLSearchParams(window.location.search);
  const categoryParam = queryParams.get('q')?.toLowerCase();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = categoryParam === 'all'
    ? notes
    : categoryParam
      ? notes?.filter(note => note?.category?.toLowerCase() === categoryParam)
      : notes?.filter(note => note?.title?.toLowerCase().includes(searchQuery?.toLowerCase()));

  const handleSortChange = (event: { target: { value: any; }; }) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);
    switch (selectedSortOption) {
      case "titleAsc":
        dispatch(sortByNameAZ());
        break;
      case "titleDesc":
        dispatch(sortByNameZA());
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className='flex s-480:flex-row flex-col space-y-2 s-480:items-center justify-between'>
        <button className='flex items-center' onClick={() => navigate(-1)}><ArrowLeft weight='bold' size={16} color="#ececec" />&nbsp;&nbsp;Back</button>
        <div className='flex items-center'>
          <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder='Search by title' /> &nbsp;
          <div>
            <select className='bg-[#180540] text-white py-2 rounded-[5px]' name="sortOption" id="sortOption" value={sortOption} onChange={handleSortChange}>
              <option value="titleAsc">Title: A - Z</option>
              <option value="titleDesc">Title: Z - A</option>
            </select>
          </div>
        </div>
      </div>
      <div className='flex items-center space-x-2 text-[14px] pt-2 pb-3'>
        <div onClick={() => navigate(-1)} className='cursor-pointer'>{location.pathname.split("/")[1]} {'>'}</div>
        <div className='capitalize text-[14px]'>{categoryParam === 'all' ? 'All' : categoryParam} Notes</div>
      </div>
      {filteredNotes.length ? (
        <div className='grid s-767:grid-cols-2 grid-col-1 gap-5'>
          {filteredNotes.map((val, i) => (
            <Link to={`/note/${val?._id}`} key={val?._id}>
              <motion.div
                layout
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.2, delay: i * 0.3 }}
                exit={{ opacity: 0 }}
                className='mb-[20px] rounded-[10px] bg-[#180540]'>
                <div className='px-4 pt-4'>
                  <h1 className='text-[24px]'>{val?.title}</h1>
                  <h6 className='pb-4 italic text-[12px]'>{moment(val?.createdAt).startOf('seconds').fromNow()}</h6>
                  <div dangerouslySetInnerHTML={sanitizeHTML(characterLimit(val?.note, 150))} />
                  <button className='outline-0 border-0 bg-[#130644] mb-2 mt-4 px-2 py-1 rounded-[6px]'>Read more ...</button>
                </div>
                <div className='flex items-center justify-between border-t border-gray-50 mt-4 p-4'>
                  <div>Author: {val?.author?.username}</div>
                  <div className='flex space-x-2'>{val?.tags?.map(tag => <span className='shadow p-1 text-[12px] rounded bg-[#0e032a]'>{tag}</span>)}</div>
                </div>
              </motion.div>
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

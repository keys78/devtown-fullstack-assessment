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
import Loader from '../../components/shared/Loadr';

const NotesCatalog = () => {
  const { notes, isLoading } = useAppSelector((state) => state.note);
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

  // const filteredNotes = categoryParam === 'all'
  //   ? notes
  //   : categoryParam
  //     ? notes?.filter(note => note?.category?.toLowerCase() === categoryParam)
  //     : notes?.filter(note => note?.title?.toLowerCase().includes(searchQuery?.toLowerCase()));

  const filteredNotes = categoryParam === 'all'
  ? notes?.filter(note => note?.title?.toLowerCase().includes(searchQuery?.toLowerCase()))
  : categoryParam
    ? notes?.filter(note => (
        note?.category?.toLowerCase() === categoryParam &&
        note?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
      ))
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
      <div className='flex items-center space-x-2 text-[14px] pt-4 pb-3'>
        <div onClick={() => navigate(-1)} className='cursor-pointer'>{location.pathname.split("/")[1]} {'>'}</div>
        <div className=' text-[14px]'>{categoryParam === 'all' ? 'All' : categoryParam} notes</div>
      </div>

      {isLoading ? (
        <div className='flex items-center justify-center s-480:h-[400px] h-[200px]'>
          <Loader />
        </div>
      ) : filteredNotes.length ? (
        <div className='grid s-767:grid-cols-2 grid-col-1 s-767:gap-5'>
          {filteredNotes.map((val, i) => (
            <Link to={`/note/${val?._id}`} key={val?._id}>
              <motion.div
                layout
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.2, delay: i * 0.3 }}
                exit={{ opacity: 0 }}
                className='mb-[20px] rounded-[10px] bg-[#180540]'>
                <div className='s-767:px-4 px-2 pt-4'>
                  <h1 className='s-767:text-[24px] text-[18px]'>{val?.title}</h1>
                  <h6 className='pb-4 italic s-767:text-[12px] text-[10px]'>{moment(val?.createdAt).startOf('seconds').fromNow()}</h6>
                  <div className='s-480:text-[16px] text-[14px]' dangerouslySetInnerHTML={sanitizeHTML(characterLimit(val?.note, 150))} />
                  <button className='outline-0 border-0 bg-[#130644] mb-2 mt-4 rounded-[6px] text-[10px] text-gray-300'>Click to read more ...</button>
                </div>
                <div className='flex items-center justify-between border-t border-gray-50 mt-4 p-4 s-767:text-[16px] text-[13px]'>
                  <div>Author: {val?.author?.username}</div>
                  <div className='flex space-x-2 s-767:text-[16px] text-[13px]'>{val?.tags?.map(tag => <span className='shadow p-1 text-[12px] rounded bg-[#0e032a]'>{tag}</span>)}</div>
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

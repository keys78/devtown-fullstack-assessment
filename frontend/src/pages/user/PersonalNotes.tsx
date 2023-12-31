import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { getPersonalNotes } from '../../reducers/private/notes/noteSlice';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import SearchFilter from '../../components/shared/SearchFilter';
import { characterLimit } from '../../utils/general';
import Loader from '../../components/shared/Loadr';

const PersonalNotes = () => {
  const { notes, isLoading } = useAppSelector((state) => state.note);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPersonalNotes());
  }, [dispatch]);

  const handleCategoryGet = (note: { category?: string }) => {
    if (note?.category) {
      const queryParams = new URLSearchParams({ q: note?.category });
      navigate(`/personal/catalog?${queryParams.toString()}`);
    }
  };

  const uniqueCategories = Array.from(new Set(notes.map((note) => note?.category)));

  const categoryCounts = new Map();
  notes.forEach((note) => {
    const category = note.category;
    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
  });


  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = uniqueCategories.filter((category) =>
    category?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div>
      <div className='flex items-center justify-between py-4'>
        <button className='flex items-center' onClick={() => navigate(-1)}><ArrowLeft weight='bold' size={16} color="#ececec" />&nbsp;&nbsp;Back</button>
        <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder='Search category...' />
      </div>
      <h1 className='pb-4'>Personal Notes</h1>
      {
        isLoading ? <div className='flex items-center justify-center s-480:h-[400px] h-[200px]'><Loader /></div> :
          <div className='mansonary-layout grid s-767:grid-cols-2 s-767:gap-6 gap-4'>
            <div onClick={() => (navigate(`/personal/catalog?${'all'}`))} className='h-[120px] rounded-[10px] p-4 relative cursor-pointer' key='all'>
              <h1 className='s-480:text-[30px] text-[24px] font-medium capitalize'>All</h1>
              <h1 className='absolute bottom-5 right-5 text-[20px] font-medium'>{notes.length}</h1>
            </div>
            {filteredCategories.map((category) => (
              <div onClick={() => handleCategoryGet({ category })} className='h-[120px] rounded-[10px] p-4 relative cursor-pointer' key={category}>
                <h1 className='s-480:text-[30px] text-[24px] font-medium capitalize'> {characterLimit(category, 30)} </h1>
                <h1 className='absolute bottom-5 right-5 text-[20px] font-medium'>{categoryCounts.get(category)}</h1>
              </div>
            ))}
          </div>
      }
    </div>
  );
};

export default PersonalNotes;
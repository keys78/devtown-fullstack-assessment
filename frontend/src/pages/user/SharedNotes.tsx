import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { getSharedNotes } from '../../reducers/private/notes/noteSlice';
import { useNavigate } from 'react-router-dom';

const SharedNotes = () => {
  const { notes } = useAppSelector((state) => state.note);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSharedNotes());
  }, [dispatch]);

  const handleCategoryGet = (note: { category?: string }) => {
    if (note?.category) {
      const queryParams = new URLSearchParams({ q: note.category });
      navigate(`/user/dashboard/shared/catalog/?${queryParams.toString()}`);
    }
  };

  // Use Set to remove duplicate categories
  const uniqueCategories = Array.from(new Set(notes.map((note) => note.category)));

  // Create a map to store the count of each category
  const categoryCounts = new Map();
  notes.forEach((note) => {
    const category = note.category;
    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
  });

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>

      {uniqueCategories.map((category) => (
        <div onClick={() => handleCategoryGet({ category })} className='border border-white mb-[20px]' key={category}>
          <h4>
            {category} ({categoryCounts.get(category)})
          </h4>
        </div>
      ))}
    </div>
  );
};

export default SharedNotes;


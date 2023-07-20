import { FolderNotch } from 'phosphor-react';
// import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import NoteForm from '../../components/modal/NoteForm';

const Dashboard = () => {
  const navigate = useNavigate();


  return (
    <div>
      <div className='flex items-center justify-center space-x-4 py-12'>
        <div onClick={() => navigate('/personal')} className='bg-[#02162e] shadow w-full rounded-[10px] px-4 py-12 cursor-pointer'>
        <FolderNotch size={40} color="#e0e0e0" />
          Personal
          </div>
        <div onClick={() => navigate('/shared')} className='bg-[#02162e] shadow w-full rounded-[10px] px-4 py-12 cursor-pointer'>
        <FolderNotch size={40} color="#e0e0e0" />
          Shared
          </div>
      </div>
      {/* <Navbar /> */}
      <NoteForm />
    </div>
  );
};

export default Dashboard;

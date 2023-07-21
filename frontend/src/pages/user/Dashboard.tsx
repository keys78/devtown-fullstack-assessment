import { FolderNotch } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='flex s-480:flex-row flex-col items-center justify-center s-480:space-x-4 s-480:space-y-0 space-y-3 s-480:py-12 py-6'>
        <div onClick={() => navigate('/personal')} className='bg-[#02162e] shadow w-full rounded-[10px] px-4 s-480:py-12 py-6 cursor-pointer'>
        <FolderNotch size={40} color="#e0e0e0" />
          Personal
          </div>
        <div onClick={() => navigate('/shared')} className='bg-[#02162e] shadow w-full rounded-[10px] px-4 s-480:py-12 py-6 cursor-pointer'>
        <FolderNotch size={40} color="#e0e0e0" />
          Shared
          </div>
      </div>
    </div>
  );
};

export default Dashboard;

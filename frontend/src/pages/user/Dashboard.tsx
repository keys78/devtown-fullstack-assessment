import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();


  return (
    <div>
      {/* <div className='flex items-center justify-center space-x-4'>
        <div onClick={() => navigate(`/user/dashboard/category/${'personal'}`)} className='border border-red-500 bg-red-500 w-full rounded-[10px] px-4 py-12 cursor-pointer'>Personal</div>
        <div onClick={() => navigate(`/user/dashboard/category/${'shared'} `)} className='border border-green-500 bg-green-500 w-full rounded-[10px] px-4 py-12 cursor-pointer'>Shared</div>
      </div> */}
      <div className='flex items-center justify-center space-x-4'>
        <div onClick={() => navigate('/user/dashboard/personal')} className='border border-red-500 bg-red-500 w-full rounded-[10px] px-4 py-12 cursor-pointer'>Personal</div>
        <div onClick={() => navigate('/user/dashboard/shared')} className='border border-green-500 bg-green-500 w-full rounded-[10px] px-4 py-12 cursor-pointer'>Shared</div>
      </div>
      <Navbar />
    </div>
  );
};

export default Dashboard;

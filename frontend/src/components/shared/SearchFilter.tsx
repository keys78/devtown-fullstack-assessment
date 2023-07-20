import { MagnifyingGlass } from "phosphor-react";

interface Props {
  placeholder: string;
  searchQuery: string;
  setSearchQuery: React.SetStateAction<any>;
}

const SearchFilter = ({ searchQuery, setSearchQuery, placeholder }: Props) => {
  return (
    <div className='max-w-[300px]'>
      <div className='flex space-x-2 items-center rounded-[5px] px-2 bg-[#050927] text-white'>
        <MagnifyingGlass size={22} color="#c4c5cb" weight="bold" />
        <input
          className='w-full rounded-[5px] py-2 border-0 outline-none bg-[#050927] text-white'
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchFilter;

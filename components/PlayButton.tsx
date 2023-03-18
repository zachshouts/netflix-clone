import { useRouter } from 'next/router';
import { FaPlayCircle } from 'react-icons/fa';


interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button className='
      bg-white
      rounded-md
      py-1 md:py-2
      px-2 md:px-4
      w-auto
      text-xs lg:text-lg
      font-semibold
      flex
      flex-row
      items-center
      hover:bg-neutral-300
      transition
    '>
      <FaPlayCircle className='w-4 md:w-7 text-black mr-1' />
    </button>
  );
};

export default PlayButton;
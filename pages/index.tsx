import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';

import useCurrentUser from '@/hooks/useCurrentUser';
import useMovieList from '@/hooks/useMovieList';
import { Navbar, Billboard, MovieList } from '@/components';


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
};

export default function Home() {
  const { data: user } = useCurrentUser();
  const { data: movies = [] } = useMovieList();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Trending Now' />
      </div>
    </>
  )
}

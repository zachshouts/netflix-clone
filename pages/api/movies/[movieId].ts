import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') return res.status(405).end();

    await serverAuth(req);

    const { movieId } = req.query;

    if (typeof movieId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!movieId) {
      throw new Error('Missing Id');
    }

    const movies = await prismadb.movie.findUnique({
      where: {
        id: movieId
      }
    });

    res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
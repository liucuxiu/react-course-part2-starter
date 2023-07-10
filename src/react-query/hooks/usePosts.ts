import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePosts = (userId: number | undefined) => {
  const fetchPosts = () =>
    axios
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
        params: {
          userId
        },
      })
      .then((res) => res.data);

  return useQuery<Post[], Error>({
    queryKey: userId ?  ['users', userId, 'posts']: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

}

export default usePosts;
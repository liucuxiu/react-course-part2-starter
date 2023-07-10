import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const usePosts = (query: PostQuery) => {
  return useInfiniteQuery<Post[], Error>({
    queryKey: ['posts', query],
    queryFn: ({pageParam = 1}) =>
      axios
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === query.pageSize ? allPages.length + 1 : false;
    }
  })

}

export default usePosts;
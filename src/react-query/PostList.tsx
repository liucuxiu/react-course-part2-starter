import React, { useState } from 'react';
import usePosts from './hooks/usePosts';


const PostList = () => {
  const pageSize = 10;

  const [userId, setUserId] = useState<number>();
  const { data: posts, isLoading, error, fetchNextPage , isFetchingNextPage} = usePosts({ pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select className="form-select mb-3"
              onChange={(e) => setUserId(Number(e.target.value))}
              value={userId}>
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {posts.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      <button
        className="btn btn-primary mt-3 ms-1"
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}>
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </button>
    </>

  );
};

export default PostList;

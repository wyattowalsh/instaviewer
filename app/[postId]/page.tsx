import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchPostDetails } from '../../lib/instagramApi';
import Link from 'next/link';

const PostDetailsPage = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (postId) {
      const getPostDetails = async () => {
        const postDetails = await fetchPostDetails(postId);
        setPost(postDetails);
      };

      getPostDetails();
    }
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="post-details">
        <img src={post.imageUrl} alt={post.caption} className="w-full h-auto" />
        <h2 className="text-2xl font-bold mt-4">{post.caption}</h2>
        <p className="text-gray-600">By {post.creator}</p>
        <p className="text-gray-600">{new Date(post.timestamp).toLocaleString()}</p>
        <div className="mt-4">
          <Link href="/">
            <a className="text-blue-500">Back to Home</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;

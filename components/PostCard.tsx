import React from 'react';
import { motion } from 'framer-motion';

const PostCard = ({ post }) => {
  return (
    <motion.div
      className="post-card"
      whileHover={{ scale: 1.05 }}
      whileFocus={{ scale: 1.05 }}
    >
      <img src={post.image} alt={post.caption} className="post-image" />
      <div className="post-details">
        <p className="post-caption">{post.caption}</p>
        <p className="post-creator">{post.creator}</p>
        <p className="post-timestamp">{new Date(post.timestamp).toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default PostCard;

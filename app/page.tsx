import React, { useState, useEffect } from 'react';
import { PostCard } from '../components/PostCard';
import { Filters } from '../components/Filters';
import { SearchBar } from '../components/SearchBar';
import { LayoutToggle } from '../components/LayoutToggle';
import { fetchSavedPosts } from '../lib/instagramApi';

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date');

  useEffect(() => {
    const getSavedPosts = async () => {
      const savedPosts = await fetchSavedPosts();
      setPosts(savedPosts);
      setFilteredPosts(savedPosts);
    };

    getSavedPosts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = posts.filter(post =>
      post.caption.toLowerCase().includes(query.toLowerCase()) ||
      post.creator.toLowerCase().includes(query.toLowerCase()) ||
      post.hashtags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredPosts(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sorted = [...filteredPosts].sort((a, b) => {
      if (option === 'date') {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else if (option === 'creator') {
        return a.creator.localeCompare(b.creator);
      }
      return 0;
    });
    setFilteredPosts(sorted);
  };

  const handleFilter = (filters) => {
    const { dateRange, keywords } = filters;
    const filtered = posts.filter(post => {
      const matchesDateRange = !dateRange || (new Date(post.timestamp) >= new Date(dateRange[0]) && new Date(post.timestamp) <= new Date(dateRange[1]));
      const matchesKeywords = !keywords || keywords.every(keyword => post.caption.toLowerCase().includes(keyword.toLowerCase()) || post.hashtags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase())));
      return matchesDateRange && matchesKeywords;
    });
    setFilteredPosts(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Filters onFilter={handleFilter} />
      <LayoutToggle />
      <div className="posts-container">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;

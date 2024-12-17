import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { debounce } from 'lodash';
import { supabase } from '../lib/supabaseClient';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { setSearchQuery } = useStore();

  useEffect(() => {
    const debouncedSearch = debounce(async (searchQuery) => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .textSearch('caption', searchQuery);

      if (error) {
        console.error('Error searching posts:', error);
      } else {
        onSearch(data);
      }
    }, 300);

    if (query) {
      debouncedSearch(query);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [query, onSearch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search posts by captions, usernames, or hashtags"
      />
    </div>
  );
};

export default SearchBar;

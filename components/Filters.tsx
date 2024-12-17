import React, { useState } from 'react';
import { useStore } from '../store';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Filters = ({ onFilter }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [keywords, setKeywords] = useState('');
  const { setFilters } = useStore();

  const handleDateChange = (update) => {
    setDateRange(update);
    setFilters({ dateRange: update, keywords });
    onFilter({ dateRange: update, keywords });
  };

  const handleKeywordChange = (e) => {
    setKeywords(e.target.value);
    setFilters({ dateRange, keywords: e.target.value });
    onFilter({ dateRange, keywords: e.target.value });
  };

  return (
    <div className="filters">
      <div className="date-picker">
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          isClearable={true}
          placeholderText="Select a date range"
        />
      </div>
      <div className="keyword-input">
        <input
          type="text"
          value={keywords}
          onChange={handleKeywordChange}
          placeholder="Enter keywords"
        />
      </div>
    </div>
  );
};

export default Filters;

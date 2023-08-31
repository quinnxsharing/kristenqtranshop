import React, { useState } from 'react';

function FilterPanel({ selectedCategory, setSelectedCategory, uniqueCategories, selectedTags, handleTagChange, uniqueTags }) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className={`filter-panel ${showFilters ? 'open' : ''}`}>
      <div className="filter-toggle" onClick={toggleFilters}>
        <i className={`fa ${showFilters ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i> Filter
      </div>
      <div className="filters">
        <div className="category-filter">
          <label htmlFor="category">Category:</label>
          {/* Add your category filter select here */}
            <h2>Filter Products       Category filter </h2>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All</option>
        {uniqueCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
        </div>
              {/* Tag filter */}

        <div className="tag-filter">          
       <label>Tag:</label>
      {uniqueTags.map((tag) => (
        <div key={tag}>
          <input
            type="checkbox"
            id={tag}
            value={tag}
            checked={selectedTags.includes(tag)}
            onChange={() => handleTagChange(tag)}
          />
          <label htmlFor={tag}>{tag}</label>
        </div>
      ))} 
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;

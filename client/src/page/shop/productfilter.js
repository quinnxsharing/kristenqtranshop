import React, { useState, useMemo } from 'react';
import Product from './product';
import './productlist.css';

function ProductFilter({ products }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState(['All']);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Get unique categories and tags from products
  const uniqueCategories = useMemo(() => [...new Set(products.map((product) => product.category))], [products]);

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    } else {
      return products.filter((product) => product.category === selectedCategory);
    }
  }, [selectedCategory, products]);

  // Get unique tags for the selected category (excluding 'All')
  const uniqueTags = useMemo(() => {
    const tagsForCategory = filteredProducts.flatMap((product) => product.tags);
    return [...new Set(tagsForCategory)];
  }, [filteredProducts]);

  const handleTagChange = (tag) => {
    if (tag === 'All') {
      setSelectedTags(['All']);
    } else {
      setSelectedTags((prevSelectedTags) => {
        if (prevSelectedTags.includes('All')) {
          return [tag];
        } else {
          if (prevSelectedTags.includes(tag)) {
            return prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
          } else {
            return [...prevSelectedTags, tag];
          }
        }
      });
    }
  };

  const filteredProductsByTag = useMemo(() => {
    if (selectedTags.includes('All')) {
      return filteredProducts;
    } else {
      return filteredProducts.filter((product) => selectedTags.some((tag) => product.tags.includes(tag)));
    }
  }, [selectedTags, filteredProducts]);

  return (
    <div>
          <div className="shop">
            <div className="shopTitle">
                <h1>Kristen's Shop</h1>
            </div>
        </div>

      {/* Filter Toggle Button */}
      <div
        className={`filter-toggle ${isFilterPanelOpen ? 'open' : ''}`}
        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
      >
        Filter Options
        <i className={`fas fa-chevron-${isFilterPanelOpen ? 'up' : 'down'}`} />
      </div>

      {/* Filter Panel */}
      <div className={`filter-panel ${isFilterPanelOpen ? 'open' : ''}`}>
        {/* Category filter */}
        <div className="category-filter">
          <label htmlFor="category">Category:</label>
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
        <ul className="tag-filter" >        
          <li >
            <input
              type="checkbox"
              id="All"
              value="All"
              checked={selectedTags.includes('All')}
              onChange={() => handleTagChange('All')}
            />
            <label htmlFor="All">All</label>
          </li>
          {uniqueTags.map((tag) => (
            <li key={tag}>
              <input
                type="checkbox"
                id={tag}
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
              />
              <label htmlFor={tag}>{tag}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Display filtered products */}
      <div className="productList">
        {filteredProductsByTag.map((product) => (
          <Product id={product.id} title={product.title} body={product.body} image={product.image} price={product.price} />
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;

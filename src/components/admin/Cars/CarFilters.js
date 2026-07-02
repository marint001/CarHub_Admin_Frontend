import React from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const CarFilters = ({ filters, setFilters }) => {
  const makes = ['All', 'Toyota', 'BMW', 'Mercedes', 'Audi', 'Honda', 'Ford', 'Chevrolet', 'Nissan'];
  const statuses = ['All', 'Available', 'Reserved', 'Sold'];

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value === 'All' ? '' : value });
  };

  const clearFilters = () => {
    setFilters({ status: '', make: '', search: '' });
  };

  const hasActiveFilters = filters.status || filters.make || filters.search;

  return (
    <div className="filter-bar">
      {/* Search */}
      <div className="filter-search">
        <FaSearch className="filter-icon" />
        <input
          type="text"
          placeholder="Search cars by make, model, or year..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        {filters.search && (
          <button 
            className="filter-clear-btn"
            onClick={() => setFilters({ ...filters, search: '' })}
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Status Filter */}
      <div className="filter-select-wrapper">
        <select
          value={filters.status || 'All'}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Make Filter */}
      <div className="filter-select-wrapper">
        <select
          value={filters.make || 'All'}
          onChange={(e) => handleFilterChange('make', e.target.value)}
        >
          {makes.map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <button className="btn-filter-apply">
        <FaFilter /> Apply
      </button>
      
      {hasActiveFilters && (
        <button className="btn-filter-clear" onClick={clearFilters}>
          <FaTimes /> Clear
        </button>
      )}
    </div>
  );
};

export default CarFilters;
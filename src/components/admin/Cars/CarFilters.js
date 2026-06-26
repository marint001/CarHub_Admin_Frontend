import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const CarFilters = ({ filters, setFilters }) => {
  const makes = ['All', 'Toyota', 'BMW', 'Mercedes', 'Audi', 'Honda', 'Ford'];
  const statuses = ['All', 'Available', 'Reserved', 'Sold'];

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search cars..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </div>
        
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.status || 'All'}
          onChange={(e) => setFilters({ ...filters, status: e.target.value === 'All' ? '' : e.target.value })}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.make || 'All'}
          onChange={(e) => setFilters({ ...filters, make: e.target.value === 'All' ? '' : e.target.value })}
        >
          {makes.map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>

        <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center">
          <FaFilter className="mr-2" /> Apply
        </button>
      </div>
    </div>
  );
};

export default CarFilters;
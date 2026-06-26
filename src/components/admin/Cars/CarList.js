import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CarFilters from './CarFilters';
import CarTableRow from './CarTableRow';
import ConfirmDialog from '../../common/ConfirmDialog';
import LoadingSpinner from '../../common/LoadingSpinner';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', make: '' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, carId: null });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCars([
        {
          id: 1,
          make: 'Toyota',
          model: 'Camry',
          year: 2023,
          price: 32500,
          mileage: 15000,
          status: 'Available',
          fuelType: 'Petrol',
          transmission: 'Automatic',
          images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=100'],
          createdAt: '2026-06-26'
        },
        {
          id: 2,
          make: 'BMW',
          model: 'X5',
          year: 2022,
          price: 55000,
          mileage: 20000,
          status: 'Sold',
          fuelType: 'Diesel',
          transmission: 'Automatic',
          images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100'],
          createdAt: '2026-06-25'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id) => {
    setDeleteDialog({ open: true, carId: id });
  };

  const confirmDelete = () => {
    setCars(cars.filter(car => car.id !== deleteDialog.carId));
    toast.success('Car deleted successfully');
    setDeleteDialog({ open: false, carId: null });
  };

  const filteredCars = cars.filter(car => {
    if (filters.status && car.status !== filters.status) return false;
    if (filters.make && car.make !== filters.make) return false;
    return true;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Cars</h1>
        <Link
          to="/admin/cars/new"
          className="mt-3 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Car
        </Link>
      </div>

      <CarFilters filters={filters} setFilters={setFilters} />
      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCars.map((car) => (
                <CarTableRow 
                  key={car.id} 
                  car={car} 
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
        {filteredCars.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No cars found matching your filters
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, carId: null })}
        onConfirm={confirmDelete}
        title="Delete Car"
        message="Are you sure you want to delete this car? This action cannot be undone."
      />
    </div>
  );
};

export default CarList;
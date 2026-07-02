import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaCar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CarFilters from './CarFilters';
import CarTableRow from './CarTableRow';
import ConfirmDialog from '../../common/ConfirmDialog';
import LoadingSpinner from '../../common/LoadingSpinner';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', make: '', search: '' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, carId: null });

  useEffect(() => {
    // Simulate API call with sample data
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
          images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=100&h=100&fit=crop'],
          createdAt: '2026-06-26',
          description: 'Low mileage, full service history.'
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
          images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100&h=100&fit=crop'],
          createdAt: '2026-06-25',
          description: 'Luxury SUV with premium package.'
        },
        {
          id: 3,
          make: 'Mercedes',
          model: 'E-Class',
          year: 2023,
          price: 68900,
          mileage: 8000,
          status: 'Reserved',
          fuelType: 'Petrol',
          transmission: 'Automatic',
          images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=100&h=100&fit=crop'],
          createdAt: '2026-06-24',
          description: 'Executive luxury sedan.'
        },
        {
          id: 4,
          make: 'Audi',
          model: 'Q7',
          year: 2023,
          price: 72900,
          mileage: 5000,
          status: 'Available',
          fuelType: 'Diesel',
          transmission: 'Automatic',
          images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=100&fit=crop'],
          createdAt: '2026-06-23',
          description: 'Premium SUV with advanced features.'
        },
        {
          id: 5,
          make: 'Honda',
          model: 'Civic',
          year: 2023,
          price: 28500,
          mileage: 10000,
          status: 'Available',
          fuelType: 'Petrol',
          transmission: 'CVT',
          images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=100&h=100&fit=crop'],
          createdAt: '2026-06-22',
          description: 'Sporty and efficient compact sedan.'
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
    toast.success('Car deleted successfully! 🗑️');
    setDeleteDialog({ open: false, carId: null });
  };

  const filteredCars = cars.filter(car => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const carString = `${car.make} ${car.model} ${car.year}`.toLowerCase();
      if (!carString.includes(searchTerm)) return false;
    }
    // Status filter
    if (filters.status && car.status !== filters.status) return false;
    // Make filter
    if (filters.make && car.make !== filters.make) return false;
    return true;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Cars</h1>
          <p className="page-subtitle">Manage your vehicle inventory</p>
        </div>
        <Link to="/admin/cars/new" className="btn btn-primary">
          <FaPlus /> Add New Car
        </Link>
      </div>

      {/* Filters */}
      <CarFilters filters={filters} setFilters={setFilters} />
      
      {/* Stats Summary */}
      <div className="stats-summary">
        <div className="stat-item">
          <span className="stat-label">Total</span>
          <span className="stat-value">{filteredCars.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Available</span>
          <span className="stat-value" style={{ color: '#4CAF50' }}>
            {filteredCars.filter(c => c.status === 'Available').length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Reserved</span>
          <span className="stat-value" style={{ color: '#FFA726' }}>
            {filteredCars.filter(c => c.status === 'Reserved').length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Sold</span>
          <span className="stat-value" style={{ color: '#EF5350' }}>
            {filteredCars.filter(c => c.status === 'Sold').length}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Car</th>
              <th>Details</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <CarTableRow 
                  key={car.id} 
                  car={car} 
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">
                  <FaCar className="empty-icon" />
                  <div className="empty-title">No cars found</div>
                  <div className="empty-subtitle">Try adjusting your filters or add a new car</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm Dialog */}
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
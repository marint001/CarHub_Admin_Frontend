import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const CarTableRow = ({ car, onDelete }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Available': 'bg-green-100 text-green-800',
      'Sold': 'bg-red-100 text-red-800',
      'Reserved': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img 
            src={car.images[0]} 
            alt={`${car.make} ${car.model}`}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {car.make} {car.model}
            </div>
            <div className="text-sm text-gray-500">{car.year}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{car.transmission}</div>
        <div className="text-sm text-gray-500">{car.mileage.toLocaleString()} mi</div>
        <div className="text-sm text-gray-500">{car.fuelType}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">
          ${car.price.toLocaleString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(car.status)}`}>
          {car.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <Link 
            to={`/admin/cars/edit/${car.id}`}
            className="text-blue-600 hover:text-blue-900"
          >
            <FaEdit size={18} />
          </Link>
          <button 
            onClick={() => onDelete(car.id)}
            className="text-red-600 hover:text-red-900"
          >
            <FaTrash size={18} />
          </button>
          <Link 
            to={`/car/${car.id}`}
            className="text-gray-600 hover:text-gray-900"
            target="_blank"
          >
            <FaEye size={18} />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default CarTableRow;
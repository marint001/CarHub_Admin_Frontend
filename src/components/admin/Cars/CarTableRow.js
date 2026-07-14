import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaCar, FaTachometerAlt, FaGasPump } from 'react-icons/fa';

const CarTableRow = ({ car, onDelete }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Available': 'badge-available',
      'Sold': 'badge-sold',
      'Reserved': 'badge-reserved'
    };
    return colors[status] || 'badge-available';
  };

  return (
    <tr>
      <td>
        <div className="car-info">
          <img 
            src={car.images[0]} 
            alt={`${car.make} ${car.model}`}
            className="car-thumb"
          />
          <div className="car-details">
            <div className="car-name">
              {car.make} {car.model}
            </div>
            <div className="car-year">{car.year}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="car-specs">
          <div className="spec-item">
            <FaCar className="spec-icon" />
            <span>{car.transmission}</span>
          </div>
          <div className="spec-item">
            <FaTachometerAlt className="spec-icon" />
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="spec-item">
            <FaGasPump className="spec-icon" />
            <span>{car.fuelType}</span>
          </div>
        </div>
      </td>
      <td className="car-price">${car.price.toLocaleString()}</td>
      <td>
        <span className={`badge ${getStatusColor(car.status)}`}>
          {car.status}
        </span>
      </td>
      <td>
        <div className="action-btns">
          <Link 
            to={`/admin/cars/edit/${car.id}`}
            className="action-btn edit"
            title="Edit car"
          >
            <FaEdit />
          </Link>
          <button 
            onClick={() => onDelete(car.id)}
            className="action-btn delete"
            title="Delete car"
          >
            <FaTrash />
          </button>
          {/* Fix: Open in new tab or use correct path */}
          <Link 
            to={`/admin/cars/${car.id}`}
            className="action-btn view"
            title="View car details"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEye />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default CarTableRow;
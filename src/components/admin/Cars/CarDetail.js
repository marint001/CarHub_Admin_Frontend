import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaCar, 
  FaTachometerAlt, 
  FaGasPump, 
  FaCalendar,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaDollarSign
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../common/LoadingSpinner';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Sample car data
      const carData = {
        id: parseInt(id),
        make: 'Toyota',
        model: 'Camry',
        year: 2023,
        price: 32500,
        mileage: 15000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        status: 'Available',
        description: 'Low mileage, full service history, one owner. Well-maintained vehicle with all service records. Features include leather seats, sunroof, navigation system, and premium sound system.',
        images: [
          'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop&crop=left'
        ],
        createdAt: '2026-06-26',
        vin: '1HGCM82633A123456',
        color: 'Silver',
        engine: '2.5L 4-Cylinder',
        horsepower: 203,
        features: ['Leather Seats', 'Sunroof', 'Navigation', 'Premium Sound', 'Backup Camera']
      };
      setCar(carData);
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusColor = (status) => {
    const colors = {
      'Available': { bg: 'rgba(76, 175, 80, 0.15)', text: '#4CAF50' },
      'Sold': { bg: 'rgba(239, 83, 80, 0.15)', text: '#EF5350' },
      'Reserved': { bg: 'rgba(255, 167, 38, 0.15)', text: '#FFA726' }
    };
    return colors[status] || { bg: 'rgba(136, 136, 136, 0.15)', text: '#888888' };
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      toast.success('Car deleted successfully!');
      navigate('/admin/cars');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!car) return <div className="empty-state">Car not found</div>;

  const statusStyle = getStatusColor(car.status);

  return (
    <div className="car-detail-container animate-fade-in">
      {/* Back Button */}
      <div className="car-detail-header">
        <button 
          onClick={() => navigate('/admin/cars')}
          className="btn-back"
        >
          <FaArrowLeft /> Back to Cars
        </button>
        <div className="car-detail-actions">
          <Link to={`/admin/cars/edit/${car.id}`} className="btn btn-primary">
            <FaEdit /> Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      {/* Car Detail Content */}
      <div className="car-detail-grid">
        {/* Images */}
        <div className="car-detail-images">
          <div className="main-image">
            <img src={car.images[0]} alt={`${car.make} ${car.model}`} />
          </div>
          <div className="image-thumbnails">
            {car.images.map((img, index) => (
              <img key={index} src={img} alt={`${car.make} ${car.model} ${index + 1}`} />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="car-detail-info">
          <div className="car-detail-title">
            <h1>{car.make} {car.model}</h1>
            <span className="car-detail-year">{car.year}</span>
          </div>
          
          <div className="car-detail-price">
            <FaDollarSign />
            <span>${car.price.toLocaleString()}</span>
          </div>

          <div className="car-detail-status">
            <span 
              className="status-badge"
              style={{ 
                background: statusStyle.bg,
                color: statusStyle.text
              }}
            >
              {car.status}
            </span>
          </div>

          <div className="car-detail-specs">
            <div className="spec-item">
              <FaTachometerAlt />
              <span>{car.mileage.toLocaleString()} mi</span>
            </div>
            <div className="spec-item">
              <FaGasPump />
              <span>{car.fuelType}</span>
            </div>
            <div className="spec-item">
              <FaCar />
              <span>{car.transmission}</span>
            </div>
            <div className="spec-item">
              <FaCalendar />
              <span>{car.year}</span>
            </div>
          </div>

          <div className="car-detail-description">
            <h3>Description</h3>
            <p>{car.description}</p>
          </div>

          <div className="car-detail-features">
            <h3>Features</h3>
            <div className="features-list">
              {car.features.map((feature, index) => (
                <span key={index} className="feature-tag">
                  ✓ {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="car-detail-meta">
            <div className="meta-item">
              <span className="meta-label">VIN</span>
              <span className="meta-value">{car.vin}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Color</span>
              <span className="meta-value">{car.color}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Engine</span>
              <span className="meta-value">{car.engine}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Horsepower</span>
              <span className="meta-value">{car.horsepower} HP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
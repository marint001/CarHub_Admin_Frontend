import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FaSave, 
  FaTimes, 
  FaUpload, 
  FaCar, 
  FaArrowLeft,
  FaImage,
  FaTrash,
  FaInfoCircle
} from 'react-icons/fa';

const CarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'Available',
    description: '',
    images: []
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      // Simulate fetching car data for edit
      setTimeout(() => {
        setFormData({
          make: 'Toyota',
          model: 'Camry',
          year: 2023,
          price: '32500',
          mileage: '15000',
          fuelType: 'Petrol',
          transmission: 'Automatic',
          status: 'Available',
          description: 'Low mileage, full service history, one owner. Well-maintained vehicle with all service records.',
          images: ['image1.jpg', 'image2.jpg']
        });
        setImagePreview([
          'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200&h=200&fit=crop',
          'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200&h=200&fit=crop&crop=center'
        ]);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreview([...imagePreview, ...previews]);
      setFormData({ ...formData, images: [...formData.images, ...files] });
    }
  };

  const removeImage = (index) => {
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    const newImages = formData.images.filter((_, i) => i !== index);
    setImagePreview(newPreviews);
    setFormData({ ...formData, images: newImages });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.make.trim()) newErrors.make = 'Make is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (formData.mileage && formData.mileage < 0) newErrors.mileage = 'Mileage cannot be negative';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success(isEditing ? 'Car updated successfully! 🚗' : 'Car added successfully! 🚗');
      navigate('/admin/cars');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="form-page animate-fade-in">
      {/* Header */}
      <div className="form-page-header">
        <div className="header-left">
          <button 
            onClick={() => navigate('/admin/cars')}
            className="btn-back"
          >
            <FaArrowLeft /> Back
          </button>
          <div>
            <h1 className="page-title">
              {isEditing ? 'Edit Car' : 'Add New Car'}
            </h1>
            <p className="page-subtitle">
              {isEditing 
                ? 'Update the vehicle details' 
                : 'Add a new vehicle to your inventory'
              }
            </p>
          </div>
        </div>
        <div className="header-right">
          <span className="form-status">
            <FaInfoCircle />
            {isEditing ? 'Editing' : 'New'} Car
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
          {/* Left Column - Main Fields */}
          <div className="form-main">
            <div className="form-section">
              <h3 className="form-section-title">Vehicle Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>
                    Make <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="e.g., Toyota, BMW, Mercedes"
                    className={errors.make ? 'error' : ''}
                  />
                  {errors.make && <span className="error-message">{errors.make}</span>}
                </div>

                <div className="form-group">
                  <label>
                    Model <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g., Camry, X5, E-Class"
                    className={errors.model ? 'error' : ''}
                  />
                  {errors.model && <span className="error-message">{errors.model}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Year <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    className={errors.year ? 'error' : ''}
                  />
                  {errors.year && <span className="error-message">{errors.year}</span>}
                </div>

                <div className="form-group">
                  <label>
                    Price ($) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g., 32500"
                    min="0"
                    step="100"
                    className={errors.price ? 'error' : ''}
                  />
                  {errors.price && <span className="error-message">{errors.price}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mileage (mi)</label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="e.g., 15000"
                    min="0"
                    className={errors.mileage ? 'error' : ''}
                  />
                  {errors.mileage && <span className="error-message">{errors.mileage}</span>}
                </div>

                <div className="form-group">
                  <label>Fuel Type</label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                  >
                    <option value="Petrol">⛽ Petrol</option>
                    <option value="Diesel">⛽ Diesel</option>
                    <option value="Electric">⚡ Electric</option>
                    <option value="Hybrid">⚡ Hybrid</option>
                    <option value="CNG">🔵 CNG</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Transmission</label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                  >
                    <option value="Automatic">⚙️ Automatic</option>
                    <option value="Manual">⚙️ Manual</option>
                    <option value="CVT">⚙️ CVT</option>
                    <option value="Semi-Automatic">⚙️ Semi-Automatic</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Available">✅ Available</option>
                    <option value="Reserved">🔄 Reserved</option>
                    <option value="Sold">❌ Sold</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="form-section">
              <h3 className="form-section-title">Description</h3>
              <div className="form-group">
                <label>Car Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter car description, features, condition, and other details..."
                  rows="4"
                />
                <div className="char-count">
                  {formData.description.length} characters
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image Upload */}
          <div className="form-sidebar">
            <div className="form-section">
              <h3 className="form-section-title">
                <FaImage /> Images
              </h3>
              
              <div className="upload-area">
                <FaUpload className="upload-icon" />
                <div className="upload-text">Click to upload images</div>
                <div className="upload-subtext">or drag and drop</div>
                <div className="upload-formats">PNG, JPG, WEBP (Max 5MB)</div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="upload-input"
                />
              </div>

              {imagePreview.length > 0 && (
                <div className="upload-preview">
                  {imagePreview.map((img, index) => (
                    <div key={index} className="preview-item">
                      <img src={img} alt={`Preview ${index + 1}`} />
                      <button 
                        type="button"
                        onClick={() => removeImage(index)}
                        className="preview-remove"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="upload-info">
                <span>{imagePreview.length} image(s) uploaded</span>
                <span className="upload-max">Max 10 images</span>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="form-tips">
              <h4>💡 Quick Tips</h4>
              <ul>
                <li>Use clear, well-lit photos</li>
                <li>Include exterior and interior shots</li>
                <li>Highlight special features</li>
                <li>Be accurate with mileage</li>
                <li>Set competitive pricing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/cars')}
            className="btn btn-secondary"
          >
            <FaTimes /> Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            <FaSave />
            {loading ? (
              <>
                <span className="spinner-border-sm"></span>
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Update Car' : 'Create Car'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
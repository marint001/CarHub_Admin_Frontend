// Mock API service for development
const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Auth
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@autoshow.com' && password === 'admin123') {
          resolve({ token: 'fake-jwt-token', user: { id: 1, name: 'Admin', email } });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  // Cars
  getCars: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, make: 'Toyota', model: 'Camry', year: 2023, price: 32500, status: 'Available' },
          { id: 2, make: 'BMW', model: 'X5', year: 2022, price: 55000, status: 'Sold' }
        ]);
      }, 500);
    });
  },

  createCar: (carData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: Date.now(), ...carData });
      }, 500);
    });
  },

  updateCar: (id, carData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, ...carData });
      }, 500);
    });
  },

  deleteCar: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  // Leads
  getLeads: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'John Doe', email: 'john@example.com', status: 'New' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Contacted' }
        ]);
      }, 500);
    });
  },

  updateLeadStatus: (id, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, status });
      }, 500);
    });
  }
};

export default api;
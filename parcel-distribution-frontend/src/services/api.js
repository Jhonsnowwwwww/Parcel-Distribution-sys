import axios from 'axios';

const API_BASE_URL = 'https://parcel-distribution-sys.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    const message = error.response?.data?.error || error.message || 'Network error';
    return Promise.reject(new Error(message));
  }
);

// Health check
export const checkHealth = () => api.get('/health');

// Parcel endpoints
export const parcelAPI = {
  processSingle: (parcelData) => api.post('/api/parcels/process', parcelData),
  processXML: (xmlData) => api.post('/api/parcels/process-xml', { xmlData }),
  getHistory: () => api.get('/api/parcels/history'),
};

// Department endpoints
export const departmentAPI = {
  getAll: () => api.get('/api/departments'),
  create: (departmentData) => api.post('/api/departments', departmentData),
  update: (id, updates) => api.put(`/api/departments/${id}`, updates),
  delete: (id) => api.delete(`/api/departments/${id}`),
};

export default api;
// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
import setupDatabase from './src/config/setupDatabase.js';

const parcelRoutes = require('./src/routes/parcels');
const departmentRoutes = require('./src/routes/departments');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/parcels', parcelRoutes);
app.use('/api/departments', departmentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Parcel Distribution System API is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
  console.log(`📦 Parcels API: http://localhost:${PORT}/api/parcels`);
  console.log(`🏢 Departments API: http://localhost:${PORT}/api/departments`);
});

setupDatabase();
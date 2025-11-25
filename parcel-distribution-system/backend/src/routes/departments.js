// backend/src/routes/departments.js
const express = require('express');
const router = express.Router();
const departmentService = require('../services/departmentService');

// Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await departmentService.getAll();
    res.json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create department
router.post('/', async (req, res) => {
  try {
    const department = await departmentService.create(req.body);
    res.json({ success: true, data: department });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update department
router.put('/:id', async (req, res) => {
  try {
    const department = await departmentService.update(req.params.id, req.body);
    res.json({ success: true, data: department });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete department
router.delete('/:id', async (req, res) => {
  try {
    const result = await departmentService.delete(req.params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
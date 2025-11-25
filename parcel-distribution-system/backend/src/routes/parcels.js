// backend/src/routes/parcels.js
const express = require('express');
const router = express.Router();
const parcelService = require('../services/parcelService');
const xmlParserService = require('../services/xmlParserService');

// Process single parcel
router.post('/process', async (req, res) => {
  try {
    const result = await parcelService.processParcel(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Process XML
router.post('/process-xml', async (req, res) => {
  try {
    const results = await xmlParserService.parseAndProcessXML(req.body.xmlData);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get history
router.get('/history', async (req, res) => {
  try {
    const history = await parcelService.getHistory();
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
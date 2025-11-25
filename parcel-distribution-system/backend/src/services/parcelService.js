// backend/src/services/parcelService.js
const db = require('../config/database');

class ParcelService {
  async processParcel(parcelData) {
    // 1. Save parcel
    const parcelResult = await db.query(
      'INSERT INTO parcels (weight, value, recipient, destination) VALUES ($1, $2, $3, $4) RETURNING *',
      [parcelData.weight, parcelData.value, parcelData.recipient, parcelData.destination]
    );
    
    const parcelId = parcelResult.rows[0].id;

    // 2. Get departments
    const departmentsResult = await db.query(
      'SELECT * FROM departments WHERE is_active = true ORDER BY priority'
    );
    const departments = departmentsResult.rows;

    // 3. Find eligible departments
    const eligibleDepartments = departments.filter(dept => {
      const parcelValue = parcelData[dept.condition_type];
      switch (dept.operator) {
        case '<=': return parcelValue <= dept.value;
        case '<': return parcelValue < dept.value;
        case '>': return parcelValue > dept.value;
        case '>=': return parcelValue >= dept.value;
        default: return false;
      }
    });

    // 4. Check insurance
    const requiresInsurance = parcelData.value >= 1000;

    // 5. Determine processing order
    let processingOrder = eligibleDepartments.map(d => d.name);
    if (requiresInsurance) {
      processingOrder = ['Insurance', ...processingOrder.filter(name => name !== 'Insurance')];
    }

    // 6. Save result
    await db.query(
      'INSERT INTO processing_results (parcel_id, requires_insurance, processing_order, final_departments) VALUES ($1, $2, $3, $4)',
      [parcelId, requiresInsurance, JSON.stringify(processingOrder), JSON.stringify(eligibleDepartments.map(d => d.name))]
    );

    return {
      id: parcelId,
      parcel: parcelData,
      departments: eligibleDepartments.map(d => d.name),
      requiresInsurance,
      processingOrder
    };
  }

  async getHistory() {
    const result = await db.query(`
      SELECT p.*, pr.requires_insurance, pr.processing_order, pr.final_departments
      FROM parcels p
      JOIN processing_results pr ON p.id = pr.parcel_id
      ORDER BY pr.processed_at DESC
      LIMIT 20
    `);
    return result.rows;
  }
}

module.exports = new ParcelService();
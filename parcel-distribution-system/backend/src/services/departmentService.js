// backend/src/services/departmentService.js
const db = require('../config/database');

class DepartmentService {
  async getAll() {
    const result = await db.query(
      'SELECT * FROM departments WHERE is_active = true ORDER BY priority'
    );
    return result.rows;
  }

  async create(department) {3
    const { name, condition_type, operator, value, priority = 0, color_theme = 'blue' } = department;
                   
    const result = await db.query(
      'INSERT INTO departments (name, condition_type, operator, value, priority, color_theme) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, condition_type, operator, value, priority, color_theme]
    );

    return result.rows[0];
  }

  async update(id, updates) {
    const result = await db.query(
      'UPDATE departments SET condition_type = $1, operator = $2, value = $3, priority = $4, color_theme = $5 WHERE id = $6 RETURNING *',
      [updates.condition_type, updates.operator, updates.value, updates.priority, updates.color_theme, id]
    );

    return result.rows[0];
  }

  async delete(id) {
    await db.query('UPDATE departments SET is_active = false WHERE id = $1', [id]);
    return { message: 'Department deleted' };
  }
}

module.exports = new DepartmentService();
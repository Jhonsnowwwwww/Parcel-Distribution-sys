// backend/src/config/setupDatabase.js
const { Client } = require('pg');
require('dotenv').config();

async function setupDatabase() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: 'postgres'
  });

  try {
    await client.connect();
    console.log('🔌 Connected to PostgreSQL');

    // Create database
    await client.query(`
      SELECT 'CREATE DATABASE parcel_system'
      WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'parcel_system')
    `);
    
    console.log('✅ Database checked/created');
    await client.end();
    
    // Connect to our database and create tables
    const dbClient = new Client({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: 'parcel_system'
    });

    await dbClient.connect();

    // Create parcels table
    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS parcels (
        id SERIAL PRIMARY KEY,
        weight DECIMAL(10,2) NOT NULL,
        value DECIMAL(10,2) NOT NULL,
        recipient VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create processing results table
    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS processing_results (
        id SERIAL PRIMARY KEY,
        parcel_id INTEGER REFERENCES parcels(id) ON DELETE CASCADE,
        requires_insurance BOOLEAN DEFAULT FALSE,
        processing_order JSONB,
        final_departments JSONB,
        processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create departments table
    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        condition_type VARCHAR(50) NOT NULL,
        operator VARCHAR(10) NOT NULL,
        value DECIMAL(10,2) NOT NULL,
        priority INTEGER DEFAULT 0,
        color_theme VARCHAR(50) DEFAULT 'blue',
        is_active BOOLEAN DEFAULT TRUE
      )
    `);

    // Insert default departments
    await dbClient.query(`
      INSERT INTO departments (name, condition_type, operator, value, priority, color_theme) 
      VALUES 
        ('Mail', 'weight', '<=', 1.00, 1, 'blue'),
        ('Regular', 'weight', '<=', 10.00, 2, 'green'),
        ('Heavy', 'weight', '>', 10.00, 3, 'orange'),
        ('Insurance', 'value', '>=', 1000.00, 0, 'red')
      ON CONFLICT (name) DO NOTHING
    `);

    console.log('✅ Tables created and seeded successfully');
    console.log('🎯 Ready to start the server!');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    await client.end();
  }
}

setupDatabase();
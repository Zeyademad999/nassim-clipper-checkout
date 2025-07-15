
const express = require('express');
const { getDatabase } = require('../database/connection');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Get all services
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const services = db.prepare('SELECT * FROM services ORDER BY name').all();
    
    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services'
    });
  }
});

// Create service
router.post('/', (req, res) => {
  try {
    const { name, price } = req.body;
    
    if (!name || price === undefined || price < 0) {
      return res.status(400).json({
        success: false,
        error: 'Valid name and price are required'
      });
    }

    const db = getDatabase();
    const id = uuidv4();
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO services (id, name, price, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(id, name, price, now, now);

    const newService = db.prepare('SELECT * FROM services WHERE id = ?').get(id);

    res.status(201).json({
      success: true,
      data: newService
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create service'
    });
  }
});

// Update service
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    
    const db = getDatabase();
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      UPDATE services 
      SET name = COALESCE(?, name), 
          price = COALESCE(?, price), 
          updated_at = ?
      WHERE id = ?
    `);

    const result = stmt.run(name, price, now, id);

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    const updatedService = db.prepare('SELECT * FROM services WHERE id = ?').get(id);

    res.json({
      success: true,
      data: updatedService
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update service'
    });
  }
});

// Delete service
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const stmt = db.prepare('DELETE FROM services WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    res.json({
      success: true
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete service'
    });
  }
});

module.exports = router;

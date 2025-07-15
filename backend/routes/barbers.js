
const express = require('express');
const { getDatabase } = require('../database/connection');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Get all barbers
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const barbers = db.prepare('SELECT * FROM barbers ORDER BY name').all();
    
    res.json({
      success: true,
      data: barbers
    });
  } catch (error) {
    console.error('Get barbers error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch barbers'
    });
  }
});

// Create barber
router.post('/', (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Barber name is required'
      });
    }

    const db = getDatabase();
    const id = uuidv4();
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO barbers (id, name, created_at, updated_at)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run(id, name.trim(), now, now);

    const newBarber = db.prepare('SELECT * FROM barbers WHERE id = ?').get(id);

    res.status(201).json({
      success: true,
      data: newBarber
    });
  } catch (error) {
    console.error('Create barber error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create barber'
    });
  }
});

// Update barber
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Barber name is required'
      });
    }

    const db = getDatabase();
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      UPDATE barbers 
      SET name = ?, updated_at = ?
      WHERE id = ?
    `);

    const result = stmt.run(name.trim(), now, id);

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        error: 'Barber not found'
      });
    }

    const updatedBarber = db.prepare('SELECT * FROM barbers WHERE id = ?').get(id);

    res.json({
      success: true,
      data: updatedBarber
    });
  } catch (error) {
    console.error('Update barber error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update barber'
    });
  }
});

// Delete barber
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const stmt = db.prepare('DELETE FROM barbers WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        error: 'Barber not found'
      });
    }

    res.json({
      success: true
    });
  } catch (error) {
    console.error('Delete barber error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete barber'
    });
  }
});

module.exports = router;

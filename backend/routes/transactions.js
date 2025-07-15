
const express = require('express');
const { getDatabase } = require('../database/connection');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Create transaction
router.post('/', (req, res) => {
  try {
    const { transaction, items } = req.body;
    
    if (!transaction || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Transaction and items are required'
      });
    }

    const db = getDatabase();
    const now = new Date().toISOString();
    const transactionId = uuidv4();
    const receiptNumber = `RCP-${Date.now()}`;

    // Start transaction
    const insertTransaction = db.transaction(() => {
      // Insert transaction
      const transactionStmt = db.prepare(`
        INSERT INTO transactions (id, receipt_number, customer_name, barber_id, service_date, subtotal, tax, total, created_at, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      transactionStmt.run(
        transactionId,
        receiptNumber,
        transaction.customer_name || null,
        transaction.barber_id || null,
        transaction.service_date,
        transaction.subtotal,
        transaction.tax,
        transaction.total,
        now,
        transaction.user_id || null
      );

      // Insert transaction items
      const itemStmt = db.prepare(`
        INSERT INTO transaction_items (id, transaction_id, service_id, quantity, unit_price, total_price)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      items.forEach(item => {
        itemStmt.run(
          uuidv4(),
          transactionId,
          item.service_id,
          item.quantity,
          item.unit_price,
          item.total_price
        );
      });
    });

    insertTransaction();

    // Get the created transaction with items
    const createdTransaction = db.prepare('SELECT * FROM transactions WHERE id = ?').get(transactionId);

    res.status(201).json({
      success: true,
      data: createdTransaction
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create transaction'
    });
  }
});

// Get transactions with pagination
router.get('/', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    const db = getDatabase();
    
    let whereClause = '';
    let params = [];
    
    if (startDate && endDate) {
      whereClause = 'WHERE service_date BETWEEN ? AND ?';
      params = [startDate, endDate];
    }

    const transactions = db.prepare(`
      SELECT * FROM transactions 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `).all(...params, limit, offset);

    const totalCount = db.prepare(`
      SELECT COUNT(*) as count FROM transactions ${whereClause}
    `).get(...params).count;

    res.json({
      success: true,
      data: {
        data: transactions,
        total: totalCount,
        page,
        limit
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transactions'
    });
  }
});

// Get transaction by ID with items
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const transaction = db.prepare('SELECT * FROM transactions WHERE id = ?').get(id);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    const items = db.prepare('SELECT * FROM transaction_items WHERE transaction_id = ?').all(id);

    res.json({
      success: true,
      data: { ...transaction, items }
    });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transaction'
    });
  }
});

module.exports = router;

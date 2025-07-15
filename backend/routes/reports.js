
const express = require('express');
const { getDatabase } = require('../database/connection');
const router = express.Router();

// Daily report
router.get('/daily', (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        error: 'Date parameter is required'
      });
    }

    const db = getDatabase();

    // Total revenue and transactions for the day
    const dailyStats = db.prepare(`
      SELECT 
        COUNT(*) as total_transactions,
        COALESCE(SUM(total), 0) as total_revenue
      FROM transactions 
      WHERE service_date = ?
    `).get(date);

    // Services sold
    const servicesSold = db.prepare(`
      SELECT 
        s.name as service_name,
        SUM(ti.quantity) as quantity,
        SUM(ti.total_price) as revenue
      FROM transaction_items ti
      JOIN services s ON ti.service_id = s.id
      JOIN transactions t ON ti.transaction_id = t.id
      WHERE t.service_date = ?
      GROUP BY s.id, s.name
      ORDER BY revenue DESC
    `).all(date);

    // Barber performance
    const barberPerformance = db.prepare(`
      SELECT 
        b.name as barber_name,
        COUNT(t.id) as transactions,
        COALESCE(SUM(t.total), 0) as revenue
      FROM transactions t
      LEFT JOIN barbers b ON t.barber_id = b.id
      WHERE t.service_date = ?
      GROUP BY b.id, b.name
      ORDER BY revenue DESC
    `).all(date);

    res.json({
      success: true,
      data: {
        total_revenue: dailyStats.total_revenue,
        total_transactions: dailyStats.total_transactions,
        services_sold: servicesSold,
        barber_performance: barberPerformance
      }
    });
  } catch (error) {
    console.error('Daily report error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate daily report'
    });
  }
});

// Date range report
router.get('/range', (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    if (!start_date || !end_date) {
      return res.status(400).json({
        success: false,
        error: 'Start date and end date are required'
      });
    }

    const db = getDatabase();

    // Total stats for the range
    const rangeStats = db.prepare(`
      SELECT 
        COUNT(*) as total_transactions,
        COALESCE(SUM(total), 0) as total_revenue
      FROM transactions 
      WHERE service_date BETWEEN ? AND ?
    `).get(start_date, end_date);

    // Daily breakdown
    const dailyBreakdown = db.prepare(`
      SELECT 
        service_date as date,
        COUNT(*) as transactions,
        COALESCE(SUM(total), 0) as revenue
      FROM transactions 
      WHERE service_date BETWEEN ? AND ?
      GROUP BY service_date
      ORDER BY service_date
    `).all(start_date, end_date);

    // Top services
    const topServices = db.prepare(`
      SELECT 
        s.name as service_name,
        SUM(ti.quantity) as quantity,
        SUM(ti.total_price) as revenue
      FROM transaction_items ti
      JOIN services s ON ti.service_id = s.id
      JOIN transactions t ON ti.transaction_id = t.id
      WHERE t.service_date BETWEEN ? AND ?
      GROUP BY s.id, s.name
      ORDER BY revenue DESC
      LIMIT 10
    `).all(start_date, end_date);

    // Barber performance
    const barberPerformance = db.prepare(`
      SELECT 
        b.name as barber_name,
        COUNT(t.id) as transactions,
        COALESCE(SUM(t.total), 0) as revenue
      FROM transactions t
      LEFT JOIN barbers b ON t.barber_id = b.id
      WHERE t.service_date BETWEEN ? AND ?
      GROUP BY b.id, b.name
      ORDER BY revenue DESC
    `).all(start_date, end_date);

    res.json({
      success: true,
      data: {
        total_revenue: rangeStats.total_revenue,
        total_transactions: rangeStats.total_transactions,
        daily_breakdown: dailyBreakdown,
        top_services: topServices,
        barber_performance: barberPerformance
      }
    });
  } catch (error) {
    console.error('Range report error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate range report'
    });
  }
});

module.exports = router;


const { initializeDatabase } = require('../database/connection');

console.log('Initializing database...');

try {
  initializeDatabase();
  console.log('✅ Database initialization completed');
  process.exit(0);
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  process.exit(1);
}

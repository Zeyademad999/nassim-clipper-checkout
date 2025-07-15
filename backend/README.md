
# Nassim Select Barber - Backend API

Express.js backend with SQLite database for the barbershop POS system.

## Quick Start

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Initialize database:**
   ```bash
   npm run init-db
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001/api`

## Features

- ✅ SQLite database with WAL mode for performance
- ✅ RESTful API endpoints for all operations
- ✅ Real-time data synchronization
- ✅ User authentication (admin/pos)
- ✅ Complete CRUD operations
- ✅ Transaction management
- ✅ Reporting and analytics
- ✅ Error handling and validation

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Barbers
- `GET /api/barbers` - Get all barbers
- `POST /api/barbers` - Create barber
- `PUT /api/barbers/:id` - Update barber
- `DELETE /api/barbers/:id` - Delete barber

### Transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions` - Get transactions (paginated)
- `GET /api/transactions/:id` - Get transaction with items

### Reports
- `GET /api/reports/daily?date=YYYY-MM-DD` - Daily report
- `GET /api/reports/range?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` - Date range report

## Database Schema

The SQLite database includes:
- `users` - Authentication and user management
- `services` - Barbershop services
- `barbers` - Staff members
- `transactions` - Customer receipts/bills
- `transaction_items` - Individual services within each transaction

## Default Data

The system comes with default data:
- Admin user: `admin/admin`
- POS user: `floki/floki`
- 6 default services (Hair Cutting, Hair Washing, etc.)
- 3 default barbers (Ahmed, Hassan, Omar)

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in environment
2. Use a proper JWT secret
3. Consider using PM2 for process management
4. Set up database backups
5. Use HTTPS with proper SSL certificates

## Real-time Synchronization

The backend supports real-time data synchronization between admin and POS interfaces. When data is modified in the admin panel, it's immediately available in the POS system without requiring page refreshes.

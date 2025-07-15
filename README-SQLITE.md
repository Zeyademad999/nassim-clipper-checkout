
# SQLite Integration Setup

This document outlines the SQLite database preparation for the Nassim Select Barber POS system.

## Database Schema

The SQLite database schema is defined in `src/database/schema.sql` with the following tables:

- **users**: Authentication and user management
- **services**: Barbershop services (Hair Cutting, Hair Washing, etc.)
- **barbers**: Staff members
- **transactions**: Customer receipts/bills
- **transaction_items**: Individual services within each transaction

## API Layer

The API service layer (`src/services/api.ts`) provides:
- RESTful API methods for all CRUD operations
- Type-safe requests with TypeScript
- Error handling and response formatting
- Authentication endpoints

## Custom Hooks

Database hooks (`src/hooks/useDatabase.ts`) provide:
- `useServices()`: Services management with CRUD operations
- `useBarbers()`: Barbers management with CRUD operations  
- `useAuth()`: Authentication state management

## Migration Tools

Migration utilities (`src/utils/migration.ts`) help transition from localStorage:
- Convert existing localStorage data to database format
- Backup current data before migration
- Clear localStorage after successful migration

## Next Steps for Backend Implementation

1. **Choose Backend Framework:**
   ```bash
   # Option 1: Express.js with better-sqlite3
   npm install express better-sqlite3 @types/better-sqlite3
   
   # Option 2: Fastify with better-sqlite3
   npm install fastify better-sqlite3 @types/better-sqlite3
   
   # Option 3: Bun with SQLite
   bun add better-sqlite3
   ```

2. **Create Backend Server:**
   - Set up Express/Fastify server
   - Initialize SQLite database with schema
   - Implement API endpoints matching the service layer
   - Add authentication middleware
   - Set up CORS for frontend communication

3. **Database Operations:**
   - Implement connection pooling
   - Add database migrations
   - Set up backup/restore procedures
   - Add logging and monitoring

4. **Frontend Integration:**
   - Update API_BASE_URL in `src/services/api.ts`
   - Replace localStorage hooks with database hooks in components
   - Test all CRUD operations
   - Run migration tools to transfer existing data

## File Structure After Backend Setup

```
backend/
├── server.js (or server.ts)
├── database/
│   ├── connection.js
│   └── migrations/
├── routes/
│   ├── auth.js
│   ├── services.js
│   ├── barbers.js
│   ├── transactions.js
│   └── reports.js
└── middleware/
    ├── auth.js
    └── validation.js
```

## Environment Variables

```env
DB_PATH=./database/barbershop.db
JWT_SECRET=your-secret-key
PORT=3001
CORS_ORIGIN=http://localhost:8080
```

The frontend is now prepared for SQLite integration. All database operations are abstracted through the API service layer, making the transition seamless once the backend is implemented.

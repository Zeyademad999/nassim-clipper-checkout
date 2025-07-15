
-- SQLite Database Schema for Nassim Select Barber POS System

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    user_type TEXT CHECK(user_type IN ('admin', 'pos')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL CHECK(price >= 0),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Barbers table
CREATE TABLE IF NOT EXISTS barbers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table for receipts/bills
CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    receipt_number TEXT UNIQUE NOT NULL,
    customer_name TEXT,
    barber_id TEXT,
    service_date DATE NOT NULL,
    subtotal REAL NOT NULL CHECK(subtotal >= 0),
    tax REAL NOT NULL CHECK(tax >= 0),
    total REAL NOT NULL CHECK(total >= 0),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT,
    FOREIGN KEY (barber_id) REFERENCES barbers(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Transaction items table (services in each transaction)
CREATE TABLE IF NOT EXISTS transaction_items (
    id TEXT PRIMARY KEY,
    transaction_id TEXT NOT NULL,
    service_id TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    unit_price REAL NOT NULL CHECK(unit_price >= 0),
    total_price REAL NOT NULL CHECK(total_price >= 0),
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(service_date);
CREATE INDEX IF NOT EXISTS idx_transactions_receipt ON transactions(receipt_number);
CREATE INDEX IF NOT EXISTS idx_transaction_items_transaction ON transaction_items(transaction_id);
CREATE INDEX IF NOT EXISTS idx_services_name ON services(name);
CREATE INDEX IF NOT EXISTS idx_barbers_name ON barbers(name);

-- Insert default users
INSERT OR IGNORE INTO users (id, username, password_hash, user_type) VALUES 
('admin-1', 'admin', 'admin', 'admin'),
('pos-1', 'floki', 'floki', 'pos');

-- Insert default services
INSERT OR IGNORE INTO services (id, name, price) VALUES 
('service-1', 'Hair Cutting', 25.00),
('service-2', 'Hair Washing', 15.00),
('service-3', 'Body Massage', 45.00),
('service-4', 'Body & Spa', 65.00),
('service-5', 'Hair Color', 55.00),
('service-6', 'Stylist Shaving', 20.00);

-- Insert default barbers
INSERT OR IGNORE INTO barbers (id, name) VALUES 
('barber-1', 'Ahmed'),
('barber-2', 'Hassan'),
('barber-3', 'Omar');

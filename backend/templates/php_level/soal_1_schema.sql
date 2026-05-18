-- ============================================================
-- php_level / soal_1_schema.sql
-- Studi Kasus: Toko Online
-- ============================================================

CREATE TABLE IF NOT EXISTS products (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  name     TEXT    NOT NULL,
  price    REAL    NOT NULL,
  stock    INTEGER NOT NULL DEFAULT 0,
  category TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT
);

CREATE TABLE IF NOT EXISTS orders (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id  INTEGER NOT NULL REFERENCES customers(id),
  order_date   TEXT    NOT NULL DEFAULT (date('now')),
  total        REAL    NOT NULL DEFAULT 0,
  status       TEXT    NOT NULL DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS order_items (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id   INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  qty        INTEGER NOT NULL DEFAULT 1,
  price      REAL    NOT NULL
);

-- Seed: Products
INSERT INTO products (name, price, stock, category) VALUES
  ('Laptop Asus VivoBook', 8500000, 10, 'Elektronik'),
  ('Mouse Wireless Logitech', 250000, 50, 'Aksesoris'),
  ('Keyboard Mechanical', 450000, 30, 'Aksesoris'),
  ('Monitor 24 inch FHD', 2100000, 15, 'Elektronik'),
  ('Headset Gaming', 350000, 20, 'Aksesoris');

-- Seed: Customers
INSERT INTO customers (name, email, phone) VALUES
  ('Budi Santoso', 'budi@email.com', '081234567890'),
  ('Siti Rahayu', 'siti@email.com', '089876543210');

-- Seed: Orders
INSERT INTO orders (customer_id, order_date, total, status) VALUES
  (1, '2024-01-10', 8750000, 'completed'),
  (2, '2024-01-12', 800000,  'pending');

-- Seed: Order Items
INSERT INTO order_items (order_id, product_id, qty, price) VALUES
  (1, 1, 1, 8500000),
  (1, 2, 1, 250000),
  (2, 3, 1, 450000),
  (2, 5, 1, 350000);

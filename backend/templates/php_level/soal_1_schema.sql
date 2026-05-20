CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL
);

INSERT INTO users (name) VALUES
  ('Admin'),
  ('Budi Santoso'),
  ('Siti Rahayu');

INSERT INTO products (name, price) VALUES
  ('Laptop', 15000000),
  ('Mouse', 250000),
  ('Keyboard', 500000);

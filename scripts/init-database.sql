-- Create database
CREATE DATABASE IF NOT EXISTS techforge_pc;
USE techforge_pc;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  specs JSON NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500),
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  status ENUM('new', 'contacted', 'resolved') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT IGNORE INTO products (name, category, price, specs, description, image, visible) VALUES 
('Gaming Beast Pro', 'Gaming', 2499.00, '["RTX 4080", "Intel i7-13700K", "32GB DDR5", "1TB NVMe SSD"]', 'Ultimate gaming performance for 4K gaming and streaming.', '/placeholder.svg?height=300&width=400&text=Gaming+Beast+Pro', true),
('Workstation Elite', 'Workstation', 3299.00, '["RTX 4070 Ti", "Intel i9-13900K", "64GB DDR5", "2TB NVMe SSD"]', 'Professional workstation for content creation and development.', '/placeholder.svg?height=300&width=400&text=Workstation+Elite', true),
('Budget Builder', 'Budget', 899.00, '["GTX 1660 Super", "AMD Ryzen 5 5600", "16GB DDR4", "500GB SSD"]', 'Affordable gaming PC that does not compromise on performance.', '/placeholder.svg?height=300&width=400&text=Budget+Builder', false);

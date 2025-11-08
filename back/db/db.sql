-- ============================================
-- USUARIOS
-- ============================================
CREATE TABLE
    users (
        id VARCHAR(36) PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        hashedPassword VARCHAR(255) NOT NULL,
        currency VARCHAR(3) NOT NULL DEFAULT 'COP', -- USD, COP, EUR, etc.
        budget_reset_day INT DEFAULT 1, -- Día del mes (1-31)
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email)
    );

-- ============================================
-- CATEGORÍAS
-- ============================================
CREATE TABLE
    categories (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        name VARCHAR(100) NOT NULL,
        type ENUM ('income', 'expense') NOT NULL,
        color VARCHAR(7) NOT NULL, -- HEX color #FF5733
        icon VARCHAR(50), -- Nombre del ícono
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_category (user_id, name, type),
        INDEX idx_user_type (user_id, type)
    );

-- ============================================
-- SUBCATEGORÍAS
-- ============================================
CREATE TABLE
    subcategories (
        id VARCHAR(36) PRIMARY KEY,
        category_id VARCHAR(36) NOT NULL,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
        UNIQUE KEY unique_category_subcategory (category_id, name),
        INDEX idx_category (category_id)
    );

-- ============================================
-- TRANSACCIONES
-- ============================================
CREATE TABLE
    transactions (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        category_id VARCHAR(36) NOT NULL,
        subcategory_id VARCHAR(36) NOT NULL, -- OBLIGATORIO para gastos
        amount DECIMAL(15, 2) NOT NULL,
        type ENUM ('income', 'expense') NOT NULL,
        description TEXT,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT,
        FOREIGN KEY (subcategory_id) REFERENCES subcategories (id) ON DELETE RESTRICT,
        INDEX idx_user_date (user_id, date),
        INDEX idx_user_type (user_id, type),
        INDEX idx_category (category_id),
        INDEX idx_subcategory (subcategory_id)
    );

-- ============================================
-- PRESUPUESTOS
-- ============================================
CREATE TABLE
    budgets (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        category_id VARCHAR(36), -- NULL = presupuesto global
        amount DECIMAL(15, 2) NOT NULL,
        period_start DATE NOT NULL,
        period_end DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_category_period (user_id, category_id, period_start),
        INDEX idx_user_period (user_id, period_start, period_end)
    );

-- ============================================
-- METAS DE AHORRO
-- ============================================
CREATE TABLE
    goals (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        name VARCHAR(100) NOT NULL,
        target_amount DECIMAL(15, 2) NOT NULL,
        current_amount DECIMAL(15, 2) DEFAULT 0,
        deadline DATE NOT NULL,
        status ENUM ('active', 'completed', 'archived') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        INDEX idx_user_status (user_id, status)
    );

-- ============================================
-- APORTES A METAS (Vinculados a transacciones)
-- ============================================
CREATE TABLE
    goal_contributions (
        id VARCHAR(36) PRIMARY KEY,
        goal_id VARCHAR(36) NOT NULL,
        transaction_id VARCHAR(36) NOT NULL, -- Transacción de INGRESO
        amount DECIMAL(15, 2) NOT NULL,
        contribution_date DATE NOT NULL,
        note TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (goal_id) REFERENCES goals (id) ON DELETE CASCADE,
        FOREIGN KEY (transaction_id) REFERENCES transactions (id) ON DELETE CASCADE,
        INDEX idx_goal (goal_id),
        INDEX idx_transaction (transaction_id)
    );
-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        avatar VARCHAR(50) DEFAULT 'default',
        -- Preferences
        currency VARCHAR(3) DEFAULT 'USD' NOT NULL,
        -- Metadata
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        -- Constraints
        CONSTRAINT valid_email CHECK (
            email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
        ),
        CONSTRAINT valid_currency CHECK (currency REGEXP '^[A-Z]{3}$')
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Indexes
CREATE INDEX idx_users_email ON users (email);

CREATE INDEX idx_users_created_at ON users (created_at);

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE
    categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(50) NOT NULL,
        type ENUM ('income', 'expense') NOT NULL,
        color VARCHAR(7) NOT NULL,
        icon VARCHAR(10) NOT NULL,
        -- Order for display
        display_order INT DEFAULT 0,
        -- Metadata
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        -- Constraints
        CONSTRAINT fk_categories_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        CONSTRAINT unique_user_category_name UNIQUE (user_id, name, type),
        CONSTRAINT valid_color CHECK (color REGEXP '^#[0-9A-Fa-f]{6}$')
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Indexes
CREATE INDEX idx_categories_user_id ON categories (user_id);

CREATE INDEX idx_categories_type ON categories (type);

CREATE INDEX idx_categories_user_type ON categories (user_id, type);

-- ============================================
-- TRANSACTIONS TABLE
-- ============================================
CREATE TABLE
    transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        category_id INT,
        amount DECIMAL(15, 2) NOT NULL,
        type ENUM ('income', 'expense') NOT NULL,
        date DATE NOT NULL,
        description VARCHAR(255) NOT NULL,
        notes TEXT,
        -- Metadata
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        -- Constraints
        CONSTRAINT fk_transactions_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        CONSTRAINT fk_transactions_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL,
        CONSTRAINT valid_amount CHECK (amount > 0)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Indexes (CRÍTICOS para performance)
CREATE INDEX idx_transactions_user_id ON transactions (user_id);

CREATE INDEX idx_transactions_category_id ON transactions (category_id);

CREATE INDEX idx_transactions_date ON transactions (date);

CREATE INDEX idx_transactions_user_date ON transactions (user_id, date DESC);

-- ============================================
-- BUDGETS TABLE
-- ============================================
CREATE TABLE
    budgets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        category_id INT NOT NULL,
        amount DECIMAL(15, 2) NOT NULL,
        -- Period
        month INT NOT NULL,
        year INT NOT NULL,
        -- Alerts
        alert_threshold DECIMAL(5, 2) DEFAULT 80.00,
        alert_sent BOOLEAN DEFAULT FALSE,
        -- Metadata
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        -- Constraints
        CONSTRAINT fk_budgets_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        CONSTRAINT fk_budgets_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
        CONSTRAINT unique_user_category_period UNIQUE (user_id, category_id, month, year),
        CONSTRAINT valid_amount_budget CHECK (amount > 0),
        CONSTRAINT valid_month CHECK (
            month >= 1
            AND month <= 12
        ),
        CONSTRAINT valid_year CHECK (year >= 2000),
        CONSTRAINT valid_threshold CHECK (
            alert_threshold > 0
            AND alert_threshold <= 100
        )
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Indexes
CREATE INDEX idx_budgets_user_id ON budgets (user_id);

CREATE INDEX idx_budgets_category_id ON budgets (category_id);

CREATE INDEX idx_budgets_period ON budgets (year, month);

CREATE INDEX idx_budgets_user_period ON budgets (user_id, year, month);

-- ============================================
-- VIEWS ÚTILES
-- ============================================
-- Vista para obtener balance por categoría en un período
CREATE VIEW
    v_category_spending AS
SELECT
    t.user_id,
    t.category_id,
    c.name as category_name,
    c.type as category_type,
    c.color,
    c.icon,
    YEAR (t.date) as year,
    MONTH (t.date) as month,
    SUM(t.amount) as total_amount,
    COUNT(*) as transaction_count
FROM
    transactions t
    JOIN categories c ON t.category_id = c.id
GROUP BY
    t.user_id,
    t.category_id,
    c.name,
    c.type,
    c.color,
    c.icon,
    year,
    month;

-- Vista para resumen mensual del usuario
CREATE VIEW
    v_monthly_summary AS
SELECT
    user_id,
    YEAR (date) as year,
    MONTH (date) as month,
    SUM(
        CASE
            WHEN type = 'income' THEN amount
            ELSE 0
        END
    ) as total_income,
    SUM(
        CASE
            WHEN type = 'expense' THEN amount
            ELSE 0
        END
    ) as total_expenses,
    SUM(
        CASE
            WHEN type = 'income' THEN amount
            ELSE - amount
        END
    ) as net_balance,
    COUNT(*) as transaction_count
FROM
    transactions
GROUP BY
    user_id,
    year,
    month;

-- Vista para progreso de presupuestos
CREATE VIEW
    v_budget_progress AS
SELECT
    b.id as budget_id,
    b.user_id,
    b.category_id,
    c.name as category_name,
    c.color,
    c.icon,
    b.amount as budget_amount,
    b.month,
    b.year,
    b.alert_threshold,
    IFNULL (SUM(t.amount), 0) as spent_amount,
    ROUND((IFNULL (SUM(t.amount), 0) / b.amount * 100), 2) as percentage_used,
    b.amount - IFNULL (SUM(t.amount), 0) as remaining_amount
FROM
    budgets b
    JOIN categories c ON b.category_id = c.id
    LEFT JOIN transactions t ON t.category_id = b.category_id
    AND t.user_id = b.user_id
    AND MONTH (t.date) = b.month
    AND YEAR (t.date) = b.year
    AND t.type = 'expense'
GROUP BY
    b.id,
    b.user_id,
    b.category_id,
    c.name,
    c.color,
    c.icon,
    b.amount,
    b.month,
    b.year,
    b.alert_threshold;
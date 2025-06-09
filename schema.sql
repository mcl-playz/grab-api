-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

-- Permissions
CREATE TABLE permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE
);
CREATE TABLE role_permissions ( -- Link certain permissions to certain roles
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

-- Roles
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE
);
CREATE TABLE user_roles ( -- Link certain roles to certain users
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Transport Types
CREATE TABLE transport_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
);

-- Leave Types
CREATE TABLE leave_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
);

-- Hosts
CREATE TABLE hosts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(10) NOT NULL, -- Sufficient length for "0000 000 000"
    -- CHECK constraint to enforce the format "0000 000 000"
    CONSTRAINT chk_phone_format CHECK (phone REGEXP '^[0-9]{4} [0-9]{3} [0-9]{3}$'),
);

-- Leaves
CREATE TABLE leaves (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('PENDING', 'APPROVED', 'DENIED') NOT NULL,
    host_id INT,
    leave_type_id INT,
    departure_date DATETIME NOT NULL,
    return_date DATETIME NOT NULL,
    departure_transport_id INT,
    return_transport_id INT,
    destination VARCHAR(50) NOT NULL,
    notes VARCHAR(255),

    -- Foreign Key Constraints
    CONSTRAINT fk_leave_type
        FOREIGN KEY (leave_type_id) REFERENCES leave_types(id)
        ON DELETE SET NULL ON UPDATE CASCADE, -- Prevent deletion of leave type if leaves are associated

    CONSTRAINT fk_host
        FOREIGN KEY (host_id) REFERENCES hosts(id)
        ON DELETE SET NULL ON UPDATE CASCADE -- Prevent deletion of host if leaves are associated

    CONSTRAINT fk_departure_transport
        FOREIGN KEY (departure_transport_id) REFERENCES transport_types(id)
        ON DELETE SET NULL ON UPDATE CASCADE, -- If a transport type is deleted, set to NULL; update if ID changes

    CONSTRAINT fk_return_transport
        FOREIGN KEY (return_transport_id) REFERENCES transport_types(id)
        ON DELETE SET NULL ON UPDATE CASCADE,
)

-- Create indexes for fast queries
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);

CREATE INDEX idx_role_permissions_role_id ON role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission_id ON role_permissions(permission_id);

-- Insert seed data
INSERT INTO permissions (name) VALUES ("ADMINISTRATOR");
INSERT INTO roles (name) VALUES ("Administrator");
INSERT INTO role_permissions (role_id, permission_id) VALUES ("1", "1");
INSERT INTO users (first_name, last_name, email, password) VALUES ("Jasper", "Green", "elvi.green11@gmail.com", "test");
INSERT INTO user_roles (user_id, role_id) VALUES ("1", "1");
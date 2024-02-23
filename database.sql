CREATE TABLE Employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    name TEXT DEFAULT NULL,
    phone TEXT DEFAULT NULL,
    email TEXT DEFAULT NULL,
    sex TEXT DEFAULT NULL,
    avatar BLOB DEFAULT NULL
);

CREATE INDEX idx_code ON Employees (code);

CREATE TABLE Departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT,
    name TEXT NOT NULL
);

CREATE TABLE DepartmentEmployees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    department_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Department(id),
    FOREIGN KEY (employee_id) REFERENCES Employee(id)
);
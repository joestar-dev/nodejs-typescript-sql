CREATE TABLE diagnosis (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    name_treatment VARCHAR(500) NOT NULL,
    drug_administered VARCHAR(500) NOT NULL,
    doctor_name VARCHAR(300) NOT NULL,
    patient_email VARCHAR(500) NOT NULL,
    bill INT NOT NULL,
    date VARCHAR(300) NOT NULL,
    paid INT DEFAULT 0 NOT NULL,
    description VARCHAR(500) NOT NULL,
    patient_status VARCHAR(200) NOT NULL,
    issent INT DEFAULT 0 NOT NULL
);

CREATE TABLE appointment (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    patient_name VARCHAR(500) NOT NULL,
    doctor_email VARCHAR(500) NOT NULL,
    patient_email VARCHAR(200) NOT NULL,
    date VARCHAR(200) NOT NULL,
    issent INT DEFAULT 0 NOT NULL
);

CREATE TABLE users (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    email VARCHAR(500) NOT NULL,
    role VARCHAR(500) NOT NULL,
    password VARCHAR(500) NOT NULL,
    issent INT DEFAULT 0 NOT NULL
);

CREATE TABLE patients (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    resident_area VARCHAR(500) NOT NULL,
    room_admitted VARCHAR(500) NOT NULL,
    admission_no VARCHAR(500) NOT NULL,
    id_no INT NOT NULL,
    email VARCHAR(500) NOT NULL,
    issent INT DEFAULT 0 NOT NULL,
    status VARCHAR(200) DEFAULT 'unknown' NOT NULL
);
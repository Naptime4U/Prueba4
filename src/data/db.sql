DROP DATABASE IF EXISTS hospital;

CREATE DATABASE hospital;
USE hospital;


CREATE TABLE medicos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    localidad VARCHAR(200),
    fecha_nacimiento DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE pacientes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    localidad VARCHAR(200),
    fecha_nacimiento DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ALTER TABLE alumnos ADD COLUMN imagen VARCHAR(200) AFTER localidad;

INSERT INTO medicos (nombre, localidad, fecha_nacimiento) 
VALUES 
  ('Ivan', 'Montilla', '1990-01-01'),
  ('Jaime', 'La Rambla', '1990-01-01'),
  ('Raul', 'Lucena', '1990-01-01');

  INSERT INTO pacientes (nombre, localidad, fecha_nacimiento) 
VALUES 
  ('Juan', 'Melbourne', '1990-01-01'),
  ('David', 'Quebec', '1990-01-01'),
  ('Carlos', 'Londres', '1990-01-01');
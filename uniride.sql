SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";



-- Create the 'Uniride' database
CREATE DATABASE Uniride;

-- Use the 'Uniride' database
USE Uniride;

-- Create 'Users' table
CREATE TABLE users (
    userId INT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    verification_status BOOLEAN
);

-- Create 'Verify' table
CREATE TABLE verify (
    userId INT,
    username VARCHAR(255),
    email VARCHAR(255),
    FOREIGN KEY (username) REFERENCES Users(username)
);

-- Create 'login' table
CREATE TABLE login (
    userId INT,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    FOREIGN KEY (username) REFERENCES Users(username)
);

-- Create 'Drivers' table
CREATE TABLE drivers (
    driverId INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    dob DATE,
    gender VARCHAR(50),
    address TEXT,
    phone VARCHAR(50),
    image BLOB
);

-- Create 'Ride' table
CREATE TABLE ride (
    rideId INT PRIMARY KEY,
    passenger_name VARCHAR(255),
    driver_name VARCHAR(255),
    date DATE,
    time TIME,
    email VARCHAR(255),
    phone VARCHAR(50),
    destination TEXT,
    FOREIGN KEY (passenger_name) REFERENCES Users(username)
);

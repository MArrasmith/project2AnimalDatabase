DROP DATABASE IF EXISTS animal_kingdom;
CREATE DATABASE animal_kingdom;

USE animal_kingdom;

CREATE TABLE animals (
    
    animal_name VARCHAR(30) NOT NULL,
    fun_fact VARCHAR(300) NOT NULL,
    left_by VARCHAR(50)
);
-- Migration number: 0000 	 2024-02-24T01:55:46.755Z
DROP TABLE IF EXISTS in_progress_blood_pressure_records;
CREATE TABLE in_progress_blood_pressure_records (
    user_id VARCHAR(32) PRIMARY KEY,
    diastolic_blood_pressure INTEGER,
    systolic_blood_pressure INTEGER,
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS blood_pressure_records;
CREATE TABLE blood_pressure_records (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(32) NOT NULL,
    diastolic_blood_pressure INTEGER,
    systolic_blood_pressure INTEGER,
    date DATE
);

CREATE TABLE zones ( 
    LocationID INTEGER PRIMARY KEY,
    Borough TEXT NOT NULL,
    Zone TEXT NOT NULL,
    service_zone TEXT  
);

CREATE TABLE payment_types (
    payment_type_id INTEGER PRIMARY KEY,
    payment_description TEXT NOT NULL
);

CREATE TABLE vendors (
    vendor_id INTEGER PRIMARY KEY,
    vendor_name TEXT NOT NULL
);

CREATE TABLE rate_codes(
    rate_code_id INTEGER PRIMARY KEY,
    rate_description TEXT NOT NULL
);

CREATE TABLE excluded_records(
    record_id INTEGER PRIMARY KEY,
    reason TEXT NOT NULL,
    raw_data TEXT,
    logged_at TEXT NOT NULL
);

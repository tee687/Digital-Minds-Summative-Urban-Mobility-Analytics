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

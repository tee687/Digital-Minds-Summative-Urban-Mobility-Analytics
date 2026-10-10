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
CREATE TABLE trips(
    trip_id INTEGER PRIMARY KEY,
    pickup_datetime TEXT NOT NULL,
    dropoff_datetime TEXT NOT NULL,
    passenger_count INTEGER NOT NULL,
    trip_distance REAL NOT NULL,
    pickup_location_id INTEGER NOT NULL REFERENCES zones(LocationID),
    dropoff_location_id INTEGER NOT NULL REFERENCES zones(LocationID),
    payment_type_id INTEGER NOT NULL REFERENCES payment_types(payment_type_id),
    fare_amount REAL NOT NULL,
    extra REAL NOT NULL,
    mta_tax REAL NOT NULL,
    tip_amount REAL NOT NULL,
    tolls_amount REAL NOT NULL,
    improvement_surcharge REAL NOT NULL,
    congestion_surcharge REAL,
    total_amount REAL NOT NULL,
    vendor_id INTEGER NOT NULL REFERENCES vendors(vendor_id),
    rate_code_id INTEGER NOT NULL REFERENCES rate_codes(rate_code_id)
);

 CREATE INDEX idx_trips_pickup_datetime ON trips(pickup_datetime);
CREATE INDEX idx_trips_pickup_location_id ON trips(pickup_location_id);
CREATE INDEX idx_trips_dropoff_location_id ON trips(dropoff_location_id);
Digital Minds - Urban Mobility Data Explorer
============================================

Full-stack analysis of New York City Yellow Taxi trips from January 2019,
built on the official NYC Taxi and Limousine Commission dataset.


Overview
--------

This project processes 7.5 million raw NYC taxi trip records, cleans them,
enriches them with taxi zone information, and loads them into a normalized
SQLite database. A frontend dashboard allows users to explore urban mobility
patterns such as average fare by hour, trip distance by zone, and pickup
hotspots across the city.


Repository Structure
--------------------

backend/                Backend service and API
codevibe-reports/       Authorship reports for team members
data/                   Reference data and cleaned trip data
database/               Schema definition and ETL loader
docs/                   Diagrams and documentation
etl/                    Supporting ETL scripts
frontend/               Dashboard user interface

requirements.txt        Python dependencies

**SYSTEM ARCHITECTURE**

<img width="1025" height="687" alt="image" src="https://github.com/user-attachments/assets/9d50fd4d-4c04-4702-abac-8641000eec4d" />



Database
--------

The database is defined in database/schema.sql and loaded by
database/load_data.py. It contains six tables:

<img width="840" height="512" alt="image" src="https://github.com/user-attachments/assets/2871fafd-1027-4317-96b0-de54c6d787e0" />


Fact table
    trips               Approximately 7.57 million rows

Dimension tables
    zones               LocationID to Borough, Zone, service_zone
    vendors             vendor_id to vendor_name
    payment_types       payment_type_id to description
    rate_codes          rate_code_id to description

Audit table
    excluded_records    Records of rows removed during cleaning

All dimension tables are linked to the trips table through foreign keys,
ensuring referential integrity across the schema.


Indexes
-------

    idx_trips_pickup_datetime
    idx_trips_pickup_location_id
    idx_trips_dropoff_location_id

These indexes were chosen because the dashboard filters trips by time and
by pickup and dropoff zone.


Derived Features
----------------

Three derived columns are computed during the ETL pipeline:

    trip_duration_min       Trip length in minutes
    avg_speed_mph           Trip distance divided by duration in hours
    fare_per_mile           Fare amount divided by trip distance


Running the Project
-------------------

    python database/load_data.py

This creates the database file, loads all zone and lookup tables, and
inserts every trip record in chunks of 100,000 rows.


Data Source
-----------

NYC Taxi and Limousine Commission Trip Record Data
https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page

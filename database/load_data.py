import sqlite3
import pandas as pd
DB_PATH ="taxi.db"
SCHEMA_PATH ="database/schema.sql" 

def create_database():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("PRAGMA foreign_keys = ON")
    with open(SCHEMA_PATH) as f:
         conn.executescript(f.read())
    return conn

def load_zones(conn):
    df = pd.read_csv("data/taxi_zone_lookup .csv", keep_default_na=False)
    df = df.dropna(subset=["Borough", "Zone"])
    df.to_sql("zones", conn, if_exists="append", index=False)
    
def load_lookups(conn):
    conn.executemany("INSERT INTO payment_types VALUES (?, ?)", [
        (1, "Credit card"), (2, "Cash"), (3, "No charge"),
        (4, "Dispute"), (5, "Unknown"), (6, "Voided trip")])
    conn.executemany("INSERT INTO vendors VALUES(?, ?)",[
        (1, "Creative Mobile Technologies"), (2, "Verifone Inc."), 
        (4, "Curb Mobility, LLC")])
    conn.executemany("INSERT INTO rate_codes VALUES (?, ?)", [
        (1, "Standard rate"), (2, "JFK"), (3, "Newark"),
        (4, "Nassau or Westchester"), (5, "Negotiated fare"), (6, "Group ride"), 
        (99, "Unknown")])
    conn.commit()   
    
    
COLUMN_MAP = {
    "tpep_pickup_datetime": "pickup_datetime",
    "tpep_dropoff_datetime": "dropoff_datetime",
    "PULocationID": "pickup_location_id",
    "DOLocationID": "dropoff_location_id",
    "VendorID": "vendor_id",
    "RatecodeID": "rate_code_id",
    "payment_type": "payment_type_id",
}   

KEEP_COLUMNS = [
    "pickup_datetime", "dropoff_datetime", "passenger_count", "trip_distance",
    "pickup_location_id", "dropoff_location_id", "payment_type_id",
    "fare_amount", "extra", "mta_tax", "tip_amount", "tolls_amount",
    "improvement_surcharge", "congestion_surcharge", "total_amount",
    "vendor_id", "rate_code_id",
]
def load_trips(conn, csv_path, max_rows=None):
    total = 0
    for chunk in pd.read_csv(csv_path, chunksize=100000):
        chunk = chunk.rename(columns=COLUMN_MAP)
        chunk = chunk[KEEP_COLUMNS]
        chunk.to_sql("trips", conn, if_exists="append", index=False)
        total = total + len(chunk)
        if max_rows is not None and total >= max_rows:
            break
    conn.commit()
    return total
    
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
    
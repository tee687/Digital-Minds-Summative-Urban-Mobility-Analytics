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
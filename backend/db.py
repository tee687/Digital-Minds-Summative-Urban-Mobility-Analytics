import os
import  sqlite3

base_dir = os.path.dirname(os.path.abspath(__file__))
DB_PATH =   os.path.join(base_dir, "../database/taxi.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn
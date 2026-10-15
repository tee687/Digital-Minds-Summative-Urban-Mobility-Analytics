Digital Minds - Urban Mobility Data Explorer
============================================
An enterprise-level full-stack application designed to process, analyze, and visualize real-world urban mobility datasets from the New York City Taxi & Limousine Commission (TLC).

**Team Participation Sheet** :  https://docs.google.com/spreadsheets/d/1SGd--n8lrixSFb_JCQyeSs0yTBksFDZiIn0_bwOMDgA/edit?usp=sharing

**Video Walkthrough link**   :  https://youtu.be/IOzEzABfxhc

## Team Members & Responsibilities

| Name | Role | Core Responsibility |
| :--- | :--- | :--- |
| **Tendai Lynn Mtakiwa** | Team Lead & Frontend Developer | Frontend dashboard UI (HTML/CSS/JS), interactive maps (Leaflet), KPI visual analytics, client-side DSA QuickSort. |
| **Tasnim Maulidi** | Database Architect & Engineer | Relational database schema design (SQLite), table indexing, and database loading pipeline. |
| **Chidera Asiegbunam** | Data Pipeline & Backend Developer | Data extraction, cleaning, outlier handling, feature engineering, and Flask REST API backend. |

Overview
--------

This project processes 7.5 million raw NYC taxi trip records, cleans them,
enriches them with taxi zone information, and loads them into a normalized
SQLite database. A frontend dashboard allows users to explore urban mobility
patterns such as average fare by hour, trip distance by zone, and pickup
hotspots across the city.

## Repository StructureDigital-Minds-_Urban-Mobility-Data-Explorer/

backend/ Backend service and API codevibe-reports/ Authorship reports for team members data/ Reference data and cleaned trip data database/ Schema definition and ETL loader docs/ Diagrams and documentation etl/ Supporting ETL scripts frontend/ Dashboard user interface

requirements.txt Python dependencies
**SYSTEM ARCHITECTURE**
----------------------

<img width="1025" height="687" alt="image" src="https://github.com/user-attachments/assets/9d50fd4d-4c04-4702-abac-8641000eec4d" />


Database
--------

The database is defined in database/schema.sql and loaded by
database/load_data.py. It contains six tables:

<img width="840" height="512" alt="image" src="https://github.com/user-attachments/assets/2871fafd-1027-4317-96b0-de54c6d787e0" />

## Algorithmic Implementation (DSA Requirement)

To satisfy the DSA requirement without relying on native sorting libraries (e.g., `sort_values` or `Array.prototype.sort()`), the project includes a manual **QuickSort Algorithm** implemented in both `backend/algorithm.py` and `frontend/js/main.js

- **Approach:** Divide-and-conquer partitioning around a middle pivot value.
- **Sorting Keys:** Dynamically sorts trips by `fare_amount` or `trip_distance` in ascending or descending order
- **Time Complexity:**
  - **Best / Average Case:** $\mathcal{O}(n \log n)
  - **Worst Case:** $\mathcal{O}(n^2)$
- **Space Complexity:** $\mathcal{O}(\log n)$ auxiliary recursion stack space.

---

## Setup & Running Instructions

Follow these step-by-step instructions to run the application locally from scratch:

### Prerequisites
- Python 3.10+ installed
- Modern Web Browser (Chrome, Edge, or Firefox)
- VS Code (with the **Live Server** extension installed
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

Data Source
-----------

NYC Taxi and Limousine Commission Trip Record Data
https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page

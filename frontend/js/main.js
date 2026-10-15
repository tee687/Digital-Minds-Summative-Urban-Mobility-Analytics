const trips = [
    { pickup: "Manhattan", dropoff: "Queens", dist: 5.4, dur: 22, fare: 25.5, hr: 8 },
  { pickup: "Brooklyn", dropoff: "Manhattan", dist: 4.1, dur: 18, fare: 19.0, hr: 9 },
  { pickup: "Manhattan", dropoff: "Manhattan", dist: 1.8, dur: 12, fare: 12.0, hr: 14 },
  { pickup: "Queens", dropoff: "Brooklyn", dist: 7.2, dur: 30, fare: 32.5, hr: 18 },
  { pickup: "Bronx", dropoff: "Manhattan", dist: 8.5, dur: 28, fare: 35.0, hr: 18 },
  { pickup: "Manhattan", dropoff: "Queens", dist: 6.0, dur: 25, fare: 28.0, hr: 20 }
];
    
let myChart = null;
function updateUI(data) {
    const total = data.length;
    const totalTripsEl = document.getElementById("total-trips");
  if (totalTripsEl) totalTripsEl.textContent = total;

    
    if (total >0) {
        const avgFare = data.reduce((sum, t) => sum+ t.fare, 0) /total;
        const avgDist = data.reduce((sum, t) => sum + t.dist, 0) /total;
        const avgDur = data.reduce((sum, t) => sum + t.dur, 0) / total;

    
    const fareEl = document.getElementById("avg-fare");
    const distEl = document.getElementById("avg-distance");
    const durEl = document.getElementById("avg-duration");

    if (fareEl) fareEl.textContent = `$${avgFare.toFixed(2)}`;
    if (distEl) distEl.textContent = `${avgDist.toFixed(1)} mi`;
    if (durEl) durEl.textContent = `${Math.round(avgDur)} min`;
    
    }

  //Table 
  
   const tbody = document.getElementById("trips-table-body");
  if (tbody) {
    tbody.innerHTML = "";
    data.forEach((t) => {
      tbody.innerHTML += `<tr>
        <td>${t.pickup}</td>
        <td>${t.dropoff}</td>
        <td>${t.dist}</td>
        <td>${t.dur}</td>
        <td>$${t.fare.toFixed(2)}</td>
      </tr>`;
     });
    }

  const hours = [ 8,9,14,18,20];
  const counts = hours.map((h) => data.filter ((t) => t.hr == h).length) ;

  const ctx = document.getElementById("hourlyChart");
if (ctx) {
    if (myChart) myChart.destroy(); 
    myChart =new Chart(ctx.getContext("2d"), {
        type: "bar",
        data: {
            labels: hours.map(h => `${h}:00`),
            datasets: [{ label: "Trips", data: counts, backgroundColor: "#8c5836" }]
        },
        options: {
            responsive:true,
            mantainAspectRatio: false
        }
    });
}
}

//fiter
function filterData() {
   const boroughEl = document.getElementById("borough-filter");
  const distEl = document.getElementById("max-distance");
  const sortEl = document.getElementById("sort-select");

  const borough = boroughEl ? boroughEl.value : "ALL";
  const maxMiles = distEl ? parseFloat(distEl.value) : 20;
  const sortBy = sortEl ? sortEl.value : "fare_desc";

    let filtered = trips.filter(
        (t) => (borough ==="ALL" || t.pickup === borough) && t.dist <= maxMiles


    );
    if (sortBy === "fare_desc") filtered.sort((a,b) => b.fare - a.fare);
    if (sortBy ==="fare_asc") filtered.sort((a,b) => a.fare - b.fare);
    if (sortBy ==="dist_desc" )filtered.sort((a,b) => b.dist -a.dist);


   updateUI(filtered);

// MAP
   function loadMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const map = L.map("map").setView([40.7128, -74.006], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);
}
fetch ("taxi_zones.geojson")
.then((res) => res.json())
.then((geo) => {
    L.geoJSON(geo, {
        style: { color: "#8c5836", weight: 1, fillOpacity: 0.2 }
    }).addTo(map);
})
.catch(() => console.log("taxi_zones.geojson not found locally"));
   }

   // Connecting the UI controls
// Connecting the UI controls
const boroughFilter = document.getElementById("borough-filter");
const sortSelect = document.getElementById("sort-select");
const distInput = document.getElementById("max-distance");
const distLabel = document.getElementById("dist-label");
const resetBtn = document.getElementById("reset-btn");

if (boroughFilter) boroughFilter.addEventListener("change", filterData);
if (sortSelect) sortSelect.addEventListener("change", filterData);

if (distInput) {
  distInput.addEventListener("input", (e) => {
    if (distLabel) distLabel.textContent = e.target.value;
    filterData();
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    if (boroughFilter) boroughFilter.value = "ALL";
    if (distInput) distInput.value = 20;
    if (distLabel) distLabel.textContent = "20";
    filterData();
  });
}
  
  

// Run immediately
filterData();
loadMap();


    


const trips =[
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
    document.getElementById("total-trips").textContent = total;
    
    if (total >0) {
        const avgFare = data.reduce((sum, t) => sum+ t.fare, 0) /total;
        const avgDist = data.reduce((sum, t) => sum + t.dist, 0) /total;
        const avgDur = data.reduce((sum, t) => sum + t.dur, 0) / total;

    
    document.getElementById("avg-fare").textContent = `$${avgFare.toFixed(2)}`;
    document.getElementById("avg-distance").textContent = `${avgDist.toFixed(1)} mi`;
    document.getElementById("avg-duration").textContent = `${Math.round(avgDur)} min`;
  }

  //Table 
   const tbody = document.getElementById("trips-table-body");
   tbody.innerHTML = "";
   data.forEach((t) => {
  tbody.innerHTML += `<tr><td>${t.pickup}</td><td>${t.dropoff}</td><td>${t.dist}</td><td>${t.dur}</td><td>$${t.fare.toFixed(2)}</td></tr>`;

     });

  const hours = [ 8,9,14,18,20];
  const counts = hours.map((h) => data.filter ((t) => t.hr == h).length);

  if (myChart) myChart.destroy();
  const  ctx = document.getElementById("hourlyChart");
  if (ctx) {
    myChart = new Chart(ctx,{
        type: "bar",
        data: {
            labels: hours.map((h) => `${h}:00`),
            datasets: [{ label: "Trips", data: counts, backgroundColor: "#8c5836" }]
        }
    })


//fiter
function filterData() {
    const borough = document.getElementById("borough-filter").value;
   const maxMiles = parseFloat(document.getElementById("max-distance").value);
    const sortBy = document.getElementById("sort-select").value;

    let filtered = trips.filter(
        (t) => (borough ==="ALL" || t.pickup === borough) && t.dist <= maxMiles


    );
    if (sortBy === "fare_desc") filtered.sort((a,b) => b.fare - a.fare);
    if (sortBy ==="fare_asc") filtered.sort((a,b) => a.fare - b.fare);
    if (sortBy ==="dist_desc" )filtered.sort((a,b) => b.dist -a.dist);


   updateUI(filtered);

   //NYC Map 
   function loadMap() {
    const map = L.map("map").setView([40.7128, -74.006],10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

fetch ("taxi_zones.geojson")
.then((res) => res.json())
.then((geo) => {
    L.geoJSON(geo, {
        style: { color: "#8c5836", weight: 1, fillOpacity: 0.2 }
    }).addTo(map);
})
.catch(() => console.log("GeoJSON ready to attend"));
   }

   // Connecting the UI controls

   document .getElementById("borough-filter").addEventListener("change", filterData);
   document .getElementById("sort-select").addEventListener("change", filterData);

   const distInput = document.getElementById("max-distance");
   distInput.addEventListener("input", (e) => {
    document .getElementById("dist-label").textContent = e.target.value;
filterData();
   });
document.getElementById("reset-btn").addEventListener("click", () => {
  document.getElementById("borough-filter").value = "ALL";
  distInput.value = 20;
  document.getElementById("dist-label").textContent = "20";
  filterData();
});

//Running the page
window.onload = () => {
    filterData();
    loadMap();
};

}
  }
}

    


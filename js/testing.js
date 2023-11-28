let map;
let minValue;
let attributes;
let geojsonData;


//step 1 create map
function createMap(){
    map = L.map('map', {
        center: [45.7, -93.4],
        zoom: 8
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    //call getData function
    getData(map);
}

//declare map variable globally so all functions have access
var map;
//var attributes;

//step 1 create map
function createMap(){
    //create the map
    map = L.map('map', {
        center: [43, -110],
        zoom: 4
    });

    //add OSM base tilelayer
    L.tileLayer.provider('Stadia.StamenTerrain').addTo(map);

    //call getData function
    getData(map);
};

//function to retrieve the data and place it on the map
function getData(){
    //load the data
    fetch("data/County.geojson") //placeholder for our county data 
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(json).addTo(map);
        })
};

document.addEventListener('DOMContentLoaded',createMap)
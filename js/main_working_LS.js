//declare map variable globally so all functions have access
var map;
//var attributes;

//step 1 create map
function createMap(){
    //create the map
    map = L.map('map', {
        center: [46, -87],
        zoom: 8

    });

    //add OSM base tilelayer
    L.tileLayer.provider('Stadia.StamenTerrain').addTo(map);

    //Esri API key variable 
    var apiKey= "AAPKe3ed074605b74de0ba2d1e373dcc65bbcvEnFg_vWzBUO-ysOviHMlflp1cn4mNFShcpno5Good4EFgVfdiVJY52BX607Msp";

    //Adds API to map
    L.esri.Vector.vectorBasemapLayer(basemapEnum, {
        apiKey: apiKey
    }).addTo(map);

    var township = L.esri
        .featureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/6"
        });

      township.addTo(map);

      var county = L.esri
        .featureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/1"
        });

      county.addTo(map);

      var zipCode = L.esri
        .featureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/2"
        });
        zipCode.addTo(map);

    var parcelLayer = L.esri
        .featureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/3"
        });
        parcelLayer.addTo(map);

    //call getData function
    // getData(map);
};


// //function to retrieve the data and place it on the map
// function getData(){
//     //load the data
//     fetch("data/County.geojson") //placeholder for our county data 
//         .then(function(response){
//             return response.json();
//         })
//         .then(function(json){
//             //create a Leaflet GeoJSON layer and add it to the map
//             L.geoJson(json).addTo(map);
//         })
// };

document.addEventListener('DOMContentLoaded',createMap)
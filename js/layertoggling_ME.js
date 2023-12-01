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
    var apiKey= "AAPK2aa8afd0970b4e43bc5133b348839475UgngmRk2ZE6Yv_uOw2KAGR1v4BvVPtn_3IoYJPmznS3CJc90Q3VyToGXStfctrVQ";

    //Adds API to map
    L.esri.Vector.vectorBasemapLayer(basemapEnum, {
        apiKey: apiKey
    }).addTo(map);

    //call getData function
    // getData(map);
};


let zipcodes =
    L.zipcodes.featureLayer({
        url: 'https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/2'
    }).addTo(map);

console.log(zipcodes)
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

    const map = L.map("map", {
        minZoom: 2
      })

      map.setView([34.02, -118.805], 13);

      const apiKey = "AAPKe3ed074605b74de0ba2d1e373dcc65bbcvEnFg_vWzBUO-ysOviHMlflp1cn4mNFShcpno5Good4EFgVfdiVJY52BX607Msp";

      const basemapEnum = "arcgis/streets";

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
};
document.addEventListener('DOMContentLoaded',createMap)
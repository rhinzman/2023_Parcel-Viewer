//step 1 create map
var attributes; 

function createMap(){
  
  //create the map
  const map = L.map('map').setView([45.87, -87], 9);
  

  
  //Initializae API key
  const apiKey= "AAPKe3ed074605b74de0ba2d1e373dcc65bbcvEnFg_vWzBUO-ysOviHMlflp1cn4mNFShcpno5Good4EFgVfdiVJY52BX607Msp";

  //add OSM base tilelayer
  const basemap= L.tileLayer.provider('Stadia.StamenTerrain').addTo(map);

    
  // URL of the feature layer
  var featureLayerUrl = "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/6";

  // Create the feature layer
  var featureLayer = L.esri.featureLayer({
    url: featureLayerUrl,
    apiKey: apiKey // Include the API key if required
  }).addTo(map);

  // Add the feature layer to the map
  featureLayer.addTo(map);

      var township = L.esri
      .featureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/6",
        style : function(feature){
          return {
            color: 'red'
          }
        }
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
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/3", style:parcelStyle
        });
        
        parcelLayer.addTo(map);
        parcelLayer.bindPopup(createParcelPopup);
        const overlayMaps = {
          "Township": township,
          "County": county,
          "Zip Code": zipCode,
          "Parcel": parcelLayer
        };
        const layerControl ={
          "Parcel": parcelLayer,
          "Township": township,
          "County": county,
          "Zip Code": zipCode
        };


        L.control.layers(layerControl,overlayMaps).addTo(map);
    
        
    
   

    // Add the legend


    /*Legend specific*/
  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Legend</h4>";
    div.innerHTML += '<i style="background: #477AC2"></i><span>County</span><br>';
    div.innerHTML += '<i style="background: #448D40"></i><span>Township</span><br>';
    div.innerHTML += '<i style="background: #FF00FF"></i><span>Parcel</span><br>';
    div.innerHTML += '<i style="background: #E8E6E0"></i><span>Zipcode</span><br>';
    
    return div;
  };

  legend.addTo(map);
};

function createParcelPopup(properties){
 
  var popUp= "<p><b>Parcel: </b> " + properties.attribute;
  return popUp; 
}; 

// Set up style for garden polygons
function parcelStyle(feature) {
  return {
    fillColor: "#FF00FF",
    fillOpacity: 2,
    color: '#B04173',
    weight: 4,
  };
}



document.addEventListener('DOMContentLoaded',createMap)
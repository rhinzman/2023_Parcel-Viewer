
//step 1 create map
var attributes; 

function createMap(){
  
  //create the map
  const map = L.map('map').setView([45.87, -87], 9);
  

  
  //Initializae API key
  const apiKey= "AAPKe3ed074605b74de0ba2d1e373dcc65bbcvEnFg_vWzBUO-ysOviHMlflp1cn4mNFShcpno5Good4EFgVfdiVJY52BX607Msp";

  //add OSM base tilelayer
  const basemap= L.tileLayer.provider('Stadia.StamenTerrain').addTo(map);
  var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
}).addTo(map);
var baseMaps = {Stadia_AlidadeSmoothDark, basemap};
    

      var township = L.esri
      .featureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/6", style: townshipStyle
    
      });

      township.addTo(map);
    
      var county = L.esri
        .featureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/1"
        });

      county.addTo(map);
    
      // var zipCode = L.esri
      //   .featureLayer({
      //     url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/2"
      //   });
      //   zipCode.addTo(map);

    var parcelLayer = L.esri
        .featureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/3", style:parcelStyle
        }).addTo(map);
        parcelLayer.bindPopup(function(layer){
          return L.Util.template('<p><b>Parcel ID: </b> {Name}</p>'+'<p><b>Township: </b> {Township}</p>'+'<p><b>Zip Code: </b> {Zip_Code}</p>', layer.feature.properties);
        });
        
        
        const overlayMaps = {
          "Township": township,
          "County": county,
          // "Zip Code": zipCode,
          "Parcel": parcelLayer
        };
        const layerControl ={
          "Parcel": parcelLayer,
          "Township": township,
          "County": county,
          // "Zip Code": zipCode
        };


        L.control.layers(baseMaps,overlayMaps).addTo(map);
    

    // Add the legend


    /*Legend specific*/
  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Legend</h4>";
    div.innerHTML += '<i style="background: #477AC2"></i><span>County</span><br>';
    div.innerHTML += '<i style="background: #448D40"></i><span>Township</span><br>';
    div.innerHTML += '<i style="background: #FA8072"></i><span>Parcel</span><br>';
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
    fillColor: "#FA8072",
    fillOpacity: 2,
    color: '#CD5C5C',
    weight: 2,
  };
}

function townshipStyle(feature){
  return{
    color: "#4C0073"
  }
}




document.addEventListener('DOMContentLoaded',createMap)
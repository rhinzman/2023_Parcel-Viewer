
//step 1 create map
var attributes; 
var selection;

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

// define function to handle click events on parcels
function parcelOnEachFeature(feature, layer){
  layer.on({
    click: function(e) {
      if (selection) {
        parcelLayer.resetStyle(selection);
      }
              
      e.target.setStyle(parcelSelectedStyle());
      selection = e.target;

      L.DomEvent.stopPropagation(e); // stop click event from being propagated down to other elements
    }
  });
}
      var township = L.esri
      .featureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/6", style: townshipStyle
    
      });

      township.addTo(map);
    
      var county = L.esri
        .featureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/1", style:countyStyle
        });

      county.addTo(map);
  

    var parcelLayer = L.esri
        .featureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/3", style:parcelStyle, onEachFeature: parcelOnEachFeature
        }).addTo(map);

        // const select = document.getElementById("whereClauseSelect");
        // select.addEventListener("change", () => {
        //   if (select.feature !== "") {
        //     parcels.setWhere(select.feature);
        //   }
        // });
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
  
        L.Control.QueryControl = L.Control.extend({
          onAdd: function (map) {
            const whereClauses = [
              "Choose a Township",
              "Baldwin",
              "Ford River",
              "Garden",
              "Maple Ridge",
              "Masonville",
              "Nahma",
              "Rapid River",
              "Wells",
              "Bark River",
              "Escabana",
              "Gladstone",
              "Bay De Noc",
              "Fairbanks",
              "Ensign",
              "Brampton",
              "Cornell",
            ];
            const select = L.DomUtil.create("select", "");
            select.setAttribute("Township", "whereClauseSelect");
            select.setAttribute("style", "font-size: 16px;padding:4px 8px;");
            whereClauses.forEach(function (whereClause) {
              let option = L.DomUtil.create("option");
              option.innerHTML = whereClause;
              select.appendChild(option);
            });
            return select;
          },
  
          onRemove: function (map) {
            // Nothing to do here
          }
        });
  
        L.control.queryControl = function (opts) {
          return new L.Control.QueryControl(opts);
        };
  
        L.control
          .queryControl({
            position: "bottomright"
          })
          .addTo(map);
          
    // Add the legend


    /*Legend specific*/
  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Legend</h4>";
    div.innerHTML += '<i style="background: #ffffff"></i><span>County</span><br>';
    div.innerHTML += '<i style="background: #4C0073"></i><span>Township</span><br>';
    div.innerHTML += '<i style="background: #85929E"></i><span>Parcel</span><br>';
    // div.innerHTML += '<i style="background: #E8E6E0"></i><span>Zipcode</span><br>';
    
    return div;
  };

  legend.addTo(map);
};

function createParcelPopup(properties){
 
  var popUp= "<p><b>Parcel: </b> " + properties.attribute;
  return popUp; 
}; 

// Set up style for parcel polys
function parcelStyle(feature) {
  return {
    color: '#85929E',
    weight: 1,
  };
}

function townshipStyle(feature){
  return{
    color: "#4C0073", 
    weight: 2,
  }
}
function countyStyle(feature){
  return{
    color: "#ffffff",
    weight: 1,
  
  };
}
// Blue symbol for selected gardens
function parcelSelectedStyle(feature) {
  return {
    // fillColor: "#00FFFB",
    // fillOpacity: 1,
    color: '#00FFFB',
    weight: 2
  };
}

// define and register event handler for click events to unselect features when clicked anywhere else on the map
map.addEventListener('click', function(e) {
  if (selection) {
     parcelLayer.resetStyle(selection);

     selection = null;
  }
});
removeEventListener('click', function(e) {
  if (selection) {
     gardenLayer.resetStyle(selection);

     selection = null;
  }
});

document.addEventListener('DOMContentLoaded',createMap)
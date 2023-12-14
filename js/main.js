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
  };
}
function countyStyle(feature){
  return{
    color: "#FFFFFF",
    weight: 1,
  };
}
// Blue symbol for selected parcels
function parcelSelectedStyle() {
  return {
    color: '#00FFFB',
    weight: 2
  };
}
// Create map
var map;
var townshipLayer;
var selection;

function createMap(){
  // Create the map
  map = L.map('map').setView([45.87, -87], 9);
  // Add OSM base tilelayer
  L.tileLayer.provider('Stadia.AlidadeSmoothDark').addTo(map);
  // Add other layers
  // define function to handle click events on parcels
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
  townshipLayer = L.esri.featureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/6",
    style: townshipStyle
  }).addTo(map);
 
onDropdownChange("Choose a Township");
createHighlightStyle("Choose a Township");
  console.log(townshipLayer);
  var countyLayer = L.esri.featureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/1",
    style: countyStyle,
  pane:"townshipLayer"
  }).addTo(map);
  var parcelLayer = L.esri.featureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parcel_Viewer_WFL1/FeatureServer/3",
    style: parcelStyle,
    onEachFeature: parcelOnEachFeature
    
  }).addTo(map);
  parcelLayer.bindPopup(function(layer){
    return L.Util.template('<p><b>Parcel ID: </b> {Name}</p>'+'<p><b>Township: </b> {Township}</p>'+'<p><b>Zip Code: </b> {Zip_Code}</p>', layer.feature.properties);
  });
  // Define the dropdown change handler function
  function onDropdownChange(selectedTownship) {
    if (selectedTownship !== "Choose a Township") {
      townshipLayer.query().where("Name = '" + selectedTownship + "'").run(function(error, featureCollection){
        if (error) {
          console.error('Query error:', error);
          return;
        }
        if (featureCollection.features.length > 0) {
          var bounds = L.geoJson(featureCollection).getBounds();
          map.fitBounds(bounds);
           // Reset the style of all township features
        townshipLayer.setStyle(townshipStyle);
        // Reset the style of all parcel features
        parcelLayer.setStyle(parcelStyle);
        // Reset the style of all county features
        countyLayer.setStyle(countyStyle);
        // Zoom to the selected township feature
        map.fitBounds(townshipLayer.getBounds());
        // Get the selected township feature
        console.log(townshipLayer);
        // Highlight the selected township feature
        var selectedFeature = featureCollection.features[0];
        var selectedLayer = townshipLayer.getLayer(selectedFeature.NAME);
        selectedLayer.setStyle({
          color: '#00FFFB',
          weight: 3
      });
    }
  });
} else {

  // Reset the style of all township features when "Choose a Township" is selected
  townshipLayer.setStyle(townshipStyle);

}
}
function createHighlightStyle(selectedTownship) {
  if (selectedTownship !== "Choose a Township") {
    townshipLayer.query().where("Name = '" + selectedTownship + "'").run(function(error, featureCollection){
      if (error) {
        console.error('Query error:', error);
  return {
    color: '#00FFFB',
    weight: 2
  };
}
})}};

  // Add the control layers
  var baseMaps = {
    "Stadia.AlidadeSmoothDark": L.tileLayer.provider('Stadia.AlidadeSmoothDark'),
    "Stadia.StamenTerrain": L.tileLayer.provider('Stadia.StamenTerrain')
  };
  var overlayMaps = {
    "Township": townshipLayer,
    "County": countyLayer,
    "Parcel": parcelLayer
  };
  L.control.layers(baseMaps, overlayMaps).addTo(map);
  // Define the QueryControl
  L.Control.QueryControl = L.Control.extend({
    onAdd: function (map) {
      var div = L.DomUtil.create('div', 'query-control');
      var select = L.DomUtil.create('select', 'whereClauseSelect', div);
      select.setAttribute('style', 'font-size: 16px;padding:4px 8px;');
      var whereClauses = [
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
        "Escanaba",
        "Gladstone",
        "Bay De Noc",
        "Fairbanks",
        "Ensign",
        "Brampton",
        "Cornell"
      ];
      whereClauses.forEach(function (clause) {
        var option = L.DomUtil.create('option', '', select);
        option.value = clause;
        option.innerHTML = clause;
      });
      L.DomEvent.addListener(select, 'change', function(e) {
        onDropdownChange(e.target.value);
      });
      return div;
    }
  });
  L.control.queryControl = function (opts) {
    return new L.Control.QueryControl(opts);
  };
  L.control.queryControl({ position: "bottomright" }).addTo(map);
  // Add the legend
  var legend = L.control({ position: "bottomleft" });
  legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += "<h4>Legend</h4>";
    div.innerHTML += '<i style="background: #FFFFFF"></i><span>County</span><br>';
    div.innerHTML += '<i style="background: #4C0073"></i><span>Township</span><br>';
    div.innerHTML += '<i style="background: #85929E"></i><span>Parcel</span><br>';
  
        return div;
  };
  
  legend.addTo(map);
  function createParcelPopup(properties){
 
    var popUp= "<p><b>Parcel: </b> " + properties.attribute;
    return popUp; 
  }; 
  
  // Blue symbol for selected parcels
function parcelSelectedStyle(feature) {
  return {
  
    color: '#00FFFB',
    weight: 2
  };
}
  map.addEventListener('click', function(e) {
    if (selection) {
       gardenLayer.resetStyle(selection);
  
       selection = null;
    }
  });
  removeEventListener('click', function(e) {
    if (selection) {
       gardenLayer.resetStyle(selection);
  
       selection = null;
    }
  });
};

// Initialize the map
document.addEventListener('DOMContentLoaded', createMap);

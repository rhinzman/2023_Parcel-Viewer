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
var allLayers = {}; // Store all layers for easy management

function createMap(){
  // Create the map
  map = L.map('map').setView([45.87, -87], 9);
  // Add OSM base tilelayer
  L.tileLayer.provider('Stadia.AlidadeSmoothDark').addTo(map);
  
  // define function to handle click events on parcels
  function parcelOnEachFeature(feature, layer){
    layer.on({
      click: function(e) {
        if (selection) {
          if (allLayers.parcels) {
            allLayers.parcels.resetStyle(selection);
          }
        }
                
        e.target.setStyle(parcelSelectedStyle());
        selection = e.target;

        L.DomEvent.stopPropagation(e); // stop click event from being propagated down to other elements
      }
    });
  }
  
  // Layer configuration - Update these URLs with your actual layer URLs from the target web map
  var layerConfigs = [
    {
      name: 'townships',
      url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/YourNewService/FeatureServer/0", // Update this URL
      style: townshipStyle,
      displayName: "Township"
    },
    {
      name: 'counties',
      url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/YourNewService/FeatureServer/1", // Update this URL
      style: countyStyle,
      displayName: "County"
    },
    {
      name: 'parcels',
      url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/YourNewService/FeatureServer/2", // Update this URL
      style: parcelStyle,
      displayName: "Parcel",
      onEachFeature: parcelOnEachFeature
    },
    // Add more layers from your target web map here
    {
      name: 'roads',
      url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/YourNewService/FeatureServer/3", // Update this URL
      style: {
        color: '#FF5733',
        weight: 2
      },
      displayName: "Roads"
    },
    {
      name: 'zoning',
      url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/YourNewService/FeatureServer/4", // Update this URL
      style: {
        color: '#33FF57',
        weight: 1,
        fillOpacity: 0.3
      },
      displayName: "Zoning"
    }
  ];
  
  // Add layers with error handling
  layerConfigs.forEach(function(config) {
    try {
      var layerOptions = {
        url: config.url,
        style: config.style
      };
      
      if (config.onEachFeature) {
        layerOptions.onEachFeature = config.onEachFeature;
      }
      
      var layer = L.esri.featureLayer(layerOptions);
      
      layer.on('error', function(error) {
        console.error(`Error loading ${config.displayName} layer:`, error);
      });
      
      layer.on('loading', function() {
        console.log(`Loading ${config.displayName} layer...`);
      });
      
      layer.on('load', function() {
        console.log(`${config.displayName} layer loaded successfully`);
      });
      
      layer.addTo(map);
      allLayers[config.name] = layer;
      
      // Set specific layer references for existing functionality
      if (config.name === 'townships') {
        townshipLayer = layer;
      }
      
    } catch (error) {
      console.error(`Failed to create ${config.displayName} layer:`, error);
    }
  });
  
  // Add popup for parcels
  if (allLayers.parcels) {
    allLayers.parcels.bindPopup(function(layer){
      return L.Util.template('<p><b>Parcel ID: </b> {Name}</p>'+'<p><b>Township: </b> {Township}</p>'+'<p><b>Zip Code: </b> {Zip_Code}</p>', layer.feature.properties);
    });
  }

  // Initialize dropdown and highlight functionality
  onDropdownChange("Choose a Township");
  createHighlightStyle("Choose a Township");
  console.log(townshipLayer);
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
        if (townshipLayer) townshipLayer.setStyle(townshipStyle);
        // Reset the style of all parcel features
        if (allLayers.parcels) allLayers.parcels.setStyle(parcelStyle);
        // Reset the style of all county features
        if (allLayers.counties) allLayers.counties.setStyle(countyStyle);
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
    "Stadia.StamenTerrain": L.tileLayer.provider('Stadia.StamenTerrain'),
    "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }),
    "Esri WorldImagery": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    })
  };
  
  // Build overlay maps dynamically from loaded layers
  var overlayMaps = {};
  layerConfigs.forEach(function(config) {
    if (allLayers[config.name]) {
      overlayMaps[config.displayName] = allLayers[config.name];
    }
  });
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
    
    // Add legend items based on layer configuration
    layerConfigs.forEach(function(config) {
      if (allLayers[config.name]) {
        var color = config.style.color || '#85929E';
        div.innerHTML += `<i style="background: ${color}"></i><span>${config.displayName}</span><br>`;
      }
    });
  
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
       if (allLayers.parcels) {
         allLayers.parcels.resetStyle(selection);
       }
       selection = null;
    }
  });
  
  map.removeEventListener('click', function(e) {
    if (selection) {
       if (allLayers.parcels) {
         allLayers.parcels.resetStyle(selection);
       }
       selection = null;
    }
  });
};

// Initialize the map
document.addEventListener('DOMContentLoaded', createMap);

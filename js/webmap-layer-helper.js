// Helper script to extract layer information from ArcGIS Web Map
// This script helps you find the correct feature service URLs for your layers

// Instructions for finding layer URLs from your web map:
// 1. Open the web map in ArcGIS Online: https://uw-mad.maps.arcgis.com/apps/mapviewer/index.html?webmap=beb65786ab294905a231f5ae19f03069
// 2. Open browser developer tools (F12)
// 3. Go to Network tab
// 4. Reload the page
// 5. Look for requests to "FeatureServer" or "MapServer"
// 6. Copy those URLs and replace the placeholder URLs in main.js

// Alternative method:
// 1. Contact the web map owner for layer service URLs
// 2. If you have access to ArcGIS Online, you can view the web map details

// Example of how to add layers programmatically if you have the web map ID:
function loadWebMapLayers(webmapId) {
  // Note: This requires authentication and proper permissions
  // You would need to use ArcGIS REST API to get web map details
  
  var webmapUrl = `https://www.arcgis.com/sharing/rest/content/items/${webmapId}/data?f=json`;
  
  // This is just an example - you'll need proper authentication
  fetch(webmapUrl)
    .then(response => response.json())
    .then(data => {
      console.log('Web map data:', data);
      
      if (data.operationalLayers) {
        data.operationalLayers.forEach((layer, index) => {
          console.log(`Layer ${index}:`, layer.title, layer.url);
          
          // Add each layer to your map
          if (layer.url) {
            var newLayer = L.esri.featureLayer({
              url: layer.url,
              style: {
                color: '#' + Math.floor(Math.random()*16777215).toString(16),
                weight: 2
              }
            }).addTo(map);
            
            // Add to layer control if needed
          }
        });
      }
    })
    .catch(error => {
      console.error('Error loading web map:', error);
      console.log('You may need authentication or the web map may be private');
    });
}

// Common Delta County layer service URLs you might need:
// Replace these with the actual URLs from your target web map
var deltaCountyServices = {
  parcels: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Delta_County_Parcels/FeatureServer/0",
  townships: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Delta_County_Townships/FeatureServer/0",
  roads: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Delta_County_Roads/FeatureServer/0",
  boundaries: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Delta_County_Boundaries/FeatureServer/0",
  zoning: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Delta_County_Zoning/FeatureServer/0"
};

// Function to add layers with proper error handling
function addLayerSafely(url, style, name) {
  try {
    var layer = L.esri.featureLayer({
      url: url,
      style: style
    });
    
    layer.on('error', function(error) {
      console.error(`Error loading layer ${name}:`, error);
    });
    
    layer.addTo(map);
    console.log(`Successfully added layer: ${name}`);
    return layer;
  } catch (error) {
    console.error(`Failed to create layer ${name}:`, error);
    return null;
  }
}
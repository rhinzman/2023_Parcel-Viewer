# How to Update Layer URLs for Your Web Map

## Steps to Find Layer URLs from Your Target Web Map

### Method 1: Browser Developer Tools
1. Open your target web map: https://uw-mad.maps.arcgis.com/apps/mapviewer/index.html?webmap=beb65786ab294905a231f5ae19f03069
2. Open browser developer tools (Press F12)
3. Go to the **Network** tab
4. Reload the page
5. Filter by "FeatureServer" or "MapServer"
6. Look for requests like:
   - `https://services.arcgis.com/.../FeatureServer/0`
   - `https://services.arcgis.com/.../FeatureServer/1`
   - etc.
7. Copy these URLs and replace the placeholder URLs in `main.js`

### Method 2: Contact Map Owner
- If the web map is private or you can't access it directly
- Contact the map owner for the feature service URLs
- They can provide you with the direct links to each layer

### Method 3: ArcGIS Online (if you have access)
1. Log into ArcGIS Online
2. Search for the web map by ID: `beb65786ab294905a231f5ae19f03069`
3. View the web map details
4. Look at the operational layers section
5. Copy the service URLs

## Updating the Code

### In main.js, find this section:
```javascript
var layerConfigs = [
  {
    name: 'townships',
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/YourNewService/FeatureServer/0", // Update this URL
    style: townshipStyle,
    displayName: "Township"
  },
  // ... more layers
];
```

### Replace the URLs with your actual layer URLs:
```javascript
var layerConfigs = [
  {
    name: 'townships',
    url: "https://your-actual-service-url/FeatureServer/0", // Your actual URL here
    style: townshipStyle,
    displayName: "Township"
  },
  {
    name: 'parcels',
    url: "https://your-actual-service-url/FeatureServer/1", // Your actual URL here
    style: parcelStyle,
    displayName: "Parcels"
  },
  // Add more layers as needed
];
```

## Common Layer Types for Delta County

Based on typical GIS data for counties, you might find these layer types:
- **Parcels** - Property boundaries
- **Townships** - Township boundaries
- **Counties** - County boundaries
- **Roads** - Street centerlines
- **Zoning** - Zoning districts
- **Water Features** - Rivers, lakes, etc.
- **Municipal Boundaries** - City/village limits
- **School Districts** - School district boundaries
- **Emergency Services** - Fire/EMS districts

## Styling Options

You can customize the appearance of each layer by modifying the `style` property:

```javascript
style: {
  color: '#FF5733',      // Border color
  weight: 2,             // Border width
  fillColor: '#33FF57',  // Fill color
  fillOpacity: 0.5,      // Fill transparency (0-1)
  opacity: 1             // Border transparency (0-1)
}
```

## Testing Your Changes

1. Save the `main.js` file after updating URLs
2. Open `index.html` in your browser
3. Check the browser console (F12) for any error messages
4. Verify that layers are loading correctly
5. Test the layer control panel to turn layers on/off
6. Test the township dropdown functionality

## Troubleshooting

- **Layer doesn't load**: Check the URL is correct and accessible
- **CORS errors**: The service might need to allow cross-origin requests
- **Authentication errors**: The service might require authentication
- **Style not applying**: Check that the style object is properly formatted

## Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Verify the layer URLs are accessible by visiting them directly
3. Ensure the layer indices (0, 1, 2, etc.) match the actual service structure
4. Contact the data provider if you need access permissions
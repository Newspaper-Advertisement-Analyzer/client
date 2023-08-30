import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import L to access the Leaflet library
import "leaflet/dist/leaflet.css";

import customMarkerIcon1 from "../../assets/images/map_markers/n.png"; // Path to your custom marker icon
import customMarkerIcon2 from "../../assets/images/map_markers/m.png";
import customMarkerIcon3 from "../../assets/images/map_markers/p.jpg";

const MapComponent = () => {
  const mapCenter = [7.8731, 80.7718]; // Latitude and Longitude for the initial map center (Sri Lanka)
  const [markers, setMarkers] = useState([]);
  const [refreshMap, setRefreshMap] = useState(false);

  useEffect(() => {
    console.log("hi");

    // Function to fetch marker locations from the backend
    const fetchMarkerLocations = async () => {
      try {
        const response = await fetch("/get_marker_locations"); // Replace this with the correct backend endpoint URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Parse the JSON data into an array before setting it to markers state
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        // Ensure the parsed data is an array before setting it to markers state
        if (Array.isArray(parsedData)) {
          setMarkers(parsedData);
        } else {
          console.error("Parsed data is not an array:", parsedData);
        }
      } catch (error) {
        console.error("Error fetching marker data:", error);
      }
    };

    // Call the function to fetch marker locations when the component mounts or when refreshMap changes
    fetchMarkerLocations();
  }, [refreshMap]);

  const handleRefreshMap = () => {
    setRefreshMap((prevState) => !prevState);
  };

  // Create the custom icon
  const categoryToIcon = {
    // Define your category-to-icon mappings here
    Land: L.icon({
      iconUrl: customMarkerIcon1,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    Vehical: L.icon({
      iconUrl: customMarkerIcon2, // Replace with the path to your custom marker icon for category2
      iconSize: [35, 35],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    // Add more categories and their icons as needed
    customIcon: L.icon({
      iconUrl: customMarkerIcon3, // Replace with the path to your custom marker icon for category2
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
  };

  return (
    <div>
      <MapContainer center={mapCenter} zoom={8} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker, index) => {
          const categoryIcon = categoryToIcon[marker.catergory];
          return (
            <Marker key={index} position={marker.position} icon={categoryIcon}>
              <Popup>
                <div>
                  <h3>{marker.name}</h3>
                  <p>{marker.location}</p>
                  <p>Price: {marker.price}</p>
                  <p>Phone: {marker.phoneNumber}</p>
                  <p>Email: {marker.email}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div>
        <button onClick={handleRefreshMap}>Refresh Map</button>
      </div>
    </div>
  );
};

export default MapComponent;

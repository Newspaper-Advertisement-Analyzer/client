import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import L to access the Leaflet library
import "leaflet/dist/leaflet.css";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

import { useLocation } from "react-router-dom";

import customMarkerIcon1 from "../../assets/images/map_markers/n.png"; // Path to your custom marker icon
import customMarkerIcon2 from "../../assets/images/map_markers/m.png";
import customMarkerIcon3 from "../../assets/images/map_markers/p.jpg";

const MapComponent = () => {
  const mapCenter = [7.8731, 80.7718]; // Latitude and Longitude for the initial map center (Sri Lanka)
  const [markers, setMarkers] = useState([]);
  const [refreshMap, setRefreshMap] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationsParam = searchParams.get("locations");

  useEffect(() => {
    console.log("hi");

    // Function to fetch marker locations from the backend
    const fetchMarkerLocations = async () => {
      //Get Locations from the URL parameters
      try {
        // Split the locationsParam into individual city names
        const cityNames = locationsParam.split(",");

        // Initialize an array to store marker locations
        const markerLocations = [];

        // Use a geocoding service (like OpenStreetMap Nominatim) to get coordinates for each city
        for (const cityName of cityNames) {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();

          // Check if the response contains valid data
          if (Array.isArray(data) && data.length > 0) {
            const location = data[0]; // Take the first result
            const position = [parseFloat(location.lat), parseFloat(location.lon)];
            markerLocations.push({ name: cityName, position });
          }
        }

        // Update the markers state with the retrieved locations
        setMarkers(markerLocations);
      } catch (error) {
        console.error("Error fetching marker data:", error);
      }

      //Get locations from the database
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
  }, [refreshMap, locationsParam]);

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
  const [menu, setMenu] = useState(null);
  const [selectedData, setSelectedData] = useState("Land Sale");

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleMenuItemClick = (dataKey) => {
    setSelectedData(dataKey);
    closeMenu();
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={() => handleMenuItemClick("Land Sale")}>Land Sale</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("House Sale")}>House Sale</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("Marriage Proposals")}>
        Marriage Proposals
      </MenuItem>
    </Menu>
  );

  return (
    <MDBox>
      <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Top Locations in {selectedData}
            </MDTypography>
          </MDBox>
          <MDBox color="text" px={2}>
            <Icon
              sx={{ cursor: "pointer", fontWeight: "bold" }}
              fontSize="small"
              onClick={openMenu}
            >
              more_vert
            </Icon>
          </MDBox>
          {renderMenu}
        </MDBox>
        <MapContainer center={mapCenter} zoom={8} style={{ height: "80vh", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map((marker, index) => {
            // const categoryIcon = categoryToIcon[marker.catergory];
            return (
              <Marker key={index} position={marker.position} icon={categoryToIcon.Land}>
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
      </Card>
    </MDBox>
  );
};

export default MapComponent;

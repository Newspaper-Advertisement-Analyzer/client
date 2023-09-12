import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";

import customMarkerIcon1 from "../../assets/images/map_markers/house.png";
import customMarkerIcon2 from "../../assets/images/map_markers/land.png";
import customMarkerIcon3 from "../../assets/images/map_markers/marriage.png";

import { getRecentAdLocation } from "api/advertisementMap/advertisementLocation";
import MDInput from "components/MDInput";

const MapComponent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationsParam = searchParams.get("locations");

  const mapCenter = [7.8731, 80.7718];
  const [markers, setMarkers] = useState([]);
  const [selectedData, setSelectedData] = useState("LandSale");
  const [selectedTime, setSelectedTime] = useState("Overall");
  const [test, setTest] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (locationsParam && test) {
        console.log("locationsParam", locationsParam);
        setSelectedData("Default");
        setTest(false);
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
              // const position = [parseFloat(location.lat), parseFloat(location.lon)];
              markerLocations.push({
                name: cityName,
                Location: {
                  Latitude: parseFloat(location.lat),
                  Longitude: parseFloat(location.lon),
                },
              });
            }
          }
          // Update the markers state with the retrieved locations
          setMarkers(markerLocations);
        } catch (error) {
          console.error("Error fetching marker data:", error);
        }
      } else {
        try {
          const data = await getRecentAdLocation(selectedData, selectedTime);
          setMarkers(data);
          console.log(markers);
        } catch (error) {
          console.error("Error fetching data from the backend:", error);
        }
      }
    };
    fetchData();
  }, [selectedData, test, selectedTime]);

  // const fetchData = async () => {
  //   try {
  //     const data = await getRecentAdLocation(selectedData);
  //     setMarkers(data);
  //     console.log(markers);
  //   } catch (error) {
  //     console.error("Error fetching data from the backend:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [selectedData]);

  // const handleRefreshMap = () => {
  //   fetchData(); // Now you can call fetchData here
  // };

  const categoryToIcon = {
    Default: L.icon({
      iconUrl: customMarkerIcon1,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    HouseSale: L.icon({
      iconUrl: customMarkerIcon1,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    LandSale: L.icon({
      iconUrl: customMarkerIcon2,
      iconSize: [35, 35],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    MarriageProp: L.icon({
      iconUrl: customMarkerIcon3,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
  };

  const handleMenuItemClick = (event) => {
    const dataKey = event.target.value;
    setSelectedData(dataKey);
  };
  const handleTimeItemClick = (event) => {
    const dataKey = event.target.value;
    setSelectedTime(dataKey);
  };

  const renderContent = (marker) => {
    switch (selectedData) {
      case "Default":
        return (
          <>
            <h2>{marker.Title}</h2>
            <h3>{marker.Location.City}</h3>
            <p>Number of Perch: {marker.Number_of_Perch}</p>
            <p>Price per Perch: Rs.{marker.Price_per_Perch}</p>
            {/* <p>Phone: {marker.Contact_Info.Phone_Number.join(", ")}</p> */}
            {/* <p>Email: {marker.Contact_Info.Email}</p> */}
          </>
        );
      case "LandSale":
        return (
          <>
            <h2>{marker.Title}</h2>
            <h3>{marker.Location.City}</h3>
            <p>Number of Perch: {marker.Number_of_Perch}</p>
            <p>Price per Perch: Rs.{marker.Price_per_Perch}</p>
            <p>Phone: {marker.Contact_Info.Phone_Number.join(", ")}</p>
            <p>Email: {marker.Contact_Info.Email}</p>
          </>
        );
      case "HouseSale":
        return (
          <>
            <h2>{marker.Title}</h2>
            <h3>{marker.Location.City}</h3>
            <p>Number of Rooms: {marker.Number_of_Rooms}</p>
            <p>Price: {marker.Price}</p>
            <p>Phone: {marker.Contact_Info.Phone_Number.join(", ")}</p>
            <p>Email: {marker.Contact_Info.Email}</p>
          </>
        );
      case "MarriageProp":
        return (
          <>
            <h2>{marker.Title}</h2>
            <h3>{marker.Location.City}</h3>
            <p>Gender: {marker.Gender}</p>
            <p>Age: {marker.Age}</p>
            <p>Profession: {marker.Profession}</p>
            <p>Phone: {marker.Contact_Info.Phone_Number.join(", ")}</p>
            <p>Email: {marker.Contact_Info.Email}</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <MDBox>
      <Card elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Top Locations in {selectedData}
            </MDTypography>
          </MDBox>

          <MDBox color="text" pr={0} display="flex" justifyContent="space-between">
            <MDInput
              value={selectedData}
              onChange={handleMenuItemClick}
              size="small"
              sx={{ marginRight: "5%" }}
              // Add options for districts
              select
            >
              <MenuItem value="LandSale">Land Sale</MenuItem>
              <MenuItem value="HouseSale">House Sale</MenuItem>
              <MenuItem value="MarriageProp">Marriage Proposals</MenuItem>
            </MDInput>

            <MDInput
              value={selectedTime}
              onChange={handleTimeItemClick}
              size="small"
              sx={{
                marginRight: "5%",
              }}
              // Add options for districts
              select
            >
              <MenuItem value="Overall">Overall</MenuItem>
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="Yesterday">Yesterday</MenuItem>
              <MenuItem value="LastWeek">Last Week</MenuItem>
              <MenuItem value="LastMonth">Last Month</MenuItem>
            </MDInput>
          </MDBox>
          {/* <MDBox color="text" px={2}>
            <Icon
              sx={{ cursor: "pointer", fontWeight: "bold" }}
              fontSize="small"
              onClick={openMenu}
            >
              more_vert
            </Icon>
          </MDBox>
          {renderMenu} */}
        </MDBox>
        <MapContainer center={mapCenter} zoom={8} style={{ height: "80vh", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map((marker, index) => {
            const categoryIcon = categoryToIcon[selectedData]; // Assuming you have a category field in your marker data
            return (
              <Marker
                key={index}
                position={[marker.Location.Latitude, marker.Location.Longitude]}
                icon={categoryIcon}
              >
                <Popup>
                  <div>{renderContent(marker)}</div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* <div>
          <button onClick={handleRefreshMap}>Refresh Map</button>
        </div> */}
      </Card>
    </MDBox>
  );
};

export default MapComponent;

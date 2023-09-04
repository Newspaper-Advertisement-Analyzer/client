import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

import customMarkerIcon1 from "../../assets/images/map_markers/house.png";
import customMarkerIcon2 from "../../assets/images/map_markers/land.png";
import customMarkerIcon3 from "../../assets/images/map_markers/marriage.png";

import { getRecentAdLocation } from "api/advertisementMap/advertisementLocation";

const MapComponent = () => {
  const mapCenter = [7.8731, 80.7718];
  const [markers, setMarkers] = useState([]);

  const [menu, setMenu] = useState(null);
  const [selectedData, setSelectedData] = useState("LandSale");

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecentAdLocation(selectedData);
        setMarkers(data);
        console.log(markers);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    fetchData();
  }, [selectedData]);

  const fetchData = async () => {
    try {
      const data = await getRecentAdLocation(selectedData);
      setMarkers(data);
      console.log(markers);
    } catch (error) {
      console.error("Error fetching data from the backend:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedData]);

  const handleRefreshMap = () => {
    fetchData(); // Now you can call fetchData here
  };

  const categoryToIcon = {
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
      <MenuItem onClick={() => handleMenuItemClick("LandSale")}>Land Sale</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("HouseSale")}>House Sale</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("MarriageProp")}>Marriage Proposals</MenuItem>
    </Menu>
  );

  const renderContent = (marker) => {
    switch (selectedData) {
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

        <div>
          <button onClick={handleRefreshMap}>Refresh Map</button>
        </div>
      </Card>
    </MDBox>
  );
};

export default MapComponent;

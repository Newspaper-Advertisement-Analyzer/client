import React, { useState } from "react";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";

import { getAdbyFilter } from "api/searchBar/getAdbyFilter";

const AdvertisementSearch = () => {
  const [selectedOption, setSelectedOption] = useState("Date");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedData, setSelectedData] = useState({
    columns: [], // Define your table columns here
    rows: [], // Define your table rows here
  });

  const handleSearch = async () => {
    try {
      // Implement your search logic here, fetching data based on the selected option and query
      // For example, you can use the getRecentAd function from the API file
      const searchData = await getAdbyFilter(selectedOption, searchQuery);
      setSelectedData(searchData);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const handleMenuItemClick = (dataKey) => {
    setSelectedOption(dataKey);
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
      <MenuItem onClick={() => handleMenuItemClick("Date")}>Date</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("Category")}>Category</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("Location")}>Location</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("Title")}>Title</MenuItem>
    </Menu>
  );

  return (
    <div>
      <MDBox width="90%" display="flex" alignItems="center" lineHeight={0}>
        <MDBox>
          <MDInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "50vw" }}
            label={`Search by ${selectedOption}`}
          />
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
        <MDButton color="primary" onClick={handleSearch}>
          Search
        </MDButton>
      </MDBox>
      <div></div>
      <MDBox>
        <DataTable
          table={{ columns: selectedData.columns, rows: selectedData.rows }}
          showTotalEntries={true}
          noEndBorder
          entriesPerPage={false}
          canSearch={true}
        />
      </MDBox>
    </div>
  );
};

export default AdvertisementSearch;

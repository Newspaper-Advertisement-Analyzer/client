import React, { useState } from "react";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";

import { getAdbyFilter } from "api/searchBar/getAdbyFilter";

const AdvertisementSearch = () => {
  const [selectedOption, setSelectedOption] = useState("Date");
  const [searchQuery, setSearchQuery] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [category, setCategory] = useState("");

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    const nextDay = new Date(newStartDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const nextDayFormatted = nextDay.toISOString().split("T")[0];

    setEndDate(nextDayFormatted);
  };
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;

    if (newEndDate < startDate) {
      return;
    }
    setEndDate(newEndDate);
  };

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
  const [categoryMenu, setCategoryMenu] = useState(null);

  const openCategoryMenu = ({ currentTarget }) => setCategoryMenu(currentTarget);
  const closeCategoryMenu = () => setCategoryMenu(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const handleMenuItemClick = (dataKey) => {
    setSelectedOption(dataKey);
    closeMenu();
  };
  const handleCategoryMenuItemClick = (dataKey) => {
    setCategory(dataKey);
    closeCategoryMenu();
  };

  const renderCategoryMenu = (
    <Menu
      id="simple-menu"
      anchorEl={categoryMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(categoryMenu)}
      onClose={closeCategoryMenu}
    >
      <MenuItem onClick={() => handleCategoryMenuItemClick("Land Sale")}>Land Sales</MenuItem>
      <MenuItem onClick={() => handleCategoryMenuItemClick("House Sale")}>House Sales</MenuItem>
      <MenuItem onClick={() => handleCategoryMenuItemClick("Marriage Proposals")}>
        Marriage Proposals
      </MenuItem>
    </Menu>
  );

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
    <MDBox p={2}>
      <Card alignItems="center" elevation={3} style={{ padding: "12px", alignItems: "center" }}>
        <MDBox display="flex" alignItems="center" lineHeight={0}>
          <MDBox>
            {selectedOption === "Date" ? (
              <MDBox
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDBox>
                  <MDInput
                    value={startDate}
                    onChange={handleStartDateChange}
                    sx={{ width: "24vw" }}
                    label="Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </MDBox>
                <MDBox>
                  <MDInput
                    value={endDate}
                    onChange={handleEndDateChange}
                    sx={{ width: "24vw" }}
                    label="End Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </MDBox>
              </MDBox>
            ) : (
              <>
                {selectedOption === "Category" ? (
                  <MDBox>
                    <MDBox>
                      <MDInput
                        value={category}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        readOnly // Make the input read-only to prevent typing
                        onClick={openCategoryMenu}
                        sx={{ width: "50vw" }}
                        label="Search By Category"
                      />
                      {renderCategoryMenu}
                    </MDBox>
                  </MDBox>
                ) : (
                  <MDInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: "50vw" }}
                    label={`Search by ${selectedOption}`}
                  />
                )}
              </>
            )}
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
          />
        </MDBox>
      </Card>
    </MDBox>
  );
};

export default AdvertisementSearch;

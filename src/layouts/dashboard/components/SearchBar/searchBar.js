import React, { useState } from "react";
// import ReactPaginate from "react-paginate";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import SearchResultCard from "./searchResultCard";
import { Grid, Pagination, useMediaQuery } from "@mui/material";
import { getAdbyFilter } from "api/searchBar/getAdbyFilter";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";
import Loading from "react-loading";
// import MDPagination from "components/MDPagination";

const AdvertisementSearch = () => {
  const [selectedOption, setSelectedOption] = useState("Title");
  const [searchQuery, setSearchQuery] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

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

  const [selectedData, setSelectedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [noresult, setNoresult] = useState(false);
  const adsPerPage = 20;

  const handleSearch = async () => {
    try {
      // Implement your search logic here, fetching data based on the selected option and query
      // For example, you can use the getRecentAd function from the API file
      setNoresult(false);
      setCurrentPage(0);
      setLoading(true);
      const searchData = await getAdbyFilter(
        selectedOption,
        searchQuery,
        startDate,
        endDate,
        category
      );
      setSelectedData(searchData);
      if (searchData.length === 0) {
        setNoresult(true);
      }
      setLoading(false);
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
  const handlePageChange = (selected) => {
    setCurrentPage(selected - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Calculate the start and end indexes for the current page
  const startIndex = currentPage * adsPerPage;
  const endIndex = startIndex + adsPerPage;

  // Get ads for the current page
  const currentAds = selectedData.slice(startIndex, endIndex);

  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <MDBox p={2}>
      <Card elevation={3} style={{ padding: "12px", alignItems: "center" }}>
        <MDTypography
          component={Link}
          to="/advertisement"
          variant="h3"
          fontWeight="medium"
          mb={4}
          sx={{
            // Define a font size for mobile screens using a media query
            "@media (max-width: 600px)": {
              fontSize: "1.5rem", // Adjust the font size as needed
            },
          }}
        >
          Search Advertisements
        </MDTypography>
        <MDBox
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          alignItems="center"
          lineHeight={0}
        >
          <MDBox display="flex" alignItems="center" lineHeight={0} mb={2}>
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
          </MDBox>
          <MDBox mb={2}>
            <MDButton color="primary" onClick={handleSearch}>
              Search
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox p={2}>
        <MDBox mb={5}>{loading && <Loading type="bars" color="#755BB4" />}</MDBox>
        <MDBox mb={5}>{noresult && <MDTypography>No Search results found</MDTypography>}</MDBox>
        <Grid container spacing={2}>
          {currentAds.map((ad, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <SearchResultCard ad={ad} />
            </Grid>
          ))}
        </Grid>
        {selectedData.length > adsPerPage && (
          <MDBox display="flex" justifyContent="flex-end">
            <MDTypography color="dark">
              <Pagination
                count={Math.ceil(selectedData.length / adsPerPage)}
                color="primary"
                onChange={(event, page) => handlePageChange(page)}
              />
            </MDTypography>
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
};

export default AdvertisementSearch;

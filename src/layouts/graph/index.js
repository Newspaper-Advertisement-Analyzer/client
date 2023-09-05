import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import { useState, useRef, useEffect } from "react";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import LandsaleAveragePrice from "./components/barCharts/landSaleChart";
import CategoryDistribution from "./components/barCharts/categoryDist";
import MarriageDistribution from "./components/pieCharts/marriageDist";
import HouseSaleDistribution from "./components/pieCharts/houseSaleDDist";

import createPDF from "layouts/reports/reports";

function GraphViewer() {
  const [menu, setMenu] = useState(null);
  const contentRef = useRef(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const [includeLandSale, setIncludeLandSale] = useState(false);
  const [includeCategoryDist, setIncludeCategoryDist] = useState(false);
  const [includeMarriageDist, setIncludeMarriageDist] = useState(false);
  const [includeHouseSaleDist, setIncludeHouseSaleDist] = useState(false);
  const [includeAll, setIncludeAll] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      if (includeCategoryDist && includeHouseSaleDist && includeLandSale && includeMarriageDist) {
        setIncludeAll(true);
      } else {
        setIncludeAll(false);
      }
      // if (includeAll) {
      //   setIncludeCategoryDist(true);
      //   setIncludeHouseSaleDist(true);
      //   setIncludeLandSale(true);
      //   setIncludeMarriageDist(true);
      // }
    };
    fetchData();
  }, [includeCategoryDist, includeHouseSaleDist, includeLandSale, includeMarriageDist, includeAll]);

  const handleAll = () => {
    setIncludeAll(!includeAll);
    setIncludeCategoryDist(true);
    setIncludeHouseSaleDist(true);
    setIncludeLandSale(true);
    setIncludeMarriageDist(true);
  };
  const generatePDF = () => {
    const selectedComponents = [];

    // Check which components are selected and add them to the selectedComponents array
    if (includeLandSale) {
      selectedComponents.push(<LandsaleAveragePrice key="landSale" />);
    }
    if (includeCategoryDist) {
      selectedComponents.push(<CategoryDistribution key="categoryDist" />);
    }
    if (includeMarriageDist) {
      selectedComponents.push(<MarriageDistribution key="marriageDist" />);
    }
    if (includeHouseSaleDist) {
      selectedComponents.push(<HouseSaleDistribution key="houseSaleDist" />);
    }
    if (includeAll) {
      selectedComponents.push(<LandsaleAveragePrice key="landSale" />);
      selectedComponents.push(<CategoryDistribution key="categoryDist" />);
      selectedComponents.push(<MarriageDistribution key="marriageDist" />);
      selectedComponents.push(<HouseSaleDistribution key="houseSaleDist" />);
    }

    // Pass the selected components to your PDF generator function (ChartToPDF)
    createPDF(selectedComponents, contentRef);
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
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Projects
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>30 done</strong> this month
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox ref={contentRef}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <LandsaleAveragePrice />
            <MDBox display="flex" alignItems="center" mt={0.5} mb={0.5} ml={2.5}>
              <MDBox width="80%">
                <MDTypography variant="button" fontWeight="regular" color="text">
                  Do you want to include this graph in the generated PDF?
                </MDTypography>
              </MDBox>
              <MDBox mt={0.5}>
                <Switch
                  checked={includeLandSale}
                  onChange={() => setIncludeLandSale(!includeLandSale)}
                />
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <CategoryDistribution />
            <MDBox display="flex" alignItems="center" mt={0.5} mb={0.5} ml={2.5}>
              <MDBox width="80%">
                <MDTypography variant="button" fontWeight="regular" color="text">
                  Do you want to include this graph in the generated PDF?
                </MDTypography>
              </MDBox>
              <MDBox mt={0.5}>
                <Switch
                  checked={includeCategoryDist}
                  onChange={() => setIncludeCategoryDist(!includeCategoryDist)}
                />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MarriageDistribution />
        <MDBox display="flex" alignItems="center" mt={0.5} mb={0.5} ml={2.5}>
          <MDBox width="80%">
            <MDTypography variant="button" fontWeight="regular" color="text">
              Do you want to include this graph in the generated PDF?
            </MDTypography>
          </MDBox>
          <MDBox mt={0.5}>
            <Switch
              checked={includeMarriageDist}
              onChange={() => setIncludeMarriageDist(!includeMarriageDist)}
            />
          </MDBox>
        </MDBox>
        <HouseSaleDistribution />
        <MDBox display="flex" alignItems="center" mt={0.5} mb={0.5} ml={2.5}>
          <MDBox width="80%">
            <MDTypography variant="button" fontWeight="regular" color="text">
              Do you want to include this graph in the generated PDF?
            </MDTypography>
          </MDBox>
          <MDBox mt={0.5}>
            <Switch
              checked={includeHouseSaleDist}
              onChange={() => setIncludeHouseSaleDist(!includeHouseSaleDist)}
            />
          </MDBox>
        </MDBox>
      </MDBox>
      <Card
        elevation={3}
        style={{
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <MDTypography variant="h3" fontWeight="medium" mt={1} mb={5}>
          Generate Reports
        </MDTypography>
        <MDBox display="flex" alignItems="center" mt={0.5} mb={0.5} ml={2.5}>
          <MDBox width="80%">
            <MDTypography variant="button" fontWeight="regular" color="text">
              Do you want to include all the graphs in the generated PDF?
            </MDTypography>
          </MDBox>
          <MDBox mt={0.5}>
            <Switch checked={includeAll} onChange={handleAll} />
          </MDBox>
        </MDBox>
        <MDButton color="primary" maxWidth="20px" component="span" onClick={generatePDF}>
          Generate PDF
        </MDButton>
      </Card>
    </DashboardLayout>
  );
}

export default GraphViewer;

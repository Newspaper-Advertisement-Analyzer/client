import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import LandsaleAveragePrice from "./components/barCharts/landSaleChart";
import CategoryDistribution from "./components/barCharts/categoryDist";
import MarriageDistribution from "./components/pieCharts/marriageDist";
import HouseSaleDistribution from "./components/pieCharts/houseSaleDDist";

import generatePDF from "layouts/reports/reports";
import PriceFluctuation from "./components/lineCharts/pricefluctuation";
import MDInput from "components/MDInput";
import Demographic from "./components/lineCharts/demographic";
import HousesaleAveragePrice from "./components/barCharts/houseSaleChart";

import { useUser } from "utils/userContext";

function GraphViewer() {
  const contentRef = useRef(null);
  const { user } = useUser();
  console.log(user.user_ID);

  const [includeLandSale, setIncludeLandSale] = useState(false);
  const [includeCategoryDist, setIncludeCategoryDist] = useState(false);
  const [includeMarriageDist, setIncludeMarriageDist] = useState(false);
  const [includeHouseSaleDist, setIncludeHouseSaleDist] = useState(false);
  const [includePriceFluct, setIncludePriceFluct] = useState(false);
  const [includeDemographic, setIncludeDemographic] = useState(false);
  const [includeHouseSale, setIncludeHouseSale] = useState(false);
  const [includeAll, setIncludeAll] = useState(false);
  const [title, settitle] = useState("");

  useEffect(() => {
    const fetchData = () => {
      if (
        includeCategoryDist &&
        includeHouseSaleDist &&
        includeLandSale &&
        includeMarriageDist &&
        includePriceFluct &&
        includeDemographic &&
        includeHouseSale
      ) {
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
  }, [
    includeCategoryDist,
    includeHouseSaleDist,
    includeLandSale,
    includeMarriageDist,
    includeAll,
    includePriceFluct,
    includeDemographic,
    includeHouseSale,
  ]);

  const handleAll = () => {
    setIncludeAll(!includeAll);
    setIncludeCategoryDist(true);
    setIncludeHouseSaleDist(true);
    setIncludeLandSale(true);
    setIncludeMarriageDist(true);
    setIncludePriceFluct(true);
    setIncludeDemographic(true);
    setIncludeHouseSale(true);
  };
  const createPDF = () => {
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
    if (includePriceFluct) {
      selectedComponents.push(<PriceFluctuation key="priceFluct" />);
    }
    if (includeDemographic) {
      selectedComponents.push(<Demographic key="demographic" />);
    }
    if (includeHouseSale) {
      selectedComponents.push(<HousesaleAveragePrice key="houseSale" />);
    }

    // Pass the selected components to your PDF generator function (ChartToPDF)
    generatePDF(selectedComponents, contentRef, title, user.user_ID);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Grid container spacing={3} ref={contentRef}>
          <Grid item xs={12} md={6} lg={6}>
            <div>
              <LandsaleAveragePrice />
            </div>
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
            <div>
              <HousesaleAveragePrice />
            </div>
            <MDBox display="flex" alignItems="center" mt={0.5} mb={0.5} ml={2.5}>
              <MDBox width="80%">
                <MDTypography variant="button" fontWeight="regular" color="text">
                  Do you want to include this graph in the generated PDF?
                </MDTypography>
              </MDBox>
              <MDBox mt={0.5}>
                <Switch
                  checked={includeHouseSale}
                  onChange={() => setIncludeHouseSale(!includeHouseSale)}
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

          <Grid item xs={12} md={6} lg={6}>
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
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
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
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <PriceFluctuation />
            <MDBox display="flex" alignItems="center" mt={0.5} mb={0.5} ml={2.5}>
              <MDBox width="80%">
                <MDTypography variant="button" fontWeight="regular" color="text">
                  Do you want to include this graph in the generated PDF?
                </MDTypography>
              </MDBox>
              <MDBox mt={0.5}>
                <Switch
                  checked={includePriceFluct}
                  onChange={() => setIncludePriceFluct(!includePriceFluct)}
                />
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Demographic />
            <MDBox display="flex" alignItems="center" mt={0.5} mb={0.5} ml={2.5}>
              <MDBox width="80%">
                <MDTypography variant="button" fontWeight="regular" color="text">
                  Do you want to include this graph in the generated PDF?
                </MDTypography>
              </MDBox>
              <MDBox mt={0.5}>
                <Switch
                  checked={includeDemographic}
                  onChange={() => setIncludeDemographic(!includeDemographic)}
                />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
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
        <MDBox
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          mt={0.5}
          mb={0.5}
          ml={2.5}
        >
          <MDBox>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Do you want to include all the graphs in the generated PDF?
            </MDTypography>
          </MDBox>
          <MDBox mt={0.5}>
            <Switch checked={includeAll} onChange={handleAll} />
          </MDBox>
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          mt={0.5}
          mb={1}
          ml={2.5}
        >
          <MDBox>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Name of the report :
            </MDTypography>
          </MDBox>
          <MDBox>
            <MDInput
              value={title}
              onChange={(e) => settitle(e.target.value)}
              sx={{ width: "24vw" }}
              placeholder="default : graph"
            />
          </MDBox>
        </MDBox>
        <MDButton color="primary" maxWidth="20px" component="span" onClick={createPDF}>
          Generate PDF
        </MDButton>
      </Card>
    </DashboardLayout>
  );
}

export default GraphViewer;

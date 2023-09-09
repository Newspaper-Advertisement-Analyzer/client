/**
=========================================================
* Material Dashboard 2  React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MenuItem from "@mui/material/MenuItem";
// import MenuList from "@mui/material/MenuList";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import colors from "assets/theme/base/colors";
import configs from "examples/Charts/BarCharts/VerticalBarChart/configs";
import { Link } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function VerticalBarChart({
  icon,
  title,
  description,
  height,
  chart,
  menuItems,
  onMenuItemSelect,
  districts, // New prop for districts
  onDistrictSelect, // New prop for district selection
  action,
}) {
  const [selectedData, setSelectedData] = useState(menuItems[0]);
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]); // State for selected district
  // console.log("action", action.route);
  const handleMenuItemClick = (event) => {
    const dataKey = event.target.value;
    setSelectedData(dataKey);

    if (onMenuItemSelect) {
      onMenuItemSelect(dataKey);
    }
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict);
    if (onDistrictSelect) {
      onDistrictSelect(selectedDistrict);
    }
  };

  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        weight: 5,
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: colors[dataset.color]
          ? colors[dataset.color || "dark"].main
          : colors.dark.main,
        fill: false,
        maxBarThickness: 35,
      }))
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);

  const renderChart = (
    <MDBox py={2} pr={2} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <MDBox
          display="flex"
          px={description ? 1 : 0}
          pt={description ? 1 : 0}
          justifyContent="space-between"
          alignItems="center"
        >
          <MDBox display="flex">
            {icon.component && (
              <MDBox
                width="4rem"
                height="4rem"
                bgColor={icon.color || "dark"}
                variant="gradient"
                coloredShadow={icon.color || "dark"}
                borderRadius="xl"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="white"
                mt={-5}
                mr={2}
              >
                <Icon fontSize="medium">{icon.component}</Icon>
              </MDBox>
            )}
            <MDBox mt={icon.component ? -2 : 0}>
              {title && (
                <MDTypography component={Link} to={action.route} variant="h6">
                  {title}
                </MDTypography>
              )}
              <MDBox mb={2}>
                <MDTypography component="div" variant="button" color="text">
                  {description}
                </MDTypography>
              </MDBox>
            </MDBox>
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
              {menuItems.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </MDInput>

            <MDInput
              value={selectedDistrict}
              onChange={handleDistrictChange}
              size="small"
              sx={{
                marginRight: "5%",
              }}
              // Add options for districts
              select
            >
              {/* <MenuList
                style={{
                  maxHeight: "200px", // Adjust the maxHeight as needed
                  overflowY: "auto",
                }}
              > */}
              {districts.map((district, index) => (
                <MenuItem key={index} value={district}>
                  {district}
                </MenuItem>
              ))}
              {/* </MenuList> */}
            </MDInput>
          </MDBox>
        </MDBox>
      ) : null}
      {useMemo(
        () => (
          <MDBox height={height}>
            <Bar data={data} options={options} redraw />
          </MDBox>
        ),
        [chart, height]
      )}
    </MDBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

VerticalBarChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "19.125rem",
  menuItems: ["option 1", "option 2", "option 3"],
  districts: ["option 1", "option 2", "option 3"], // Default empty array for districts
  onDistrictSelect: null, // Default null for onDistrictSelect
};

VerticalBarChart.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
  menuItems: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onMenuItemSelect: PropTypes.func,
  districts: PropTypes.arrayOf(PropTypes.string), // Prop type for districts
  onDistrictSelect: PropTypes.func, // Prop type for onDistrictSelect
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default VerticalBarChart;

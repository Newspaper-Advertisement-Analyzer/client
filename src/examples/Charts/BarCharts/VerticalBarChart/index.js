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

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
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

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// VerticalBarChart configurations
import configs from "examples/Charts/BarCharts/VerticalBarChart/configs";

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function VerticalBarChart({
  icon,
  title,
  description,
  height,
  chart,
  menuItems,
  onMenuItemSelect,
}) {
  const [menu, setMenu] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  console.log("selectedData", selectedData);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleMenuItemClick = (dataKey) => {
    setSelectedData(dataKey);
    closeMenu();
    if (onMenuItemSelect) {
      onMenuItemSelect(dataKey); // Call the callback function with the selected item
    }
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
      {menuItems.map((item, index) => (
        <MenuItem key={index} onClick={() => handleMenuItemClick(item)}>
          {item}
        </MenuItem>
      ))}
    </Menu>
  );
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
              {title && <MDTypography variant="h6">{title}</MDTypography>}
              <MDBox mb={2}>
                <MDTypography component="div" variant="button" color="text">
                  {description}
                </MDTypography>
              </MDBox>
            </MDBox>
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

// Setting default values for the props of VerticalBarChart
VerticalBarChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "19.125rem",
  menuItems: ["option 1", "option 2", "option 3"],
};

// Typechecking props for the VerticalBarChart
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
};

export default VerticalBarChart;

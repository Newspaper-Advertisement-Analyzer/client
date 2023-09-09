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
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// PieChart configurations
import configs from "examples/Charts/PieChart/configs";
import MDInput from "components/MDInput";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({
  icon,
  title,
  description,
  height,
  chart,
  menuItems,
  onMenuItemSelect,
  action,
}) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});
  const [selectedData, setSelectedData] = useState(menuItems[0]);
  const handleMenuItemClick = (event) => {
    const dataKey = event.target.value;
    setSelectedData(dataKey);

    if (onMenuItemSelect) {
      onMenuItemSelect(dataKey);
    }
  };

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
          <MDBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
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
                <MDTypography variant="h6" component={Link} to={action.route}>
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
              select
            >
              {menuItems.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </MDInput>
          </MDBox>
        </MDBox>
      ) : null}
      {useMemo(
        () => (
          <MDBox height={height}>
            <Pie data={data} options={options} redraw />
          </MDBox>
        ),
        [chart, height]
      )}
    </MDBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of PieChart
PieChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "19.125rem",
  menuItems: ["option 1", "option 2", "option 3"],
};

// Typechecking props for the PieChart
PieChart.propTypes = {
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
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
  menuItems: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onMenuItemSelect: PropTypes.func,
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

export default PieChart;

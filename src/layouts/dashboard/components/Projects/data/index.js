/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { Header: "#", accessor: "companies", width: "5%", align: "left" },
      { Header: "Title", accessor: "members", width: "10%", align: "left" },
      { Header: "Source", accessor: "budget", align: "center" },
      { Header: "City", accessor: "completion", align: "center" },
      { Header: "Date", accessor: "a", align: "center" },
      { Header: "Address", accessor: "b", align: "center" },
      { Header: "PhoneNumber", accessor: "c", align: "center" },
      { Header: "Price", accessor: "d", align: "center" },
    ],

    rows: [
      {
        companies: 1,
        members: "#8976",
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </MDTypography>
        ),
        completion: "Badulla",
      },
    ],
  };
}

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
//import Tooltip from "@mui/material/Tooltip";
//import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
//import MDAvatar from "components/MDAvatar";

// Images

export default function data() {
  // const avatars = (members) =>
  //   members.map(([image, name]) => (
  //     <Tooltip key={name} title={name} placeholder="bottom">
  //       <MDAvatar
  //         src={image}
  //         alt="name"
  //         size="xs"
  //         sx={{
  //           border: ({ borders: { borderWidth }, palette: { white } }) =>
  //             `${borderWidth[2]} solid ${white.main}`,
  //           cursor: "pointer",
  //           position: "relative",

  //           "&:not(:first-of-type)": {
  //             ml: -1.25,
  //           },

  //           "&:hover, &:focus": {
  //             zIndex: "10",
  //           },
  //         }}
  //       />
  //     </Tooltip>
  //   ));

  return {
    columns: [
      { Header: "#", accessor: "index", width: "5%", align: "left" },
      { Header: "Title", accessor: "title", width: "10%", align: "left" },
      { Header: "Source", accessor: "source", align: "center" },
      { Header: "City", accessor: "city", align: "center" },
      { Header: "Date", accessor: "date", align: "center" },
      { Header: "Address", accessor: "address", align: "center" },
      { Header: "PhoneNumber", accessor: "phoneNumber", align: "center" },
      { Header: "Price", accessor: "price", align: "center" },
    ],

    rows: [
      {
        index: 1,
        title: "#8976",
        source: "Sunday Observer",
        city: "Badulla",
        //date: "2023/02/14",
        date: (
          <MDTypography variant="caption" color="secondary">
            2023/08/29
          </MDTypography>
        ),
        address: "129 3rd, Cross Street",
        phoneNumber: "078475891",
        price: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Rs.100,000
          </MDTypography>
        ),
      },
    ],
  };
}

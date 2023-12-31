import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";

function Projects() {
  const { landSale, houseSale, marriageProposals } = data();
  const [menu, setMenu] = useState(null);
  const [selectedData, setSelectedData] = useState(() => landSale);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  useEffect(() => {
    setSelectedData(landSale);
  }, []);
  const handleMenuItemClick = (dataKey) => {
    setSelectedData(dataKey);
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
      <MenuItem onClick={() => handleMenuItemClick(landSale)}>Land Sales</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick(houseSale)}>House Sales</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick(marriageProposals)}>Marriage Proposals</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Advertisements
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
              &nbsp;<strong>15 Advertisements Found</strong> in your database
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
      <MDBox>
        <DataTable
          table={{ columns: selectedData.columns, rows: selectedData.rows }}
          showTotalEntries={true}
          noEndBorder
          entriesPerPage={false}
          canSearch={true}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;

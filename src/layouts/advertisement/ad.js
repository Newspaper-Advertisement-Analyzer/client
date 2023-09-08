import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import React from "react";
import { AdCard } from "layouts/dashboard/components/adCard";
import AdvertisementSearch from "layouts/dashboard/components/SearchBar/searchBar";

const Ad = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <AdvertisementSearch />
        <AdCard />
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
};

export default Ad;

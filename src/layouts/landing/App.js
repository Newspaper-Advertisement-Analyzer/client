import React from "react";
import Hero from "./Page/Hero";
import Snippets from "./Page/Snippets";
import Access from "./Page/Access";
import Supercharge from "./Page/Supercharge";
import Agents from "./Page/Agents";
import Action from "./Page/Action";
// import Footer from "./Page/Footer";
import "./index.css";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import backgroundImage from "./Assets/images/background8.jpg";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Configurator from "examples/Configurator";
import { useMaterialUIController, setOpenConfigurator } from "context";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";

function App() {
  const containerStyle = {
    // backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const [controller, dispatch] = useMaterialUIController();
  const { openConfigurator } = controller;
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <div className="landing-page" style={containerStyle}>
      <main className="main">
        <DefaultNavbar />
        <Configurator />
        {configsButton}
        <Hero />
        <Snippets />
        <Access />
        <Supercharge />
        <Agents />
        <Action />
      </main>

      {/* <Footer className="footer" /> */}
    </div>
  );
}

export default App;

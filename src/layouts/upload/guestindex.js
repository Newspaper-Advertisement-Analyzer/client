import React from "react";

import CenteredTabs from "./tabs";
import MDBox from "components/MDBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Configurator from "examples/Configurator";
import { useMaterialUIController, setOpenConfigurator } from "context";
import Icon from "@mui/material/Icon";
import SignInModal from "./guestsign";
import { useEffect } from "react";
import { useState } from "react";

function GuestExtractor() {
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
  useEffect(() => {
    const timer = setTimeout(() => {
      handleOpenModal();
    }, 10000); // 5000 milliseconds (5 seconds)

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <DefaultNavbar />
      <Configurator />
      {configsButton}
      <MDBox p={10}>
        <MDBox mt={5}>
          <CenteredTabs />
          <SignInModal open={isModalOpen} onClose={handleCloseModal} />
        </MDBox>
      </MDBox>
    </>
  );
}

export default GuestExtractor;

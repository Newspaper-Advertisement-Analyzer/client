import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import FeedbackSection from "./feedback";
const Feedback = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FeedbackSection />
    </DashboardLayout>
  );
};

export default Feedback;

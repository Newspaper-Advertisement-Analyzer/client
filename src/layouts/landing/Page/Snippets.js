import React from "react";
import IMAGES from "../Assets/Images";
import MDTypography from "components/MDTypography";

function Snippets() {
  return (
    <>
      <section className="snippets">
        <div className="snippets__head">
          <MDTypography color="text" variant="h2" textAlign="center">
            Visualize Data Transform Numbers into Insights
          </MDTypography>

          <MDTypography color="text" variant="h4" textAlign="center" fontWeight="regular" mb={5}>
            Turn complex data into clear visualizations, empowering you to make informed decisions.
          </MDTypography>
        </div>
        <div className="snippets__body">
          <div className="snippets__body__img">
            <img src={IMAGES.computer} alt="computers" />
          </div>
          <div className="snippets__body__text">
            <MDTypography color="text" variant="h3" textAlign="center">
              Graph Visulaization
            </MDTypography>
            <MDTypography color="text" variant="h4" textAlign="center" fontWeight="regular" mb={5}>
              Render detailed graphs and charts to visualize complex data
            </MDTypography>

            <MDTypography color="text" variant="h3" textAlign="center">
              Report Generation
            </MDTypography>
            <MDTypography color="text" variant="h4" textAlign="center" fontWeight="regular" mb={5}>
              Create and Download customized Reports
            </MDTypography>

            <MDTypography color="text" variant="h3" textAlign="center">
              Reports History
            </MDTypography>
            <MDTypography color="text" variant="h4" textAlign="center" fontWeight="regular" mb={5}>
              Access your previous Reports easily
            </MDTypography>
          </div>
        </div>
      </section>
    </>
  );
}

export default Snippets;

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
            <h3>Graph Visulaization</h3>
            <p>Render detailed graphs and charts to visualize complex data</p>

            <h3>Report Generation</h3>
            <p>Create and Download customized Reports</p>

            <h3>Reports History</h3>
            <p>Access your previous Reports easily</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Snippets;

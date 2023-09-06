// import React from "react";
// import MDBox from "components/MDBox";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// export const AdCard = () => {
//   return (
//     <MDBox p={2}>
//       <Grid container spacing={6}>
//         <Grid item xs={12} md={6} xl={3}>
//           <Card elevation={3} style={{ padding: "12px", marginBottom: "16px" }}>
//             <DefaultProjectCard
//               image={homeDecor1}
//               label="Rs.1500000"
//               title="Land Sale"
//               description="Landscape views, or the natural environment surrounding a person."
//               action={{
//                 type: "internal",
//                 route: "/pages/profile/profile-overview",
//                 color: "info",
//                 label: "view Ad",
//               }}
//             />
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6} xl={3}>
//           <Card elevation={3} style={{ padding: "12px", marginBottom: "16px" }}>
//             <DefaultProjectCard
//               image={homeDecor2}
//               label="Rs.1500000"
//               title="House Sale"
//               description="Dream house that you want to live for the rest of your life."
//               action={{
//                 type: "internal",
//                 route: "/pages/profile/profile-overview",
//                 color: "info",
//                 label: "view Ad",
//               }}
//             />
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6} xl={3}>
//           <Card elevation={3} style={{ padding: "12px", marginBottom: "16px" }}>
//             <DefaultProjectCard
//               image={homeDecor3}
//               label="Rs.1500000"
//               title="Land Sale"
//               description="scene of nature, such as mountains, valleys, trees, rivers, and forests."
//               action={{
//                 type: "internal",
//                 route: "/pages/profile/profile-overview",
//                 color: "info",
//                 label: "view Ad",
//               }}
//             />
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6} xl={3}>
//           <Card elevation={3} style={{ padding: "12px", marginBottom: "16px" }}>
//             <DefaultProjectCard
//               image={homeDecor4}
//               label="Rs.1500000"
//               title="House Rent"
//               description="cheap and affordable house for rent in the city of Colombo."
//               action={{
//                 type: "internal",
//                 route: "/pages/profile/profile-overview",
//                 color: "info",
//                 label: "view Ad",
//               }}
//             />
//           </Card>
//         </Grid>
//       </Grid>
//     </MDBox>
//   );
// };

import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import { getPopularAd } from "api/advertisemntCards/advertisementCard";

import homeDecor1 from "assets/images/land.jpg";
import homeDecor2 from "assets/images/house (1).jpg";
import homeDecor3 from "assets/images/wedding.jpg";

export const AdCard = () => {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend using the imported function
    const fetchData = async () => {
      try {
        const data = await getPopularAd(); // Use the getPopularAd function to fetch data
        setBackendData(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // Create a mapping of categories to images
  const categoryToImage = {
    "Land Sale": homeDecor1,
    "House Sale": homeDecor2,
    "Marriage Proposal": homeDecor3,
    // Add more categories and corresponding image paths as needed
  };

  return (
    <MDBox p={2}>
      <Grid container spacing={6}>
        {backendData.map((item, index) => (
          <Grid item key={index} xs={12} md={6} xl={3}>
            <Card elevation={3} style={{ padding: "12px", marginBottom: "16px" }}>
              <DefaultProjectCard
                image={categoryToImage[item.category] || "defaultImage.jpg"} // Use categoryToImage mapping
                label={item.category}
                title={item.Title}
                description={item.Description}
                action={{
                  type: "internal",
                  route: `/advertisement/${item.Advertisement_ID}`,
                  color: "info",
                  label: "view Ad",
                }}
                // authors={123}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </MDBox>
  );
};

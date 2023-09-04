import React from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";

export const AdCard = () => {
  return (
    <MDBox p={2}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} xl={3}>
          <Card elevation={3} style={{ padding: "12px", marginBottom: "16px" }}>
            <DefaultProjectCard
              image={homeDecor1}
              label="Rs.1500000"
              title="Land Sale"
              description="Landscape views, or the natural environment surrounding a person."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view Ad",
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <Card elevation={3} style={{ padding: "12px", marginBottom: "16px" }}>
            <DefaultProjectCard
              image={homeDecor2}
              label="Rs.1500000"
              title="House Sale"
              description="Dream house that you want to live for the rest of your life."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view Ad",
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6} xl={3}>
          <Card elevation={3} style={{ padding: "12px", marginBottom: "16px" }}>
            <DefaultProjectCard
              image={homeDecor3}
              label="Rs.1500000"
              title="Land Sale"
              description="scene of nature, such as mountains, valleys, trees, rivers, and forests."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view Ad",
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <Card elevation={3} style={{ padding: "12px", marginBottom: "16px" }}>
            <DefaultProjectCard
              image={homeDecor4}
              label="Rs.1500000"
              title="House Rent"
              description="cheap and affordable house for rent in the city of Colombo."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view Ad",
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
};

// import React, { useState, useEffect } from "react";
// import MDBox from "components/MDBox";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// export const AdCard = () => {
//   const [backendData, setBackendData] = useState([]);

//   useEffect(() => {
//     // Fetch data from the backend
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/adcard"); // Replace with your actual backend API endpoint
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setBackendData(data); // Update state with the fetched data
//       } catch (error) {
//         console.error("Error fetching data from the backend:", error);
//       }
//     };

//     // Call the fetchData function when the component mounts
//     fetchData();
//   }, []);

//   return (
//     <MDBox p={2}>
//       <Grid container spacing={6}>
//         {backendData.map((item, index) => (
//           <Grid item key={index} xs={12} md={6} xl={3}>
//             <Card elevation={3} style={{ padding: "12px", marginBottom: "16px" }}>
//               <DefaultProjectCard
//                 image={item.image}
//                 label={item.label}
//                 title={item.title}
//                 description={item.description}
//                 action={item.action}
//                 authors={item.authors}
//               />
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </MDBox>
//   );
// };

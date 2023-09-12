import Grid from "@mui/material/Grid";
import AnchorLink from "react-anchor-link-smooth-scroll";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import SearchBar from "./components/SearchBar/searchBar";
import { AdCard } from "./components/adCard";
import { useState, useEffect } from "react";
import { getCounts } from "api/count/counts";
import { Link } from "react-router-dom";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const [counts, setCounts] = useState([]);
  // const { sales, tasks } = reportsLineChartData;
  useEffect(() => {
    // Fetch data from the backend using the imported function
    const fetchData = async () => {
      try {
        const data = await getCounts();
        setCounts(data);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <AnchorLink href="#table">
                <ComplexStatisticsCard
                  color="dark"
                  icon="newspaper"
                  title="Total Advertisements"
                  count={counts.ad_count}
                  percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than lask week",
                  }}
                />
              </AnchorLink>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <Link to="/reports">
                <ComplexStatisticsCard
                  color="success"
                  icon="store"
                  title="Reports"
                  count={counts.report_count}
                  percentage={{
                    color: "success",
                    amount: "+1%",
                    label: "than yesterday",
                  }}
                />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="face"
                title="Total Users"
                count={counts.user_count}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        <MDBox mt={3} mb={3}>
          <SearchBar />
        </MDBox>
        <AdCard />
        <div id="table">
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={12}>
                <Projects />
              </Grid>
              {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
            </Grid>
          </MDBox>
        </div>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

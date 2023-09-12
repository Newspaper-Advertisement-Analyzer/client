/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
import Upload from "layouts/upload";
import Ad_map from "layouts/advertisement_map";
// import ReportView from "layouts/reports/reportView";

// @mui icons
import Icon from "@mui/material/Icon";
import GraphViewer from "layouts/graph";
import AdvertisementDetail from "layouts/advertisement";
import Ad from "layouts/advertisement/ad";
import Report from "layouts/reports";
import GraphReport from "layouts/reports/graphs";
import App from "layouts/landing/App";
// import PrivateRoute from "utils/privateRoutes";
import { useUser } from "utils/userContext";
import PropTypes from "prop-types";
import TBH from "layouts/TBI/tbi";

// ...

// Create a wrapper component for the Dashboard
const Wrapper = ({ component: Component }) => {
  const { isAuthenticated } = useUser();

  if (isAuthenticated) {
    return <Component />;
  } else {
    return <SignIn />;
  }
};

const routes = [
  {
    type: "title",
    title: "General",
  },
  { type: "divider" },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Wrapper component={Dashboard} />,
  },
  {
    type: "collapse",
    name: "Search Advertisements",
    key: "adsearch",
    icon: <Icon fontSize="small">search</Icon>,
    route: "/advertisement",
    component: <Wrapper component={Ad} />,
  },
  {
    type: "collapse",
    name: "Advertisement Extractor",
    key: "upload",
    icon: <Icon fontSize="small">newspaper</Icon>,
    route: "/upload",
    component: <Wrapper component={Upload} />,
  },
  {
    type: "title",
    title: "Analysis",
  },
  { type: "divider" },
  {
    type: "collapse",
    name: "Graph Viewer",
    key: "graph",
    icon: <Icon fontSize="small">equalizer</Icon>,
    route: "/graphs",
    component: <Wrapper component={GraphViewer} />,
  },
  {
    type: "collapse",
    name: "Advertisement Map",
    key: "A_map",
    icon: <Icon fontSize="small">map</Icon>,
    route: "/advertisement_map",
    component: <Wrapper component={Ad_map} />,
  },
  {
    type: "title",
    title: "Insights",
  },
  { type: "divider" },
  {
    type: "collapse",
    name: "Reports",
    key: "reports",
    icon: <Icon fontSize="small">report</Icon>,
    route: "/reports",
    component: <Wrapper component={Report} />,
  },
  {
    type: "collapse",
    name: "FeedBack",
    key: "feedback",
    icon: <Icon fontSize="small">feedback</Icon>,
    route: "/feedback",
    component: <Wrapper component={TBH} />,
  },
  {
    type: "collapse",
    name: "Help and Support",
    key: "support",
    icon: <Icon fontSize="small">support</Icon>,
    route: "/support",
    component: <Wrapper component={TBH} />,
  },
  // {
  //   type: "collapse",
  //   name: "ReportsView",
  //   key: "reportsview",
  //   icon: <Icon fontSize="small">report</Icon>,
  //   route: "/reports_view",
  //   component: <ReportView />,
  // },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  {
    route: "/advertisement/:id",
    component: <Wrapper component={AdvertisementDetail} />,
  },
  {
    route: "/landing",
    component: <App />,
  },
  {
    route: "/reports/:title",
    component: <Wrapper component={GraphReport} />,
  },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  { type: "divider" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Wrapper component={Profile} />,
  },
  // {
  //   type: "collapse",
  //   name: "Settings",
  //   key: "settings",
  //   icon: <Icon fontSize="small">settings</Icon>,
  //   route: "/settings",
  //   component: <Wrapper component={TBH} />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

Wrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export default routes;

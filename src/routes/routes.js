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
import FeedbackSection from "layouts/feedback/index";
import GuestExtractor from "layouts/upload/guestindex";
import ResetPSW from "layouts/authentication/reset-password/cover";
import NewPassword from "layouts/authentication/reset-password/cover/newpassword";

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
    component: <Wrapper component={FeedbackSection} />,
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
    route: "/extractor",
    component: <GuestExtractor />,
  },
  {
    route: "/authentication/reset-password",
    component: <ResetPSW />,
  },
  {
    route: "/authentication/new-password",
    component: <NewPassword />,
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

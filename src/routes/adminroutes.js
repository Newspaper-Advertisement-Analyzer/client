// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import TBH from "layouts/TBI/tbi";

// @mui icons
import Icon from "@mui/material/Icon";

import AdvertisementDetail from "layouts/advertisement";

import GraphReport from "layouts/reports/graphs";
import App from "layouts/landing/App";
// import PrivateRoute from "utils/privateRoutes";
import { useUser } from "utils/userContext";
import PropTypes from "prop-types";
import AdvertisementForm from "layouts/admin/submitadvertisement/submitad";
import UserView from "layouts/admin/manageuser/manageuser";
import ManageFeedback from "layouts/admin/managefeedback/feedback";
import ContentApprovalPage from "layouts/admin/contentapproval/contentApproval";

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

const adminRoutes = [
  {
    type: "title",
    title: "Admin Panel",
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
    name: "Manage Advertisements",
    key: "admanage",
    icon: <Icon fontSize="small">search</Icon>,
    route: "/manageadvertisements",
    component: <Wrapper component={AdvertisementForm} />,
  },
  {
    type: "collapse",
    name: "Manage User Accounts",
    key: "usermanage",
    icon: <Icon fontSize="small">newspaper</Icon>,
    route: "/manageuser",
    component: <Wrapper component={UserView} />,
  },
  {
    type: "collapse",
    name: "User Feedback",
    key: "feedback",
    icon: <Icon fontSize="small">equalizer</Icon>,
    route: "/managefeedback",
    component: <Wrapper component={ManageFeedback} />,
  },
  {
    type: "collapse",
    name: "Content Approval",
    key: "content",
    icon: <Icon fontSize="small">map</Icon>,
    route: "/managecontent",
    component: <Wrapper component={ContentApprovalPage} />,
  },
  {
    type: "collapse",
    name: "Configure Graphs",
    key: "configGraph",
    icon: <Icon fontSize="small">report</Icon>,
    route: "/managegraphs",
    component: <Wrapper component={TBH} />,
  },
  {
    type: "collapse",
    name: "Reports",
    key: "reportsview",
    icon: <Icon fontSize="small">report</Icon>,
    route: "/managereports",
    component: <Wrapper component={TBH} />,
  },
  {
    type: "collapse",
    name: "User Support",
    key: "support",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/managesupport",
    component: <Wrapper component={TBH} />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
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
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Wrapper component={Profile} />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

Wrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export default adminRoutes;

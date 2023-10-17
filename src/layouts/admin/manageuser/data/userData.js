import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import { deleteUser, editUser, getUserList } from "api/ManageUser/users";
import PropTypes from "prop-types";

export default function Data() {
  const UserDetails = ({ name, email }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {name}
      </MDTypography>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  );

  UserDetails.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    getUserList()
      .then((data) => {
        setUserDetails(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleUserDelete = (userId) => {
    if (userId) {
      // Add code to delete the user using the user ID
      deleteUser(userId);
    } else {
      console.error("User ID is not available.");
    }
  };

  const handleUserEdit = (userId) => {
    if (userId) {
      // Add code to edit the user using the user ID
      editUser(userId);
    } else {
      console.error("User ID is not available.");
    }
  };

  return {
    columns: [
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Role", accessor: "role", align: "center" },
      { Header: "Last Seen", accessor: "lastSeen", align: "center" },
      { Header: "Manage", accessor: "action", align: "center" },
    ],
    rows: userDetails.map((user) => ({
      name: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.Full_Name}
        </MDTypography>
      ),
      email: <UserDetails name={user.Email} description="Organization" />,
      role: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={user.Profession} color="info" variant="gradient" size="sm" />
        </MDBox>
      ),
      lastSeen: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.lastSeen}
        </MDTypography>
      ),
      action: (
        <div>
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={() => handleUserDelete(user._id)} // Use an arrow function
          >
            Delete
          </MDTypography>
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={() => handleUserEdit(user._id)} // Use an arrow function
          >
            Edit
          </MDTypography>
        </div>
      ),
    })),
  };
}

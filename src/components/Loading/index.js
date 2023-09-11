import React from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";

const Loading = ({ type, color }) => (
  <MDBox display="flex" alignItems="center" justifyContent="center">
    <ReactLoading type={type} color={color} height={"5%"} width={"5%"} />
  </MDBox>
);

Loading.defaultProps = {
  type: "bars",
  color: "#755BB4",
};

Loading.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Loading;

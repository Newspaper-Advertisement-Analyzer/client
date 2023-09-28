import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();
const StateContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const useAppState = () => {
  return useContext(StateContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const [inputUrl, setInputUrl] = useState("");
  const [backendResponse, setBackendResponse] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imgBackendResponse, setimgBackendResponse] = useState([]);
  const [selectedPdfFiles, setSelectedPdfFiles] = useState([]);
  const [pdfBackendResponse, setpdfBackendResponse] = useState([]);
  const [imageScan, setImageScan] = useState(false);

  const state = {
    inputUrl,
    setInputUrl,
    backendResponse,
    setBackendResponse,
    selectedFiles,
    setSelectedFiles,
    imagePreviews,
    setImagePreviews,
    imgBackendResponse,
    setimgBackendResponse,
    selectedPdfFiles,
    setSelectedPdfFiles,
    pdfBackendResponse,
    setpdfBackendResponse,
    imageScan,
    setImageScan,
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      <StateContext.Provider value={{ state }}>{children}</StateContext.Provider>
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserProvider;

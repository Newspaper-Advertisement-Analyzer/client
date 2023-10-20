// import React, { useState } from "react";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
// import Box from "@mui/material/Box";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { Card } from "@mui/material";
// import MDButton from "components/MDButton";

// function AdvertisementForm() {
//   const [formData, setFormData] = useState({
//     title: "",
//     location: "",
//     date: "",
//     description: "",
//     image: null,
//   });

//   const [imagePreview, setImagePreview] = useState(null); // For image preview

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, image: file });

//     // Display image preview
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setImagePreview(event.target.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//     console.log("Form data:", formData);
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <Container maxWidth="xs" mt={5}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Submit Advertisement
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Box>
//               <Typography variant="body1" gutterBottom>
//                 Title
//               </Typography>
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//               />
//             </Box>
//             <Box>
//               <Typography variant="body1" gutterBottom>
//                 Location
//               </Typography>
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 required
//               />
//             </Box>
//             <Box>
//               <Typography variant="body1" gutterBottom>
//                 Date
//               </Typography>
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 name="date"
//                 type="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 required
//               />
//             </Box>
//             <Box>
//               <Typography variant="body1" gutterBottom>
//                 Description
//               </Typography>
//               <TextareaAutosize
//                 minRows={3}
//                 placeholder="Description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//                 style={{ width: "100%" }}
//               />
//             </Box>
//             <Box>
//               <Typography variant="body1" gutterBottom>
//                 Upload Image
//               </Typography>
//               <input
//                 accept="image/*"
//                 type="file"
//                 id="image"
//                 name="image"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
//               />
//               <label htmlFor="image">
//                 <MDButton
//                   variant="contained"
//                   component="span"
//                   startIcon={<CloudUploadIcon />}
//                   size="small" // Make the upload button smaller
//                 >
//                   Upload
//                 </MDButton>
//               </label>
//               {imagePreview && (
//                 <img
//                   src={imagePreview}
//                   alt="Uploaded Preview"
//                   style={{ maxWidth: "100%", marginTop: "8px" }}
//                 />
//               )}
//             </Box>
//             <Box mt={2} textAlign="center" alignItems="center">
//               <MDButton variant="contained" color="primary" type="submit" size="small">
//                 Submit Advertisement
//               </MDButton>
//             </Box>
//           </form>
//         </Container>
//       </Card>
//     </DashboardLayout>
//   );
// }

// export default AdvertisementForm;

import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card, Menu, MenuItem } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import { submitAdvertisement } from "api/submitAdvertisement/submitAdvertisement";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function AdvertisementForm() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    image: null,
    category: "", // New category field
  });
  const initialFormData = {
    title: "",
    location: "",
    description: "",
    image: null,
    category: "",
  };

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumbers" || name == "landMarks") {
      const phoneNumbers = value.split(",").map((number) => number.trim());
      setFormData({ ...formData, [name]: phoneNumbers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const imageRef = ref(storage, `advertisement-picture/${v4()}`); // Define the reference to the image
    await uploadBytes(imageRef, file); // Upload the image bytes
    const url = await getDownloadURL(imageRef);
    setFormData({ ...formData, image: url });

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // const [position, setPosition] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Split the locationsParam into individual city names
        const cityName = formData.nearestCity;
        // Initialize an array to store marker locations
        const markerLocations = [];
        // Use a geocoding service (like OpenStreetMap Nominatim) to get coordinates for each city
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Check if the response contains valid data
        if (Array.isArray(data) && data.length > 0) {
          const location = data[0]; // Take the first result
          // const position = [parseFloat(location.lat), parseFloat(location.lon)];
          // setPosition([parseFloat(location.lat), parseFloat(location.lon)]);
          formData.longitude = parseFloat(location.lon);
          formData.lattitude = parseFloat(location.lat);
          markerLocations.push({
            name: cityName,
            Location: {
              Latitude: parseFloat(location.lat),
              Longitude: parseFloat(location.lon),
            },
          });
        }

        // Update the markers state with the retrieved locations
      } catch (error) {
        console.error("Error fetching marker data:", error);
      }
    };
    fetchData();
  }, [formData.nearestCity, formData.longitude, formData.lattitude]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.category) {
      try {
        const response = await submitAdvertisement(formData);
        console.log("Advertisement submitted successfully:", response);
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error submitting advertisement:", error);
      }
    } else {
      alert("Select a category");
    }
  };

  // Define form fields based on category
  let categoryFields;
  if (formData.category === "Land Sale") {
    categoryFields = (
      <>
        <Box>
          <Typography variant="body1" gutterBottom>
            Price per Perch in LKR
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="pricePerPerch"
            value={formData.pricePerPerch}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Number of Perches
          </Typography>
          <TextField
            margin="normal"
            name="numberOfPerches"
            value={formData.numberOfPerches}
            onChange={handleChange}
            type="number"
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Posted on
          </Typography>
          <TextField
            margin="normal"
            name="postedOn"
            type="date"
            value={formData.postedOn}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Source
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="source"
            value={formData.source}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Phone Numbers
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="phoneNumbers"
            value={formData.phoneNumbers}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Email
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Nearest City
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="nearestCity"
            value={formData.nearestCity}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Longitude
          </Typography>
          <TextField
            margin="normal"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Lattitude
          </Typography>
          <TextField
            margin="normal"
            name="lattitude"
            value={formData.lattitude}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Address
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Land Marks
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="landMarks"
            value={formData.landMarks}
            onChange={handleChange}
          />
        </Box>
      </>
    );
  } else if (formData.category === "House Sale") {
    categoryFields = (
      <>
        <Box>
          <Typography variant="body1" gutterBottom>
            Price in LKR
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Number of rooms
          </Typography>
          <TextField
            margin="normal"
            name="numberOfRooms"
            value={formData.numberOfRooms}
            onChange={handleChange}
            type="number"
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Posted on
          </Typography>
          <TextField
            margin="normal"
            name="postedOn"
            type="date"
            value={formData.postedOn}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Source
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="source"
            value={formData.source}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Phone Numbers
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="phoneNumbers"
            value={formData.phoneNumbers}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Email
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Nearest City
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="nearestCity"
            value={formData.nearestCity}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Longitude
          </Typography>
          <TextField
            margin="normal"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Lattitude
          </Typography>
          <TextField
            margin="normal"
            name="lattitude"
            value={formData.lattitude}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Address
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Box>
        {/* Add more fields for housesale */}
      </>
    );
  } else if (formData.category === "Marriage Proposals") {
    categoryFields = (
      <>
        <Box>
          <Typography variant="body1" gutterBottom>
            Gender
          </Typography>
          <TextField
            margin="normal"
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
            select
            SelectProps={{
              // Add this prop to style the Select component
              style: { minHeight: "40px", minWidth: "100px" }, // You can adjust the height as needed
            }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Age
          </Typography>
          <TextField
            margin="normal"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Profession
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Nationality
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Other Requirements
          </Typography>
          <TextareaAutosize
            minRows={3}
            placeholder="Other Requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            style={{ width: "100%" }}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Posted on
          </Typography>
          <TextField
            margin="normal"
            name="postedOn"
            type="date"
            value={formData.postedOn}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Source
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="source"
            value={formData.source}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Phone Numbers
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="phoneNumbers"
            value={formData.phoneNumbers}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Email
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Nearest City
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="nearestCity"
            value={formData.nearestCity}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Longitude
          </Typography>
          <TextField
            margin="normal"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Lattitude
          </Typography>
          <TextField
            margin="normal"
            name="lattitude"
            value={formData.lattitude}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Address
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Box>
        {/* Add more fields for marriageproposals */}
      </>
    );
  }

  // const handleChangeMenu = (event) => {};

  const [categoryMenu, setCategoryMenu] = useState(null);

  const openCategoryMenu = ({ currentTarget }) => setCategoryMenu(currentTarget);
  const closeCategoryMenu = () => setCategoryMenu(null);
  const [category, setCategory] = useState("");

  const handleCategoryMenuItemClick = (dataKey) => {
    setCategory(dataKey);
    formData.category = dataKey;
    closeCategoryMenu();
  };

  const renderCategoryMenu = (
    <Menu
      id="simple-menu"
      anchorEl={categoryMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(categoryMenu)}
      onClose={closeCategoryMenu}
    >
      <MenuItem onClick={() => handleCategoryMenuItemClick("Land Sale")}>Land Sales</MenuItem>
      <MenuItem onClick={() => handleCategoryMenuItemClick("House Sale")}>House Sales</MenuItem>
      <MenuItem onClick={() => handleCategoryMenuItemClick("Marriage Proposals")}>
        Marriage Proposals
      </MenuItem>
    </Menu>
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Container maxWidth="xs">
          <Typography variant="h4" align="center" gutterBottom style={{ marginTop: "20px" }}>
            Submit Advertisement
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* <Box>
              <Typography variant="body1" gutterBottom>
                Category
              </Typography>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Land Sale">Land Sale</option>
                <option value="House Sale">House Sale</option>
                <option value="Marriage Proposals">Marriage Proposals</option>
              </select>
            </Box> */}
            <Box>
              <Typography variant="body1" gutterBottom>
                Category
              </Typography>
              <MDBox>
                <MDBox>
                  <MDInput
                    value={category}
                    onChange={handleChange}
                    readOnly // Make the input read-only to prevent typing
                    onClick={openCategoryMenu}
                    sx={{ width: "50vw" }}
                    // label="Search By Category"
                  />
                  {renderCategoryMenu}
                </MDBox>
              </MDBox>
            </Box>
            {categoryFields /* Render category-specific fields */}

            <Box>
              <Typography variant="body1" gutterBottom>
                Title
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Box>
            <Box>
              <Typography variant="body1" gutterBottom>
                Description
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <Typography variant="body1" gutterBottom>
                Upload Image
              </Typography>
              <input
                accept="image/*"
                type="file"
                id="image"
                name="image"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="image">
                <MDButton
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  size="small"
                >
                  Upload
                </MDButton>
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  style={{ maxWidth: "100%", marginTop: "8px" }}
                />
              )}
            </Box>
            <Box mt={2} textAlign="center" alignItems="center" style={{ marginBottom: "20px" }}>
              <MDButton variant="contained" color="primary" type="submit" size="large">
                Submit Advertisement
              </MDButton>
            </Box>
          </form>
        </Container>
      </Card>
    </DashboardLayout>
  );
}

export default AdvertisementForm;

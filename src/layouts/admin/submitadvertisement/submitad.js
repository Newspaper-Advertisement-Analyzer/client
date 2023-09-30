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

import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card } from "@mui/material";
import MDButton from "components/MDButton";

function AdvertisementForm() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
    image: null,
    category: "", // New category field
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  // Define form fields based on category
  let categoryFields;
  if (formData.category === "landsale") {
    categoryFields = (
      <>
        <Box>
          <Typography variant="body1" gutterBottom>
            Price per Perch
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="pricePerPerch"
            value={formData.pricePerPerch}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Number of Perches
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="numberOfPerches"
            value={formData.numberOfPerches}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Posted on
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="postedOn"
            type="date"
            value={formData.postedOn}
            onChange={handleChange}
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
  } else if (formData.category === "housesale") {
    categoryFields = (
      <>
        <Box>
          <Typography variant="body1" gutterBottom>
            Price
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Number of rooms
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="numberOfRooms"
            value={formData.numberOfRooms}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Posted on
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="postedOn"
            type="date"
            value={formData.postedOn}
            onChange={handleChange}
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
  } else if (formData.category === "marriageproposals") {
    categoryFields = (
      <>
        <Box>
          <Typography variant="body1" gutterBottom>
            Gender
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Age
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="age"
            value={formData.age}
            onChange={handleChange}
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
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Posted on
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="postedOn"
            type="date"
            value={formData.postedOn}
            onChange={handleChange}
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Container maxWidth="xs" mt={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Submit Advertisement
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box>
              <Typography variant="body1" gutterBottom>
                Category
              </Typography>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="landsale">Land Sale</option>
                <option value="housesale">House Sale</option>
                <option value="marriageproposals">Marriage Proposals</option>
              </select>
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
            <Box mt={2} textAlign="center" alignItems="center">
              <MDButton variant="contained" color="primary" type="submit" size="small">
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

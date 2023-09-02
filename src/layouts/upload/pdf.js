import React, { useState } from "react";

const PDFUploader = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("/process_image", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setText(data.extracted_text);
        } else {
          setText("Error processing the image.");
        }
      } catch (error) {
        setText("Error connecting to the server.");
      }
    } else {
      setText("Please select an image.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload and Process</button>
      {text && <div>{text}</div>}
    </div>
  );
};

export default PDFUploader;

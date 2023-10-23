import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import baseURL from "config";
import React, { useState } from "react";

function NewPassword() {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === "") {
      alert("Please enter password");
      return;
    }

    // Send the password to the backend
    fetch(`${baseURL}/new-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
      .then((response) => {
        response.json();
      })

      .then((data) => {
        console.log("this is verification", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // TODO: handle password submission
  };

  return (
    <div>
      <DashboardLayout>
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </DashboardLayout>
    </div>
  );
}

export default NewPassword;

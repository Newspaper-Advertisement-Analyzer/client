import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

export default function VerificationDialog({
  open,
  onClose,
  email,
  onSuccess,
}) {
  const [verificationCode, setVerificationCode] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [alertType, setAlertType] = useState(null);


  useEffect(() => {
    let interval = null;

    if (open && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      // Clear interval when component unmounts or dialog closes
      return () => {
        clearInterval(interval);
      };
    } else if (!open) {
      // Reset timer when dialog closes
      setTimeRemaining(60);
    }
  }, [open, timeRemaining]);

  const handleVerificationSubmit = () => {
    if (verificationCode) {
      axios
        .post("/verify", {
          email: email,
          verificationCode: verificationCode,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.success) {

            alert("Registration successful!");
            setAlertType("success");
            onSuccess();
          } else {
          setAlertType("error");
            alert("Verification code is incorrect or expired.");
          }
          onClose();
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }
  };

  const handleCancel = () => {
    axios
      .post("/verify", {
        email: email,
        verificationCode: "", // Provide an empty code to indicate cancellation
        cancel: true, // Add a flag to indicate cancellation
      })
      .then(function (response) {
        console.log(response);
        //   setVerificationOpen(false);
        onClose();
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Verification Code</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the verification code you received:
          {timeRemaining > 0 ? (
            <span> ({timeRemaining} seconds left)</span>
          ) : (
            <span style={{ color: "red" }}> (Timeout)</span>
          )}
        </DialogContentText>

        {/* {alertType === "success" && (
          <Alert severity="success">Registration successful!</Alert>
        )}

        {alertType === "error" && (
          <Alert severity="error">
            Verification code is incorrect or expired.
          </Alert>
        )} */}
        
        <TextField
          autoFocus
          margin="dense"
          label="Verification Code"
          type="text"
          fullWidth
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleVerificationSubmit}
          color="primary"
          disabled={timeRemaining === 0}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

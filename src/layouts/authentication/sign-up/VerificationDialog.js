/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import baseURL from "config";
import { useUser } from "utils/userContext";

export default function VerificationDialog({ open, onClose, email, onSuccess, address }) {
  const [verificationCode, setVerificationCode] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [alertType, setAlertType] = useState(null);
  const [alertPassword, setAlertPassword] = useState(false);
  const [hideComponent, sethideComponent] = useState(true);
  const [newpassword, setNewPassword] = useState("");
  const { login } = useUser();

  useEffect(() => {
    let interval = null;

    if (open && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else if (!open) {
      setTimeRemaining(60);
    }
  }, [open, timeRemaining]);

  const handleVerificationSubmit = () => {
    if (verificationCode) {
      axios
        .post(`${baseURL}/${address}`, {
          email: email,
          verificationCode: verificationCode,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.success) {
            setAlertType("success");
            console.log(alertType);
            if (address === "verify") {
              const userData = response.data.user;
              login({
                name: userData.User_Name,
                full_name: userData.Full_Name,
                user_ID: userData.UserID,
                role: userData.Role,
                email: userData.email,
                phone_Number: userData.Contact_Number,
                profession: userData.Profession,
                Profile_Picture: userData.Profile_Picture,
              });
              onSuccess();
              onClose();
            } else if (address === "verify-email") {
              setAlertPassword(true);
              sethideComponent(false);
              setNewPassword(response.data.newpassword);
              // onSuccess();
            } else {
              setAlertType("error");
              alert("Verification code is incorrect or expired.");
            }
          }
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }
  };

  const handlePasswordSubmit = () => {
    onSuccess();
    onClose();
  };

  const handleCancel = () => {
    axios
      .post(`${baseURL}/verify`, {
        email: email,
        verificationCode: "",
        cancel: true,
      })
      .then(function (response) {
        console.log(response);
        onClose();
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        {hideComponent && (
          <>
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
              <>
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
              </>
            </DialogActions>
          </>
        )}
        {alertPassword && (
          <>
            <DialogTitle>Verification Successful</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Your new password is {newpassword} Important: Please imediately change your password
                after login
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handlePasswordSubmit} color="primary" disabled={timeRemaining === 0}>
                Sign In
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

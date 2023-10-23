import React from "react";
import PropTypes from "prop-types";

import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";

function TermModal({ open, onClose }) {
  const cardContentStyle = {
    width: "80%",
    height: "80vh",
    overflowY: "scroll",
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card style={cardContentStyle}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} mt={5}>
              <MDTypography variant="h5" fontWeight="medium" textAlign="center">
                Welcome to the Digital Newspaper Advertisement Analyzer.
              </MDTypography>
              <MDTypography mt={2} variant="h6" fontWeight="medium">
                Please read these Terms and Conditions (&quot;Terms&quot;) carefully before using
                this service.
              </MDTypography>
              <MDTypography mt={2} fontWeight="bold">
                Acceptance of Terms
              </MDTypography>
              <MDTypography variant="h6" fontWeight="medium">
                By using the Digital Newspaper Advertisement Analyzer (hereafter referred to as
                &quot;the Service&quot;), you agree to comply with and be bound by these Terms. If
                you do not agree with any part of these Terms, you should not use the Service.
                <br></br>
                <MDTypography mt={2} fontWeight="bold">
                  Use of the Service
                </MDTypography>
                You must be at least 18 years old to use this Service. You are responsible for
                maintaining the security of your account and password. The Service cannot and will
                not be liable for any loss or damage from your failure to comply with this security
                obligation. <br></br>
                <MDTypography mt={2} fontWeight="bold">
                  Privacy
                </MDTypography>
                Your use of the Service is also governed by our Privacy Policy. Please review our
                Privacy Policy to understand our data practices. <br></br>
                <MDTypography mt={2} fontWeight="bold">
                  User Content
                </MDTypography>
                You retain the rights to your content, but you grant the Service a worldwide,
                royalty-free, non-exclusive license to use, distribute, reproduce, modify, adapt,
                and publish your content solely for the purpose of displaying, distributing, and
                promoting the Service. You agree not to use the Service to submit or link to any
                content which is defamatory, abusive, hateful, threatening, spam, or spam-like.{" "}
                <br></br>
                <MDTypography mt={2} fontWeight="bold">
                  Intellectual Property
                </MDTypography>
                The Service and its original content (excluding user-provided content) are protected
                by copyright, trademark, patent, trade secret, and other laws. You may not modify,
                reproduce, distribute, create derivative works or adaptations of, publicly display
                or in any way exploit any of the content in whole or in part except as expressly
                authorized by the Service. Trademarks, service marks, graphics, and logos used in
                connection with the Service are trademarks or registered trademarks of the
                Service&apos;s licensors. You are granted no right or license with respect to any of
                the aforesaid trademarks. <br></br>
                <MDTypography mt={2} fontWeight="bold">
                  Termination
                </MDTypography>
                We may terminate or suspend access to our Service immediately, without prior notice
                or liability, for any reason whatsoever, including without limitation if you breach
                the Terms. <br></br>
                <MDTypography mt={2} fontWeight="bold">
                  Changes to the Terms
                </MDTypography>
                We reserve the right, at our sole discretion, to modify or replace these Terms at
                any time. If a revision is material, we will try to provide at least 30 days&apos;
                notice prior to any new terms taking effect. What constitutes a material change will
                be determined at our sole discretion. <br></br>
                <MDTypography mt={2} fontWeight="bold">
                  Contact Us{" "}
                </MDTypography>
                If you have any questions about these Terms, please contact us. <br></br>By using
                the Digital Newspaper Advertisement Analyzer, you agree to these Terms and
                Conditions. Thank you for using our service!
              </MDTypography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  );
}

TermModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TermModal;

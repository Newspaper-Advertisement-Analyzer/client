import React, { useState } from "react";
import { getReportPdf } from "api/report/getReports"; // Import the getReportPdf function

// Define a component that allows you to enter a report ID and view the report
function ReportViewer() {
  const [reportId, setReportId] = useState("");
  const [viewReportError, setViewReportError] = useState(null);

  const handleViewReport = async () => {
    try {
      if (reportId) {
        // Call the getReportPdf function to fetch and display the report
        await getReportPdf(reportId);
        setViewReportError(null);
      } else {
        setViewReportError("Please enter a valid report ID.");
      }
    } catch (error) {
      console.error("Error viewing report:", error);
      setViewReportError("An error occurred while viewing the report.");
    }
  };

  return (
    <div>
      <h2>View Report by ID</h2>
      <div>
        <label htmlFor="reportId">Report ID:</label>
        <input
          type="text"
          id="reportId"
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
        />
        <button onClick={handleViewReport}>View Report</button>
      </div>
      {viewReportError && <p>{viewReportError}</p>}
    </div>
  );
}

export default ReportViewer;

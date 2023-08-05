import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState(null);
  const [inp, setInp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/members", {
      method: "POST",
      body: JSON.stringify({ inp: inp }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <center>
          <h1>Enter Advertisement URL</h1>
          <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input
              type="text"
              name="inp"
              placeholder="Enter URL"
              value={inp}
              onChange={(e) => setInp(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="submit"
              name="submit"
              id="btn"
              value="Submit"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                background: "blue",
                color: "white",
                cursor: "pointer",
              }}
            />
          </form>

          {message && (
            <>
              {message.location && <h2>Location: {message.location}</h2>}
              {message.category && <h2>Category: {message.category}</h2>}
              {message.phone_numbers && <h2>Phone Numbers: {message.phone_numbers.join(", ")}</h2>}
              {message.prices && <h2>Prices: {message.prices.join(", ")}</h2>}
            </>
          )}
        </center>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import Hero from "./Page/Hero";
import Snippets from "./Page/Snippets";
import Access from "./Page/Access";
import Supercharge from "./Page/Supercharge";
import Agents from "./Page/Agents";
import Action from "./Page/Action";
// import Footer from "./Page/Footer";
import "./index.css";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import backgroundImage from "./Assets/images/background8.jpg";

function App() {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  };
  return (
    <div className="landing-page" style={containerStyle}>
      <main className="main">
        <Hero />
        <Snippets />
        <Access />
        <Supercharge />
        <Agents />
        <Action />
      </main>

      {/* <Footer className="footer" /> */}
    </div>
  );
}

export default App;

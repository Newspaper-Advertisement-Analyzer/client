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

function App() {
  return (
    <div className="landing-page">
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

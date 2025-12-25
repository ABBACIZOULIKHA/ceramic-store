import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactInfo from "../components/ContactInfo";

const Contact = () => {
  return (
   <div>
    <Navbar/>
    <div className="pt-[110px]">
      <ContactInfo />
    </div>
    <Footer/>
   </div>
    
  );
};

export default Contact;

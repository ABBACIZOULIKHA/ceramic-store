import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactInfo from "../components/ContactInfo";
import { usePageMeta } from "../lib/usePageMeta";

const Contact = () => {
  usePageMeta({
    title: "Contact | Abbaci Ceramic",
    description:
      "Contactez Abbaci Ceramic : Rue Medber Djilali, Hadjout, Tipaza. Tél : (+213) 793 921 328. Rejoignez notre groupe WhatsApp.",
  });

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

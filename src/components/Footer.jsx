import React from "react";
import logo from "../images/Logo.png";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="font-Poppins">
      {/* Main footer */}
      <div className="bg-olive text-ivory px-6 py-12 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* Logo & description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Abbaci Ceramic Logo"
                className="w-32 h-auto"
              />
              <div>
                <h2 className="text-clay text-2xl font-semibold leading-tight">
                  ABBACI
                </h2>
                <span className="text-sand text-base">
                  Ceramic
                </span>
              </div>
            </div>

            <p className="text-ivory/90 text-sm max-w-xs">
              Nous vous accompagnons dans vos projets de construction
              et de rénovation avec des matériaux céramiques
              durables et élégants.
            </p>
          </div>

          {/* Products */}
          <div className="text-center md:text-left">
            <h3 className="text-sand text-lg font-semibold mb-4">
              Produits
            </h3>
            <ul className="space-y-2 text-ivory/90">
              <li className="hover:text-clay transition">
                Carreaux de Sol
              </li>
              <li className="hover:text-clay transition">
                Faïences Murales
              </li>
              <li className="hover:text-clay transition">
                Sanitaires
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-sand text-lg font-semibold mb-4">
              Contact
            </h3>

            <div className="flex items-start justify-center md:justify-start gap-3">
              <FaMapMarkerAlt className="text-clay mt-1" />
              <p className="text-sm">
                Rue Medber Djilali, Hadjout, Tipaza
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <FaPhoneAlt className="text-clay" />
              <p className="text-sm">(+213) 793 921 328</p>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <FaEnvelope className="text-clay" />
              <p className="text-sm">kz_abbaci@esi.dz</p>
            </div>

            {/* Social icons */}
            <div className="flex justify-center md:justify-start gap-4 pt-4">
              <a
                href="https://facebook.com"
                className="bg-clay text-olive p-2 rounded-full hover:bg-sand transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                className="bg-clay text-olive p-2 rounded-full hover:bg-sand transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="htttps://linkedin.com"
                className="bg-clay text-olive p-2 rounded-full hover:bg-sand transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black text-ivory text-center py-4 text-sm">
        © 2025, Abbaci Ceramic
      </div>
    </footer>
  );
};

export default Footer;

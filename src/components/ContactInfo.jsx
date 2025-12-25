import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="font-Poppins bg-ivory min-h-screen py-16 px-6 md:px-16">
     
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-semibold text-olive">
            Contactez-nous
          </h1>
          <p className="text-stone mt-4 max-w-2xl mx-auto">
            Nous sommes à votre disposition pour vous accompagner
            dans vos projets de construction et de rénovation.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="bg-olive text-ivory rounded-xl p-8 space-y-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-sand mb-6">
              Informations de contact
            </h2>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-clay text-xl" />
              <p>
                Rue Medber Djilali, Hadjout, Tipaza
              </p>
            </div>

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-clay text-xl" />
              <a
                href="tel:+213793921328"
                className="hover:text-sand transition"
              >
                (+213) 793 921 328
              </a>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-clay text-xl" />
              <a
                href="mailto:kz_abbaci@esi.dz"
                className="hover:text-sand transition"
              >
                kz_abbaci@esi.dz
              </a>
            </div>

            {/* Social media */}
            <div className="pt-6">
              <p className="mb-4 text-sand font-medium">
                Suivez-nous
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-clay text-olive p-3 rounded-full hover:bg-sand transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="bg-clay text-olive p-3 rounded-full hover:bg-sand transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="bg-clay text-olive p-3 rounded-full hover:bg-sand transition"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg h-[400px] md:h-full">
            <iframe
              title="Abbaci Ceramic Location"
              src="https://www.google.com/maps?q=Hadjout%20Tipaza&output=embed"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

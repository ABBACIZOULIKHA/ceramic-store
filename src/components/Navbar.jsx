import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../images/Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = -80; // pour tenir compte de la navbar fixe
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition + offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50">
      {/* TOP BAR */}
      <div className="bg-gradient-to-r from-clay to-olive text-white text-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <FaPhoneAlt /> (+213) 793 921 328
            </span>
            <span className="hidden md:flex items-center gap-2">
              <FaEnvelope /> kz_abbaci@esi.dz
            </span>
          </div>
          <div className="flex gap-3">
            {[FaFacebookF, FaInstagram].map((Icon, i) => (
              <Icon
                key={i}
                size={20}
                className="cursor-pointer hover:scale-110 transition-transform duration-200"
              />
            ))}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`backdrop-blur-md transition-all duration-300 ${
          scrolled ? "bg-white/95 shadow-md" : "bg-white/70"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
          {/* LOGO */}
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="ABBACI Ceramic"
              className="w-20 h-20 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold tracking-wide text-olive">
                ABBACI
              </h1>
              <p className="text-sm uppercase tracking-widest text-sage">
                Ceramic
              </p>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-10 font-medium text-olive">
            <li className="relative group">
              <Link to="/" className="text-sm hover:text-clay transition">
                Accueil
              </Link>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-clay transition-all group-hover:w-full"></span>
            </li>

            <li className="relative group cursor-pointer" onClick={() => handleScrollToSection("apropos")}>
              <span className="text-sm hover:text-clay transition">À propos</span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-clay transition-all group-hover:w-full"></span>
            </li>

            <li className="relative group">
              <Link to="/produits" className="text-sm hover:text-clay transition">
                Produits
              </Link>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-clay transition-all group-hover:w-full"></span>
            </li>

            {/* CTA */}
            <li className="ml-6">
              <Link to="/contact">
                <button className="px-6 py-2 rounded-full bg-clay text-white text-sm hover:scale-105 hover:shadow-lg transition-all">
                  Contact
                </button>
              </Link>
            </li>
          </ul>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-olive text-3xl"
            onClick={() => setOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120 }}
            className="fixed inset-0 bg-white z-50 flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-5 border-b border-olive/30">
              <span className="text-xl font-bold text-olive">Menu</span>
              <button onClick={() => setOpen(false)} className="text-3xl text-olive">
                <FaTimes />
              </button>
            </div>

            <ul className="flex flex-col items-center gap-8 mt-12 text-olive text-lg">
              <li>
                <Link to="/" onClick={() => setOpen(false)}>Accueil</Link>
              </li>
              <li>
                <button
                  onClick={() => handleScrollToSection("apropos")}
                  className="w-full text-left"
                >
                  À propos
                </button>
              </li>
              <li>
                <Link to="/produits" onClick={() => setOpen(false)}>Produits</Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

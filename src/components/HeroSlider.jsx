import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.jpg";
import { Link } from "react-router-dom";

const images = [img1, img2, img3, img4, img5];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* SLIDER */}
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white/75 backdrop-blur-xl p-8 md:p-10 rounded-3xl max-w-xl shadow-2xl"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-olive leading-tight">
            Sublimez <span className="text-clay">chaque espace</span>  
            <br /> de votre maison
          </h1>

          <p className="mt-4 text-sage text-base md:text-lg">
            Faïence, carrelage, salles de bain complètes  
            et accessoires haut de gamme.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
             <Link to="/produits">
            <button className="px-6 py-3 rounded-full bg-olive text-white text-sm font-medium hover:scale-105 hover:shadow-lg transition">
              Découvrir les produits
            </button>
            </Link>
            <Link to="/contact">
            <button className="px-6 py-3 rounded-full bg-clay text-white text-sm font-medium hover:scale-105 hover:shadow-lg transition">
              Contactez-nous
            </button>
            </Link> 
          </div>
        </motion.div>
      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? "w-8 bg-white"
                : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;

import { motion } from "framer-motion";
import StorePhoto from "../images/My_Store.webp";
import { Link } from "react-router-dom";
import { FaClock, FaBoxOpen, FaUsers } from "react-icons/fa";

const APropos = () => {
  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, type: "spring" },
    }),
  };

  return (
    <section
      id="apropos"
      className="bg-ivory py-20 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Image */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <img
            src={StorePhoto}
            alt="À propos Abbaci Ceramic"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </motion.div>

        {/* Texte */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex flex-col"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-olive mb-6">
            Qui sommes-nous ?
          </h2>

          {/* Badges avec icônes */}
          <div className="flex flex-wrap gap-4 mb-6">
            <motion.div
              custom={0}
              variants={badgeVariants}
              initial="hidden"
              whileInView="visible"
              className="flex items-center gap-2 bg-olive text-white px-4 py-2 rounded-full font-semibold"
            >
              <FaClock /> +25 ans
            </motion.div>
            <motion.div
              custom={1}
              variants={badgeVariants}
              initial="hidden"
              whileInView="visible"
              className="flex items-center gap-2 bg-clay text-white px-4 py-2 rounded-full font-semibold"
            >
              <FaBoxOpen /> +100 produits
            </motion.div>
            <motion.div
              custom={2}
              variants={badgeVariants}
              initial="hidden"
              whileInView="visible"
              className="flex items-center gap-2 bg-sage text-white px-4 py-2 rounded-full font-semibold"
            >
              <FaUsers /> +1k clients satisfaits
            </motion.div>
          </div>

          <p className="text-base md:text-lg text-olive/80 leading-relaxed mb-4">
            Chez <span className="font-semibold">ABBACI Ceramic</span>, nous sommes passionnés par la finition élégante et durable de votre maison. Nous proposons des faïences, carrelages, sanitaires et accessoires de qualité pour tous vos projets.
          </p>

          <p className="text-base md:text-lg text-olive/80 leading-relaxed mb-6">
            Notre équipe vous accompagne de la sélection à l'installation, avec un savoir-faire artisanal et des matériaux soigneusement sélectionnés.
          </p>

          <Link to="/produits">
            <button className="bg-clay text-white px-6 py-3 rounded-full hover:bg-olive transition-all">
              Découvrir nos produits
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default APropos;

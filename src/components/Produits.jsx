import { motion } from "framer-motion";
import solImg from "../images/img5.jpg";
import faienceImg from "../images/img2.jpg";
import sanitaireImg from "../images/img3.jpg";

const categories = [
  {
    title: "Carreaux de Sol",
    img: solImg,
  },
  {
    title: "Faïences Murales",
    img: faienceImg,
  },
  {
    title: "Sanitaires",
    img: sanitaireImg,
  },
];

const NosProduits = () => {
  return (
    <section id="produits" className="py-10 md:py-10 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-olive mb-4">
          Nos Produits
        </h2>
        <p className="text-olive/70 text-base md:text-lg">
          Découvrez nos catégories de produits de qualité pour la finition de votre maison.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group"
          >
            <div className="relative">
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-semibold text-xl">
                  {cat.title}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NosProduits;

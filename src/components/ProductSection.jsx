import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductGrid from "./ProductGrid";

const ProductSection = ({ id, title, subtitle, fetcher, className = "", accentLabel }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetcher()
      .then((data) => {
        if (active) setProducts(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [fetcher]);

  return (
    <section id={id} className={`scroll-mt-24 py-16 md:py-20 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto text-center mb-12">
        {accentLabel && (
          <span className="inline-block bg-clay/10 text-clay text-xs font-bold uppercase tracking-wide px-4 py-1 rounded-full mb-3">
            {accentLabel}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-olive mb-4">{title}</h2>
        <p className="text-olive/70 text-base md:text-lg">{subtitle}</p>
      </div>

      {loading ? (
        <p className="text-center text-olive">Chargement...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-stone">Aucun produit pour le moment.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <ProductGrid products={products} />
        </motion.div>
      )}
    </section>
  );
};

export default ProductSection;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FaienceGallery from "../components/FaienceGallery";
import FaienceUnits from "../components/FaienceUnits";
import FaienceSpecs from "../components/FaienceSpecs";
import BathroomSpecs from "../components/BathroomSpecs";
import {
  fetchFaienceDetail, fetchBathroomDetail
} from "../services/productDetailService";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { usePageMeta } from "../lib/usePageMeta";
import TileCalculator from "../components/TileCalculator";

const ProductDetail = () => {
  const { id, type } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  usePageMeta({
    title: product
      ? `${product.nom} | Abbaci Ceramic`
      : "Produit | Abbaci Ceramic",
    description: product
      ? `${product.nom} — ${product.format ? "Format " + product.format + ", " : ""}${product.disponibilite || ""}. Disponible chez Abbaci Ceramic, Hadjout.`
      : "Détail du produit chez Abbaci Ceramic.",
  });

  useEffect(() => {
    setProduct(null);
    setAdded(false);
    if (type === "faience") {
      fetchFaienceDetail(id).then(setProduct);
    } else if (type === "bathroom") {
      fetchBathroomDetail(id).then(setProduct);
    }
  }, [id, type]);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (!product) return <p className="p-10">Chargement...</p>;

  return (
    <>
      <Navbar />

      <div className="pb-10 pt-[190px] px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galerie commune */}
        <FaienceGallery images={product.grandImages} />

        <div>
          {/* Images unité */}
          <FaienceUnits
            units={product.unitImages}
            nom={product.nom}
          />

          {/* Specs selon le type */}
          {product.type === "faience" && (
            <FaienceSpecs product={product} />
          )}

          {product.type === "bathroom" && (
            <BathroomSpecs product={product} />
          )}

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            className={`mt-8 w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
              added
                ? "bg-green-600 text-white"
                : "bg-olive text-white hover:bg-clay"
            }`}
          >
            {added ? (
              <>
                <FaCheck /> Ajouté au panier
              </>
            ) : (
              <>
                <FaShoppingCart /> Ajouter au panier
              </>
            )}
          </button>

          {/* Tile calculator */}
          {product.type === "faience" && (
            <div className="mt-14">
              <TileCalculator defaultFormat={product.format} />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;

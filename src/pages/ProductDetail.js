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

const ProductDetail = () => {
  const { id, type } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (type === "faience") {
      fetchFaienceDetail(id).then(setProduct);
    } else if (type === "bathroom") {
      fetchBathroomDetail(id).then(setProduct);
    }
  }, [id, type]);

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
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;

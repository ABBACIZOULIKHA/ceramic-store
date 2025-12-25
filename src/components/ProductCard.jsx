import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const nom = product?.nom || "Produit";
  const disponibilite = product?.disponibilite || "Inconnu";

  const navigate = useNavigate();

  // Use the normalized 'image' field from fetchProducts
  const image = product?.image || "/placeholder.jpg";
console.log("product type",product.type);

  return (
    <div
     onClick={() =>
        navigate(`/produits/${product.type}/${product.id}`)
      }
    
    className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={image}
        alt={nom}
        className="w-full h-56 object-cover"
      />

      <div className="p-4">
        <h3 className="text-olive font-semibold text-lg">{nom}</h3>
        <p
          className={`text-sm mt-2 ${
            disponibilite.toLowerCase() === "disponible"
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {disponibilite}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

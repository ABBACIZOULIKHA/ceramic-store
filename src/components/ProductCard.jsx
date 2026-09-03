import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice, discountPercent } from "../lib/price";
import ProducerBadge from "./ProducerBadge";

const ProductCard = ({ product }) => {
  const nom = product?.nom || "Produit";
  const disponibilite = product?.disponibilite || "Inconnu";

  const navigate = useNavigate();

  // Use the normalized 'image' field from fetchProducts
  const image = product?.image || "/placeholder.jpg";

  const isNew = product?.est_nouveau;
  const promo = product?.prix_promo && product?.prix;

  const discount = discountPercent(product?.prix, product?.prix_promo);

  return (
    <div
     onClick={() =>
        navigate(`/produits/${product.type}/${product.id}`)
      }
    
    className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative">
      <div className="relative">
        <img
          src={image}
          alt={nom}
          className="w-full h-56 object-cover"
        />

        {isNew && (
          <span className="absolute top-3 left-3 bg-olive text-white text-xs font-bold px-3 py-1 rounded-full">
            Nouveau
          </span>
        )}

        {discount && (
          <span className="absolute top-3 right-3 bg-clay text-white text-xs font-bold px-3 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-olive font-semibold text-lg">{nom}</h3>

        <div className="mt-2 flex items-center justify-between">
          <ProducerBadge producer={product?.producer} />
          <div className="flex items-baseline gap-2">
            {promo && product.prix_promo < product.prix ? (
              <>
                <span className="text-olive font-bold">{formatPrice(product.prix_promo)}</span>
                <span className="text-stone line-through text-sm">{formatPrice(product.prix)}</span>
              </>
            ) : product.prix ? (
              <span className="text-olive font-bold">{formatPrice(product.prix)}</span>
            ) : null}
          </div>
        </div>

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
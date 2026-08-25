import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";

const Panier = () => {
  const { items, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();

  return (
    <>
      <Navbar />

      <div className="pt-[210px] pb-16 px-6 md:px-16 max-w-4xl mx-auto min-h-screen">
        <h1 className="text-3xl font-bold text-olive mb-8">
          Mon panier {totalItems > 0 && `(${totalItems})`}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone text-lg mb-6">Votre panier est vide</p>
            <Link
              to="/produits"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-olive text-white hover:bg-clay transition"
            >
              <FaArrowLeft /> Découvrir nos produits
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-stone/20 shadow-sm"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-ivory flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.nom}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone text-xs">
                        Pas d'image
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/produits/${item.type}/${item.id}`}
                      className="font-semibold text-olive hover:text-clay transition truncate block"
                    >
                      {item.nom}
                    </Link>
                    <p className="text-xs text-stone mt-1 capitalize">
                      {item.type === "faience" ? "Faïence" : "Sanitaire"}
                    </p>
                    {item.prix != null && (
                      <p className="text-sm font-bold text-clay mt-1">
                        {item.prix.toLocaleString("fr-DZ")} DA
                      </p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.key, item.qty - 1)}
                      className="w-8 h-8 rounded-full border border-stone/30 flex items-center justify-center text-olive hover:bg-ivory transition"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="w-8 text-center font-bold text-olive">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.key, item.qty + 1)}
                      className="w-8 h-8 rounded-full border border-stone/30 flex items-center justify-center text-olive hover:bg-ivory transition"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  {item.prix != null && (
                    <p className="text-sm font-bold text-olive w-28 text-right">
                      {(item.prix * item.qty).toLocaleString("fr-DZ")} DA
                    </p>
                  )}

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.key)}
                    className="text-red-400 hover:text-red-600 transition ml-2"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-8 p-6 bg-ivory rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-stone font-medium">Total</span>
                <span className="text-2xl font-bold text-olive">
                  {totalPrice > 0
                    ? `${totalPrice.toLocaleString("fr-DZ")} DA`
                    : "—"}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="px-6 py-3 rounded-lg border border-stone/30 text-stone hover:bg-white transition"
                >
                  Vider le panier
                </button>
                <Link
                  to="/contact"
                  className="flex-1 py-3 rounded-lg bg-clay text-white font-medium text-center hover:bg-olive transition"
                >
                  Demander un devis
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Panier;

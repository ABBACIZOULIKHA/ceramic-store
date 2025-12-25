import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productsService";

const Produits = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const data = await fetchProducts();
//         setProducts(data);
//       } catch (error) {
//         console.error("Erreur chargement produits:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);


  const [filters, setFilters] = useState({});

useEffect(() => {
  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchProducts(filters);
    setProducts(data);
    setLoading(false);
  };
  loadProducts();
}, [filters]);

  return (
    <div>
      <Navbar />

      <div className="pt-[110px] bg-ivory min-h-screen font-Poppins px-6 md:px-16 py-16">
        <div className="max-w-7xl mx-auto pt-16">

          <h1 className="text-3xl md:text-4xl font-semibold text-olive mb-12">
            Nos Produits
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            <div className="lg:col-span-1">
             <FilterSidebar onApply={setFilters} />
            </div>

            <div className="lg:col-span-3">
              {loading ? (
                <p className="text-olive">Chargement...</p>
              ) : (
                <ProductGrid products={products} />
              )}

              <Pagination />
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Produits;
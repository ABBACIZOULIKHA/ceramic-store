import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import { useEffect, useState, useCallback } from "react";
import { fetchProducts } from "../services/productsService";
import { FaSearch } from "react-icons/fa";

const Produits = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [searchInput, setSearchInput] = useState(filters.search || "");

  const applySearch = useCallback(
    (value) => {
      setFilters((prev) => ({ ...prev, search: value }));
    },
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => applySearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput, applySearch]);

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

          {/* Search bar */}
          <div className="mb-8 relative max-w-xl">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-xl border border-gray-200 pl-11 pr-4 py-3 text-sm
                         placeholder-gray-400 bg-white
                         focus:outline-none focus:ring-2 focus:ring-olive/40 focus:border-olive
                         transition shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-1">
              <FilterSidebar filters={filters} onApply={setFilters} />
            </div>

            <div className="lg:col-span-3">
              {loading ? (
                <p className="text-olive">Chargement...</p>
              ) : (
                <ProductGrid products={products} />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Produits;

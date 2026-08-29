import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, fetchFilterOptions } from "../services/productsService";
import { FaSearch, FaLayerGroup, FaShower } from "react-icons/fa";
import { usePageMeta } from "../lib/usePageMeta";
import TileCalculator from "../components/TileCalculator";

const Produits = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [selectedTab, setSelectedTab] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);
  const [searchParams] = useSearchParams();
  const requestedCategory = searchParams.get("cat");

  usePageMeta({
    title: "Nos Produits | Abbaci Ceramic",
    description:
      "Découvrez nos faïences, carreaux de sol et sanitaires. Filtrez par catégorie, format, aspect et finition.",
  });

  useEffect(() => {
    fetchFilterOptions().then(setFilterOptions);
  }, []);

  useEffect(() => {
    if (!requestedCategory) return;
    setSearchInput("");
    if (requestedCategory === "Sanitaires") {
      setSelectedTab("bathroom");
      setFilters({});
    } else {
      setSelectedTab("faience");
      setFilters({ categories: [requestedCategory] });
    }
  }, [requestedCategory]);

  const applySearch = useCallback((value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => applySearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput, applySearch]);

  useEffect(() => {
    if (!selectedTab) return;
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts(filters);
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, [filters, selectedTab]);

  const displayedProducts =
    selectedTab === "faience"
      ? products.filter((p) => p.type === "faience")
      : selectedTab === "bathroom"
      ? products.filter((p) => p.type === "bathroom")
      : [];

  const selectTab = (tab) => {
    setSelectedTab(tab);
    setFilters({});
    setSearchInput("");
  };

  return (
    <div>
      <Navbar />

      <div className="pt-[110px] bg-ivory min-h-screen font-Poppins px-6 md:px-16 py-16">
        <div className="max-w-7xl mx-auto pt-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-olive mb-12">
            Nos Produits
          </h1>

          {/* Category boxes */}
          {!selectedTab && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <button
                onClick={() => selectTab("faience")}
                className="group relative overflow-hidden rounded-2xl p-8 text-left bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-olive/30 transition-all duration-300"
              >
                <FaLayerGroup size={40} className="mb-4 text-olive group-hover:text-clay transition-colors" />
                <h2 className="text-xl font-bold mb-2">Faïences et Carrelage</h2>
                <p className="text-sm text-stone">
                  Découvrez notre gamme de carreaux et faïences murales
                </p>
              </button>

              <button
                onClick={() => selectTab("bathroom")}
                className="group relative overflow-hidden rounded-2xl p-8 text-left bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-olive/30 transition-all duration-300"
              >
                <FaShower size={40} className="mb-4 text-olive group-hover:text-clay transition-colors" />
                <h2 className="text-xl font-bold mb-2">Sanitaires</h2>
                <p className="text-sm text-stone">
                  Lavabos, WC, douches et accessoires de salle de bain
                </p>
              </button>
            </div>
          )}

          {/* Back button + active tab header */}
          {selectedTab && (
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setSelectedTab(null)}
                className="text-sm text-stone hover:text-olive transition underline"
              >
                Retour
              </button>
              <span className="text-sm font-semibold text-clay uppercase tracking-wide">
                {selectedTab === "faience" ? "Faïences et Carrelage" : "Sanitaires"}
              </span>
            </div>
          )}

          {/* Search + Filters for faience */}
          {selectedTab === "faience" && (
            <div className="mb-6 relative max-w-xl">
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
          )}

          {/* Product list */}
          {selectedTab && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
              {selectedTab === "faience" && (
                <div className="lg:col-span-1">
                  <FilterSidebar
                    key={(filters.categories || []).join(",")}
                    filters={filters}
                    onApply={setFilters}
                    options={filterOptions}
                  />
                </div>
              )}

              <div className={selectedTab === "bathroom" ? "lg:col-span-4" : "lg:col-span-3"}>
                {loading ? (
                  <p className="text-olive">Chargement...</p>
                ) : (
                  <ProductGrid products={displayedProducts} />
                )}
              </div>
            </div>
          )}

          {/* Tile calculator */}
          {selectedTab === "faience" && (
            <div className="mt-16">
              <TileCalculator />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Produits;

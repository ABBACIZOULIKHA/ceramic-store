import React, { useState } from "react";

const FilterSidebar = ({ onApply }) => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [utilisations, setUtilisations] = useState([]);
  const [format, setFormat] = useState("");
  const [aspect, setAspect] = useState("");
  const [finitions, setFinitions] = useState([]);
  const [epaisseur, setEpaisseur] = useState("");

  // helpers
  const toggleArrayValue = (value, array, setArray) => {
    setArray(
      array.includes(value)
        ? array.filter((v) => v !== value)
        : [...array, value]
    );
  };

  const applyFilters = () => {
    onApply({
      search,
      categories,
      utilisations,
      format,
      aspect,
      finitions,
      epaisseur,
    });
  };

  const resetFilters = () => {
    setSearch("");
    setCategories([]);
    setUtilisations([]);
    setFormat("");
    setAspect("");
    setFinitions([]);
    setEpaisseur("");
    // Optionally, apply empty filters immediately
    onApply({
      search: "",
      categories: [],
      utilisations: [],
      format: "",
      aspect: "",
      finitions: [],
      epaisseur: "",
    });
  };

  return (
    <aside className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800">
          Filtres
        </h2>
        <button
          className="text-xs text-gray-500 hover:text-red-500 transition"
          onClick={resetFilters}
        >
          Réinitialiser
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Recherche..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm
                   placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-olive/40 focus:border-olive
                   transition"
      />

      {/* Categories */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Catégories de produits
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          {["Carreaux de Sol", "Faïences Murales", "Sanitaires"].map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer hover:text-olive transition"
            >
              <input
                type="checkbox"
                checked={categories.includes(item)}
                onChange={() =>
                  toggleArrayValue(item, categories, setCategories)
                }
                className="h-4 w-4 rounded border-gray-300 text-olive focus:ring-olive"
              />
              {item}
            </label>
          ))}
        </div>
      </section>

      {/* Utilisation */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Utilisation
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          {["Extérieur", "Intérieur", "Cuisine", "Salle de bain"].map(
            (item) => (
              <label
                key={item}
                className="flex items-center gap-3 cursor-pointer hover:text-olive transition"
              >
                <input
                  type="checkbox"
                  checked={utilisations.includes(item)}
                  onChange={() =>
                    toggleArrayValue(item, utilisations, setUtilisations)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-olive focus:ring-olive"
                />
                {item}
              </label>
            )
          )}
        </div>
      </section>

      {/* Format */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Format
        </h3>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-olive/40 focus:border-olive
                     transition"
        >
          <option value="">Tous formats</option>
          <option value="30 × 30">30 × 30</option>
          <option value="60 × 60">60 × 60</option>
          <option value="120 × 60">120 × 60</option>
        </select>
      </section>

      {/* Aspect */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Aspect
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          {["Béton", "Bois", "Ciment", "Marbré", "Mauresque", "Pierre", "Uni"].map(
            (item) => (
              <label
                key={item}
                className="flex items-center gap-3 cursor-pointer hover:text-olive transition"
              >
                <input
                  type="radio"
                  name="aspect"
                  value={item}
                  checked={aspect === item}
                  onChange={() => setAspect(item)}
                  className="h-4 w-4 border-gray-300 text-olive focus:ring-olive"
                />
                {item}
              </label>
            )
          )}
        </div>
      </section>

      {/* Finition */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Finition
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Brillant", "Lisse", "Matte", "Relief"].map((item) => (
            <label key={item} className="cursor-pointer">
              <input
                type="checkbox"
                checked={finitions.includes(item)}
                onChange={() => toggleArrayValue(item, finitions, setFinitions)}
                className="peer hidden"
              />
              <div
                className="rounded-full border border-gray-200 px-4 py-1.5 text-xs
                           text-gray-700
                           peer-checked:border-olive peer-checked:bg-olive/10 peer-checked:text-olive
                           hover:border-olive transition"
              >
                {item}
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Épaisseur */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Épaisseur
        </h3>
        <div className="flex gap-2">
          {["9mm", "12mm"].map((item) => (
            <button
              key={item}
              onClick={() => setEpaisseur(item)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs
                         text-gray-700
                         hover:border-olive hover:bg-olive/10 hover:text-olive
                         transition"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Apply Button */}
      <button
        className="w-full rounded-xl bg-olive text-white py-3 text-sm font-medium
                   hover:bg-olive/90 transition"
        onClick={applyFilters}
      >
        Appliquer les filtres
      </button>
    </aside>
  );
};

export default FilterSidebar;

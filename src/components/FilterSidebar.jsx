import React, { useState } from "react";

const FilterSidebar = ({ filters, onApply, options }) => {
  const [categories, setCategories] = useState(filters.categories || []);
  const [utilisations, setUtilisations] = useState(filters.utilisations || []);
  const [format, setFormat] = useState(filters.format || "");
  const [aspect, setAspect] = useState(filters.aspect || "");
  const [finitions, setFinitions] = useState(filters.finitions || []);
  const [nouveau, setNouveau] = useState(!!filters.nouveau);
  const [promo, setPromo] = useState(!!filters.promo);

  const emit = (overrides) => {
    onApply({ ...filters, ...overrides });
  };

  const toggleArray = (value, array, setArray, key) => {
    const next = array.includes(value)
      ? array.filter((v) => v !== value)
      : [...array, value];
    setArray(next);
    emit({ [key]: next });
  };

  const toggleFlag = (current, setFlag, key) => {
    const next = !current;
    setFlag(next);
    emit({ [key]: next });
  };

  const resetFilters = () => {
    setCategories([]);
    setUtilisations([]);
    setFormat("");
    setAspect("");
    setFinitions([]);
    setNouveau(false);
    setPromo(false);
    onApply({ search: filters.search });
  };

  const {
    categories: catOptions = [],
    utilisations: utilOptions = [],
    formats = [],
    aspects = [],
    finitions: finOptions = [],
  } = options || {};

  return (
    <aside className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800">Filtres</h2>
        <button
          className="text-xs text-gray-500 hover:text-red-500 transition"
          onClick={resetFilters}
        >
          Réinitialiser
        </button>
      </div>

      {/* Categories */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Catégories
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          {catOptions.map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer hover:text-olive transition"
            >
              <input
                type="checkbox"
                checked={categories.includes(item)}
                onChange={() =>
                  toggleArray(item, categories, setCategories, "categories")
                }
                className="h-4 w-4 rounded border-gray-300 text-olive focus:ring-olive"
              />
              {item}
            </label>
          ))}
        </div>
      </section>

      {/* Nouveau / Promo */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Nouveautés &amp; Promotions
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <label className="flex items-center gap-3 cursor-pointer hover:text-olive transition">
            <input
              type="checkbox"
              checked={nouveau}
              onChange={() => toggleFlag(nouveau, setNouveau, "nouveau")}
              className="h-4 w-4 rounded border-gray-300 text-olive focus:ring-olive"
            />
            Nouveautés
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-olive transition">
            <input
              type="checkbox"
              checked={promo}
              onChange={() => toggleFlag(promo, setPromo, "promo")}
              className="h-4 w-4 rounded border-gray-300 text-olive focus:ring-olive"
            />
            En promotion
          </label>
        </div>
      </section>

      {/* Utilisation */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Utilisation
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          {utilOptions.map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer hover:text-olive transition"
            >
              <input
                type="checkbox"
                checked={utilisations.includes(item)}
                onChange={() =>
                  toggleArray(item, utilisations, setUtilisations, "utilisations")
                }
                className="h-4 w-4 rounded border-gray-300 text-olive focus:ring-olive"
              />
              {item}
            </label>
          ))}
        </div>
      </section>

      {/* Format */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Format
        </h3>
        <select
          value={format}
          onChange={(e) => {
            setFormat(e.target.value);
            emit({ format: e.target.value });
          }}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-olive/40 focus:border-olive
                     transition"
        >
          <option value="">Tous formats</option>
          {formats.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </section>

      {/* Aspect */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Aspect
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          {aspects.map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer hover:text-olive transition"
            >
              <input
                type="radio"
                name="aspect"
                value={item}
                checked={aspect === item}
                onChange={() => {
                  const next = aspect === item ? "" : item;
                  setAspect(next);
                  emit({ aspect: next });
                }}
                className="h-4 w-4 border-gray-300 text-olive focus:ring-olive"
              />
              {item}
            </label>
          ))}
        </div>
      </section>

      {/* Finition */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Finition
        </h3>
        <div className="flex flex-wrap gap-2">
          {finOptions.map((item) => (
            <label key={item} className="cursor-pointer">
              <input
                type="checkbox"
                checked={finitions.includes(item)}
                onChange={() =>
                  toggleArray(item, finitions, setFinitions, "finitions")
                }
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

    </aside>
  );
};

export default FilterSidebar;

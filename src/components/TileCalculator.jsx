import { useEffect, useMemo, useState } from "react";
import { FaRulerCombined, FaCalculator, FaBoxes } from "react-icons/fa";

const FORMATS = [
  { label: "20 × 20", l: 20, h: 20 },
  { label: "30 × 30", l: 30, h: 30 },
  { label: "30 × 60", l: 30, h: 60 },
  { label: "45 × 45", l: 45, h: 45 },
  { label: "60 × 60", l: 60, h: 60 },
  { label: "60 × 120", l: 60, h: 120 },
  { label: "75 × 150", l: 75, h: 150 },
];

const normalizeFormat = (value) => {
  const m = String(value || "").match(/(\d+)\D+(\d+)/);
  return m
    ? {
        label: `${m[1]} × ${m[2]}`,
        l: parseInt(m[1], 10),
        h: parseInt(m[2], 10),
      }
    : null;
};

const TileCalculator = ({ defaultFormat }) => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [format, setFormat] = useState(
    normalizeFormat(defaultFormat)?.label || "60 × 60"
  );
  const [margin, setMargin] = useState(10);
  const [tilesPerBox, setTilesPerBox] = useState("");
  const [pricePerBox, setPricePerBox] = useState("");

  const formats = useMemo(() => {
    const custom = normalizeFormat(defaultFormat);
    if (!custom) return FORMATS;
    if (
      FORMATS.some((f) => f.l === custom.l && f.h === custom.h)
    ) {
      return FORMATS;
    }
    return [...FORMATS, custom];
  }, [defaultFormat]);

  useEffect(() => {
    const custom = normalizeFormat(defaultFormat);
    if (custom) setFormat(custom.label);
  }, [defaultFormat]);

  const result = useMemo(() => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    if (!L || !W || L <= 0 || W <= 0) return null;

    const parsed = normalizeFormat(format);
    const tl = parsed?.l;
    const th = parsed?.h;
    if (!tl || !th) return null;

    const surface = L * W;
    const tileArea = (tl * th) / 10000;
    const surfaceWithMargin = surface * (1 + margin / 100);
    const tiles = Math.ceil(surfaceWithMargin / tileArea);

    let boxes = null;
    let totalPrice = null;
    if (tilesPerBox && parseFloat(tilesPerBox) > 0) {
      boxes = Math.ceil(tiles / parseFloat(tilesPerBox));
      if (pricePerBox && parseFloat(pricePerBox) > 0) {
        totalPrice = boxes * parseFloat(pricePerBox);
      }
    }

    return { surface, surfaceWithMargin, tileArea, tiles, boxes, totalPrice };
  }, [length, width, format, margin, tilesPerBox, pricePerBox]);

  const numberInput =
    "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-olive/40 focus:border-olive transition";

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
      <div className="flex items-center gap-4 mb-2">
        <div className="bg-olive text-white p-3 rounded-full">
          <FaRulerCombined size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-olive">
            Calculateur de carrelage
          </h2>
          <p className="text-sm text-stone">
            Estimez le nombre de carreaux nécessaires pour votre surface
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Dimensions */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
            Dimension de la surface
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-stone mb-1">
                Longueur (m)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Ex : 5"
                className={numberInput}
              />
            </div>
            <div>
              <label className="block text-sm text-stone mb-1">
                Largeur (m)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Ex : 4"
                className={numberInput}
              />
            </div>
          </div>
        </div>

        {/* Carreau */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
            Le carreau
          </h3>
          <div>
            <label className="block text-sm text-stone mb-1">
              Format (cm)
            </label>
            {defaultFormat ? (
              <div
                className={`${numberInput} flex items-center justify-between cursor-default`}
              >
                <span>{format}</span>
                <span className="text-xs text-stone">du produit</span>
              </div>
            ) : (
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className={numberInput}
              >
                {formats.map((f) => (
                  <option key={f.label} value={f.label}>
                    {f.label}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label className="block text-sm text-stone mb-1">
              Marge de coupe (%)
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
              className={numberInput}
            />
            <p className="text-xs text-stone mt-1">
              Recommandé : 10 %
            </p>
          </div>
        </div>

        {/* Boîtes */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
            Emballage (optionnel)
          </h3>
          <div>
            <label className="block text-sm text-stone mb-1">
              Carreaux par boîte
            </label>
            <input
              type="number"
              min="0"
              value={tilesPerBox}
              onChange={(e) => setTilesPerBox(e.target.value)}
              placeholder="Ex : 4"
              className={numberInput}
            />
          </div>
          <div>
            <label className="block text-sm text-stone mb-1">
              Prix par boîte (DA)
            </label>
            <input
              type="number"
              min="0"
              value={pricePerBox}
              onChange={(e) => setPricePerBox(e.target.value)}
              placeholder="Ex : 2500"
              className={numberInput}
            />
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="mt-8 bg-ivory rounded-xl p-6">
        {!result ? (
          <p className="text-stone text-sm flex items-center gap-2">
            <FaCalculator className="text-clay" />
            Entrez la longueur et la largeur de la pièce pour obtenir une
            estimation.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-stone">
                Surface
              </p>
              <p className="text-2xl font-bold text-olive">
                {result.surface.toFixed(2)} m²
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-stone">
                Surface + {margin}%
              </p>
              <p className="text-2xl font-bold text-olive">
                {result.surfaceWithMargin.toFixed(2)} m²
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-stone">
                Carreaux
              </p>
              <p className="text-2xl font-bold text-clay">
                {result.tiles}
              </p>
            </div>
            {result.boxes ? (
              <div>
                <p className="text-xs uppercase tracking-wide text-stone flex items-center justify-center gap-1">
                  <FaBoxes /> Boîtes
                </p>
                <p className="text-2xl font-bold text-olive">
                  {result.boxes}
                </p>
                {result.totalPrice != null && (
                  <p className="text-sm font-semibold text-clay">
                    {result.totalPrice.toLocaleString("fr-DZ")} DA
                  </p>
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default TileCalculator;
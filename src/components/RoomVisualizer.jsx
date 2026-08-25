import { useRef, useState } from "react";
import { FiUpload, FiDownload, FiX } from "react-icons/fi";
import {
  prepareRoomImage,
  generateRoomPreview,
} from "../services/roomVisualizerService";

const RoomVisualizer = ({ productImage, nom }) => {
  const [roomPreview, setRoomPreview] = useState(null);
  const [roomFile, setRoomFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setResult(null);
    setRoomFile(file);
    setRoomPreview(URL.createObjectURL(file));
  };

  const reset = () => {
    setRoomPreview(null);
    setRoomFile(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleGenerate = async () => {
    if (!roomFile || loading) return;
    setLoading(true);
    setError(null);
    try {
      const roomImage = await prepareRoomImage(roomFile);
      const image = await generateRoomPreview(productImage, roomImage);
      setResult(image);
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-16 border-t pt-12">
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Upload */}
        <div>
          <div
            onClick={() => inputRef.current?.click()}
            className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-colors ${
              roomPreview
                ? "border-transparent"
                : "border-stone hover:border-olive"
            }`}
          >
            {roomPreview ? (
              <>
                <img
                  src={roomPreview}
                  alt="Votre pièce"
                  className="w-full h-[300px] object-cover rounded-xl"
                />
                <button
                  type="button"
                  aria-label="Supprimer la photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    reset();
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow hover:bg-white"
                >
                  <FiX />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center px-6">
                <FiUpload size={32} className="text-sage" />
                <p className="mt-4 font-medium text-olive">
                  Choisissez une photo de votre pièce
                </p>
                <p className="mt-1 text-sm text-stone">
                  JPG ou PNG — une vue d'ensemble donne les meilleurs résultats
                </p>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />

          <button
            type="button"
            onClick={handleGenerate}
            disabled={!roomFile || loading}
            className="mt-6 w-full py-3 rounded-lg bg-olive text-white font-medium hover:bg-clay transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Génération en cours..." : "Générer l'aperçu"}
          </button>

          {error && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* Résultat */}
        <div>
          {result ? (
            <div>
              <img
                src={result}
                alt="Aperçu généré"
                className="w-full h-[420px] object-cover rounded-xl border animate-fadeIn"
              />
              <a
                href={result}
                download={`apercu-${nom || "produit"}.png`}
                className="mt-4 inline-flex items-center gap-2 text-olive font-medium hover:text-clay"
              >
                <FiDownload /> Télécharger l'image
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[420px] rounded-xl border bg-ivory/40 text-center px-6">
              <p className="font-medium text-olive">Votre aperçu apparaîtra ici</p>
              <p className="mt-1 text-sm text-stone max-w-xs">
                La génération prend quelques secondes grâce à l'IA Gemini de
                Google.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoomVisualizer;

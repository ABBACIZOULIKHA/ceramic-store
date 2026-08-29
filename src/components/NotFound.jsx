import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/usePageMeta";

const NotFound = () => {
  usePageMeta({
    title: "Page introuvable | Abbaci Ceramic",
    description: "La page que vous cherchez n'existe pas. Découvrez nos faïences, carrelages et sanitaires.",
  });

  return (
    <div className="font-Poppins bg-ivory min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl md:text-9xl font-bold text-olive/20 select-none">404</p>
      <h1 className="text-3xl md:text-4xl font-semibold text-olive mt-2 mb-4">
        Oups, page introuvable
      </h1>
      <p className="text-stone max-w-md mb-8">
        La page que vous cherchez n'existe pas ou a été déplacée.
        Retournez à l'accueil pour découvrir nos produits.
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-olive text-white px-6 py-3 rounded-lg font-medium hover:bg-clay transition"
        >
          Retour à l'accueil
        </Link>
        <Link
          to="/produits"
          className="bg-clay text-white px-6 py-3 rounded-lg font-medium hover:bg-olive transition"
        >
          Voir nos produits
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
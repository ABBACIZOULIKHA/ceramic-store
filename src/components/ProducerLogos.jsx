import { useEffect, useState } from "react";
import { fetchProducers } from "../services/productsService";

const ProducerLogos = () => {
  const [producers, setProducers] = useState([]);

  useEffect(() => {
    let active = true;
    fetchProducers().then((data) => {
      if (active) setProducers(data);
    });
    return () => {
      active = false;
    };
  }, []);

  if (producers.length === 0) return null;

  // Duplique la liste pour créer un défilement continu sans à-coup
  const items = [...producers, ...producers];

  return (
    <section className="py-14 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-olive">
          Nos Producteurs
        </h2>
        <p className="text-olive/70 mt-2 text-base">
          Les marques que nous distribuons
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-16">
          {items.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="flex items-center gap-3 shrink-0"
              title={p.name}
            >
              {p.logo_img ? (
                <img
                  src={p.logo_img}
                  alt={p.name}
                  className="h-24 w-24 md:h-28 md:w-28 object-contain"
                />
              ) : (
                <span className="text-olive font-bold text-xl">{p.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProducerLogos;
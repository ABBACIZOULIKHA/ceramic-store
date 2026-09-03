import ProducerBadge from "./ProducerBadge";

const Row = ({ label, value }) => (
  <div className="flex justify-between py-3 border-b border-stone transition-colors duration-200 hover:bg-ivory/30 rounded-md">
    <span className="text-stone font-medium">{label}</span>
    <span className="text-olive font-semibold">{value}</span>
  </div>
);

const FaienceSpecs = ({ product }) => {
  const isPromo = product.prix_promo && product.prix && product.prix_promo < product.prix;
  return (
    <div className="mt-12">
      <h2 className="text-sm font-bold uppercase mb-6 text-clay">
        Informations complémentaires
      </h2>

      <div className="space-y-1">
        <Row label="Épaisseur" value={product.epaisseur} />
        <Row label="Finition" value={product.finitions.join(", ")} />
        {product.producer ? (
          <div className="flex justify-between py-3 border-b border-stone rounded-md items-center">
            <span className="text-stone font-medium">Producteur</span>
            <ProducerBadge producer={product.producer} />
          </div>
        ) : product.marque ? (
          <Row label="Marque" value={product.marque} />
        ) : null}
        <Row label="Utilisation" value={product.utilisations.join(", ")} />
        <Row label="Format" value={product.format} />
        <Row label="Aspect" value={product.aspect} />
        <Row label="Disponibilité" value={product.disponibilite} />
        {product.prix ? (
          <Row
            label="Prix"
            value={
              isPromo ? (
                <span className="flex items-center gap-2 justify-end">
                  <span className="text-stone line-through">{product.prix} DA</span>
                  <span className="text-clay font-bold">{product.prix_promo} DA</span>
                </span>
              ) : (
                `${product.prix} DA`
              )
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export default FaienceSpecs;

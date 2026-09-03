import ProducerBadge from "./ProducerBadge";

const Row = ({ label, value }) => (
  <div className="flex justify-between py-3 border-b border-stone transition-colors duration-200 hover:bg-ivory/30 rounded-md text-sm">
    <span className="text-stone font-medium">{label}</span>
    <span className="text-olive font-semibold">{value}</span>
  </div>
);

const BathroomSpecs = ({ product }) => {
  const isPromo = product.prix_promo && product.prix && product.prix_promo < product.prix;
  return (
    <div className="mt-12">
      <h2 className="text-sm font-bold uppercase mb-6 text-clay">
        Informations complémentaires
      </h2>

      <div className="space-y-1">
        {product.producer ? (
          <div className="flex justify-between py-3 border-b border-stone rounded-md items-center">
            <span className="text-stone font-medium">Producteur</span>
            <ProducerBadge producer={product.producer} />
          </div>
        ) : null}
        <Row label="Dimensions" value={product.dimensions} />
        <Row label="Poids" value={product.poids} />
        <Row label="Absorption" value={product.absorption} />
        <Row label="Retrait" value={product.retrait} />
        <Row label="Disponibilité" value={product.disponibilite} />
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
      </div>
    </div>
  );
};

export default BathroomSpecs;

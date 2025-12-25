const Row = ({ label, value }) => (
  <div className="flex justify-between py-3 border-b border-stone transition-colors duration-200 hover:bg-ivory/30 rounded-md text-sm">
    <span className="text-stone font-medium">{label}</span>
    <span className="text-olive font-semibold">{value}</span>
  </div>
);

const BathroomSpecs = ({ product }) => {
  return (
    <div className="mt-12">
      <h2 className="text-sm font-bold uppercase mb-6 text-clay">
        Informations complémentaires
      </h2>

      <div className="space-y-1">
        <Row label="Dimensions" value={product.dimensions} />
        <Row label="Poids" value={product.poids} />
        <Row label="Absorption" value={product.absorption} />
        <Row label="Retrait" value={product.retrait} />
        <Row label="Disponibilité" value={product.disponibilite} />
        <Row label="Prix" value={`${product.prix} DA`} />
      </div>
    </div>
  );
};

export default BathroomSpecs;

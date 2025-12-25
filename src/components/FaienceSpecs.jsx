const Row = ({ label, value }) => (
  <div className="flex justify-between py-3 border-b border-stone transition-colors duration-200 hover:bg-ivory/30 rounded-md">
    <span className="text-stone font-medium">{label}</span>
    <span className="text-olive font-semibold">{value}</span>
  </div>
);

const FaienceSpecs = ({ product }) => {
  return (
    <div className="mt-12">
      <h2 className="text-sm font-bold uppercase mb-6 text-clay">
        Informations complémentaires
      </h2>

      <div className="space-y-1">
        <Row label="Épaisseur" value={product.epaisseur} />
        <Row label="Finition" value={product.finitions.join(", ")} />
        <Row label="Marque" value={product.marque} />
        <Row label="Utilisation" value={product.utilisations.join(", ")} />
        <Row label="Format" value={product.format} />
        <Row label="Aspect" value={product.aspect} />
        <Row label="Disponibilité" value={product.disponibilite} />
      </div>
    </div>
  );
};

export default FaienceSpecs;

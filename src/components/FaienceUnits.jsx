const FaienceUnits = ({ units, nom }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-olive">
        {nom}
      </h1>

      <div className="space-y-4">
        {units.map((u, i) => (
          <div key={i} className="flex gap-4 items-center">
            <img
              src={u.url}
              alt={u.description}
              className="w-24 h-16 object-cover rounded-lg border"
            />
            <p className="text-sm text-gray-700">
              {u.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaienceUnits;

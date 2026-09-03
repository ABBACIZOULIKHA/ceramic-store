const ProducerBadge = ({ producer }) => {
  if (!producer || !producer.name) return null;

  return (
    <div className="flex items-center gap-2">
      {producer.logo_img ? (
        <img
          src={producer.logo_img}
          alt={producer.name}
          className="w-6 h-6 rounded-full object-cover border border-stone/40"
        />
      ) : null}
      <span className="text-sm text-stone">{producer.name}</span>
    </div>
  );
};

export default ProducerBadge;
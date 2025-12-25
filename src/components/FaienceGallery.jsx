import { useState } from "react";

const FaienceGallery = ({ images }) => {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="space-y-4">
      <img
        src={active}
        className="w-full h-[420px] object-cover rounded-xl border"
      />

      <div className="flex gap-3">
        {images.map((img, i) => (
          <button key={i} onClick={() => setActive(img)}>
            <img
              src={img}
              className={`w-20 h-20 object-cover rounded-lg border
                ${active === img ? "ring-2 ring-olive" : ""}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FaienceGallery;

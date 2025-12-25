import React from "react";

const Pagination = () => {
  return (
    <div className="flex justify-center gap-2 mt-12">
      {[1, 2, 3, "...", 14, 15].map((page, index) => (
        <button
          key={index}
          className="px-3 py-1 border rounded-md text-sm hover:bg-olive hover:text-ivory transition"
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;


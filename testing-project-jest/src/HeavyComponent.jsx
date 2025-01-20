import React from "react";

const HeavyComponent = () => {
  const images = [
    {
      url: "https://firebasestorage.googleapis.com/v0/b/ecommerce-nextjs-b76c0.appspot.com/o/Image%2F1712658287794-cu2.png?alt=media&token=07152da8-857e-46f3-8340-b18f7b8b5e48",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/ecommerce-nextjs-b76c0.appspot.com/o/Image%2F1712658287796-cu5.png?alt=media&token=aa392fa3-1580-4f8f-8b23-f0f404e8663e",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/ecommerce-nextjs-b76c0.appspot.com/o/Image%2F1712658604629-i7.png?alt=media&token=849bea1e-f2f9-4f5a-9a19-f9edc38b5510",
    },
  ];

  return (
    <div>
      <h2>Image Gallery</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {images.map((src, index) => (
          <img
            src={src.url}
            alt={index + 1}
            style={{ width: 400, height: 400, objectFit: "contain" }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeavyComponent;

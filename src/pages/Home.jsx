import { useEffect, useState } from "react";
import { products } from "../data/products";
import FeatureCards from "../components/FeatureCards";
import ProductSlider from "../components/ProductSlider/ProductSlider";

export default function Home() {
  const getValidIdFromHash = () => {
    if (typeof window === "undefined") return "";
    const h = window.location.hash || "";
    const match = h.match(/^#slide-(.+)$/);
    const id = match ? match[1] : "";
    return id && products.some((p) => p.id === id) ? id : "";
  };

  const [showSlider, setShowSlider] = useState(Boolean(getValidIdFromHash()));

  useEffect(() => {
    const handler = () => setShowSlider(Boolean(getValidIdFromHash()));
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {!showSlider && <FeatureCards />}
      {showSlider && <ProductSlider />}
    </div>
  );
}

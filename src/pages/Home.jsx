import { useState } from "react";
import FeatureCards from "../components/FeatureCards";
import ProductSlider from "../components/ProductSlider/ProductSlider";

export default function Home() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <FeatureCards
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
      />
      {selectedProductId && <ProductSlider id={selectedProductId} />}
    </div>
  );
}

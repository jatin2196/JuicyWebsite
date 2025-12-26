import { useState } from "react";
import { products } from "../data/products";
import FeatureCard from "./FeatureCard/FeatureCard";
import styles from "./FeatureCard/FeatureCard.module.scss";

const FeatureCards = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section className={styles.featureCards}>
      {products.map((card) => (
        <FeatureCard
          key={card.id}
          {...card}
          selected={selectedId === card.id}
          onClick={() => setSelectedId(card.id)}
        />
      ))}
    </section>
  );
};

export default FeatureCards;

import { useState } from "react";
import { products } from "../data/products";
import FeatureCard from "./FeatureCard/FeatureCard";
import styles from "./FeatureCard/FeatureCard.module.scss";
import AnimatePresenceComponent from "../animation/AnimationPresenceComponent";

const FeatureCards = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <AnimatePresenceComponent>
      <section className={styles.featureCards}>
        {products.map((card) => (
          <FeatureCard
            key={card.id}
            {...card}
            selected={selectedId === card.id}
            makeSiblingFading={
              selectedId && selectedId !== card.id && isAnimating
            }
            onClick={() => setSelectedId(card.id)}
            setIsAnimating={setIsAnimating}
            isAnimating={isAnimating}
          />
        ))}
      </section>
    </AnimatePresenceComponent>
  );
};

export default FeatureCards;

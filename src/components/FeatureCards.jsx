import FeatureCard from "./FeatureCard/FeatureCard";
import styles from "./FeatureCard/FeatureCard.module.scss";
import cheekyLine from "../assets/cheeky-line.png";
import orangeCrush from "../assets/orange-crush.png";
import strawberryYum from "../assets/strawberry-yum.png";
import blackberryBlast from "../assets/blackberry-blast.png";
import { useState } from "react";

const products = [
  {
    id: "1",
    title: "Cheeky lime",
    description:
      "Discover a world of vibrant flavors with our premium juice selection.",
    numberColor: "#30A100",
    image: cheekyLine,
    backgroundColor: "#CFCF8D4D",
  },
  {
    id: "2",
    title: "Orange Crush",
    description:
      "Discover a world of vibrant flavors with our premium juice selection.",
    numberColor: "#FF960D",
    image: orangeCrush,
    backgroundColor: "#DEBE6E4A",
  },
  {
    id: "3",
    title: "Strawberry Yum",
    description:
      "Discover a world of vibrant flavors with our premium juice selection.",
    numberColor: "#CD2520",
    image: strawberryYum,
    backgroundColor: "#DC8D764A",
  },
  {
    id: "4",
    title: "Blackberry Blast",
    description:
      "Discover a world of vibrant flavors with our premium juice selection.",
    numberColor: "#60449B",
    image: blackberryBlast,
    backgroundColor: "#947FBE4D",
  },
];

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

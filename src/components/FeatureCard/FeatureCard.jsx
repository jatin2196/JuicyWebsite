import { useLayoutEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import styles from "./FeatureCard.module.scss";

const FeatureCard = ({
  id = "",
  numberColor = "",
  title = "",
  description = "",
  image = null,
  circleColor = "",
  backgroundColor = "",
  selected = null,
  onClick,
}) => {
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    const observer = new ResizeObserver(() => {
      const { width } = cardRef.current.getBoundingClientRect();

      if (width) setCardWidth(width);
    });

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={styles.featureCard}
      // style={selected ? { backgroundColor: backgroundColor } : {}}
      data-width={cardWidth}
      style={{
        "--card-width": `${cardWidth}px`,
        "--circle-color": circleColor,
        ...(selected ? { backgroundColor: backgroundColor } : {}),
      }}
    >
      <div className={styles.cardContent} onClick={onClick}>
        {selected ? (
          <CardImage
            src={image}
            alt={title}
            cardWidth={cardWidth}
            circleColor={circleColor}
          />
        ) : null}

        <h2 className={styles.cardNumber} style={{ color: numberColor }}>
          {id}
        </h2>

        <h3 className={styles.cardTitle}>{title}</h3>

        <p className={styles.cardDescription}>{description}</p>

        <Button text="View" />
      </div>
    </div>
  );
};

export default FeatureCard;

const CardImage = ({ src, alt, cardWidth, circleColor }) => {
  if (!src) return null;

  return (
    <div
      className={styles.cardImage}
      data-card-width={cardWidth}
      data-circle-color={circleColor}
    >
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
};

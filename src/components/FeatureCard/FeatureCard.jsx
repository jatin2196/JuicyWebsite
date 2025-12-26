import { useLayoutEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import styles from "./FeatureCard.module.scss";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({
  id = "",
  numberColor = "",
  title = "",
  description = "",
  image = null,
  cardCircleColor = "",
  backgroundColor = "",
  selected = null,
  onClick,
}) => {
  const navigate = useNavigate();
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

  const handleClick = () => {
    if (!selected) onClick?.();
    else navigate(`/product/${id}`);
  };

  return (
    <div
      ref={cardRef}
      className={styles.featureCard}
      // style={selected ? { backgroundColor: backgroundColor } : {}}
      data-width={cardWidth}
      style={{
        "--card-width": `${cardWidth}px`,
        "--circle-color": cardCircleColor,
        ...(selected ? { backgroundColor: backgroundColor } : {}),
      }}
    >
      <div className={styles.cardContent} onClick={handleClick}>
        {selected ? (
          <CardImage
            src={image}
            alt={title}
            cardWidth={cardWidth}
            cardCircleColor={cardCircleColor}
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

const CardImage = ({ src, alt, cardWidth, cardCircleColor }) => {
  if (!src) return null;

  return (
    <div
      className={styles.cardImage}
      data-card-width={cardWidth}
      data-circle-color={cardCircleColor}
    >
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
};

import Button from "../Button/Button";
import styles from "./FeatureCard.module.scss";

const FeatureCard = ({
  id = "",
  numberColor = "",
  title = "",
  description = "",
  image = null,
  backgroundColor = "",
  selected = null,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={styles.featureCard}
      style={selected ? { backgroundColor: backgroundColor } : {}}
    >
      <div className={styles.cardContent}>
        {selected ? (
          <CardImage src={image} alt={title} className={styles.cardImage} />
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

const CardImage = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} />;
};

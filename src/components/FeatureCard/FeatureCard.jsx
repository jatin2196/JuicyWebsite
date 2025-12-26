import cx from "classnames";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Button from "../Button/Button";
import styles from "./FeatureCard.module.scss";

const FeatureCard = ({
  id = "",
  numberColor = "",
  title = "",
  description = "",
  image = null,
  cardCircleColor = "",
  backgroundColor = "",
  selected = false,
  onClick,
  onCardClick,
}) => {
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setCardWidth((prev) => (prev !== width ? width : prev));
    });

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    selected ? onCardClick?.() : onClick?.();
  };

  return (
    <div
      ref={cardRef}
      className={styles.featureCard}
      style={{
        "--card-width": `${cardWidth}px`,
        "--circle-color": cardCircleColor,
        ...(selected ? { backgroundColor } : {}),
      }}
    >
      <motion.div
        className={styles.cardContent}
        onClick={handleClick}
        initial={false}
        animate={{ y: selected ? 32 : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0.5 }
            : {
                type: "spring",
                stiffness: 120,
                damping: 18,
                duration: 0.5,
              }
        }
      >
        <CardImage
          src={image}
          alt={title}
          selected={selected}
          prefersReducedMotion={prefersReducedMotion}
        />

        <motion.div
          initial={false}
          animate={{
            y: 0,
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0.5 }
              : {
                  type: "spring",
                  stiffness: 140,
                  damping: 22,
                  mass: 1,
                  duration: 0.5,
                }
          }
        >
          <h2 className={styles.cardNumber} style={{ color: numberColor }}>
            {id}
          </h2>

          <h3 className={styles.cardTitle}>{title}</h3>

          <p className={styles.cardDescription}>{description}</p>

          <Button text="View" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeatureCard;

const CardImage = ({ src, alt, selected, prefersReducedMotion }) => {
  if (!src) return null;

  return (
    <motion.div
      className={cx(styles.cardImage, selected ? styles.selected : "")}
      initial={false}
      animate={{
        y: selected ? 0 : 200,
        opacity: selected ? 1 : 0,
        zIndex: selected ? 1 : -1,
        scale: selected ? 1 : 0.5,
      }}
      transition={
        prefersReducedMotion
          ? { duration: 0.5 }
          : {
              type: "spring",
              stiffness: 140,
              damping: 22,
              mass: 1,
              duration: 0.5,
            }
      }
      style={{
        pointerEvents: selected ? "auto" : "none",
        display: selected ? "block" : "none",
      }}
    >
      <img src={src} alt={alt} loading="lazy" />
    </motion.div>
  );
};

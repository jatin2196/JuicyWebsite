import cx from "classnames";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  onClick = null,
  isAnimating = false,
  setIsAnimating = () => {},
  makeSiblingFading = false,
}) => {
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [animTargetX, setAnimTargetX] = useState(0);
  const [dynamicOpacity, setDynamicOpacity] = useState(1);
  const [overlayScale, setOverlayScale] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const animationCompletedRef = useRef(false);
  const redirectTimeoutRef = useRef(null);
  const animationProgressRef = useRef(0);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
        redirectTimeoutRef.current = null;
      }
      setCardWidth(0);
      setIsAnimating(false);
      setAnimTargetX(0);
      setDynamicOpacity(1);
      setOverlayScale(0);
      animationCompletedRef.current = false;
    };
  }, []);

  const computeCoverScale = () => {
    if (typeof window === "undefined") return 0;
    const viewportMax = Math.max(
      window.innerWidth || 0,
      window.innerHeight || 0
    );
    const base = 100;
    return Math.max(viewportMax / Math.max(base, 1), 1);
  };

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
    if (selected) {
      // Second click when selected: trigger animation and reveal slider
      animationCompletedRef.current = false;
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
        redirectTimeoutRef.current = null;
      }
      const rect = cardRef.current?.getBoundingClientRect();
      const viewportLeft = 0;
      const targetX = rect
        ? -(rect.left - viewportLeft)
        : -(window.innerWidth / 2 - cardWidth / 2);
      setAnimTargetX(targetX);
      setIsAnimating(true);
      // setTimeout(() => {
      //   window.location.hash = `#slide-${id}`;
      // }, 500);
    } else {
      onClick?.();
      setIsAnimating(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={cardRef}
        className={styles.featureCard}
        style={{
          "--card-width": `${cardWidth}px`,
          "--circle-color": cardCircleColor,
          "--dynamic-opacity": dynamicOpacity,
          ...(selected ? { backgroundColor } : {}),
        }}
        animate={{
          x: isAnimating && selected ? animTargetX : 0,
          ...(makeSiblingFading ? { opacity: 0, zIndex: -1 } : {}),
        }}
        transition={
          isAnimating && selected
            ? { duration: 1, ease: "easeIn" }
            : { duration: 0.4, ease: "easeOut" }
        }
        // Track progress and trigger hash when we reach animTargetX
        // As the card slides, compute progress toward animTargetX and reduce dynamicOpacity; scale overlay to cover viewport
        onUpdate={(latest) => {
          if (isAnimating && selected) {
            const currentX = typeof latest.x === "number" ? latest.x : 0;
            // Linear progress: 0 to 1 as we go from 0 to animTargetX
            const progress =
              animTargetX !== 0
                ? Math.min(Math.abs(currentX / animTargetX), 1)
                : 0;

            animationProgressRef.current = progress;

            const next = Math.max(1 - progress * 0.9, 0.15);
            if (next !== dynamicOpacity) setDynamicOpacity(next);

            const cover = computeCoverScale();
            // Scale smoothly from 0 to cover value as animation progresses
            const nextScale = progress * cover;
            if (Math.abs(nextScale - overlayScale) > 0.002)
              setOverlayScale(nextScale);
          } else {
            if (overlayScale !== 0) setOverlayScale(0);
          }
        }}
        onAnimationComplete={(latest) => {
          if (isAnimating && selected && !animationCompletedRef.current) {
            animationCompletedRef.current = true;
            redirectTimeoutRef.current = setTimeout(() => {
              window.location.hash = `#slide-${id}`;
            }, 400);
          }
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
            isAnimating={isAnimating}
            prefersReducedMotion={prefersReducedMotion}
            overlayScale={overlayScale}
            cardWidth={cardWidth}
            circleColor={cardCircleColor}
            slideX={animTargetX}
            dynamicOpacity={dynamicOpacity}
          />
          <motion.div
            initial={false}
            animate={{
              y: 0,
              opacity: isAnimating && selected ? dynamicOpacity : 1,
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
      </motion.div>
    </AnimatePresence>
  );
};

export default FeatureCard;

const CardImage = ({
  src,
  alt,
  selected,
  isAnimating,
  prefersReducedMotion,
  overlayScale,
  cardWidth,
  circleColor,
  slideX,
  dynamicOpacity,
}) => {
  if (!src) return null;

  const origin = slideX < 0 ? "20% 50%" : slideX > 0 ? "0% 50%" : "50% 50%";

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
      {/* New overlay circle element to scale independently and cover viewport */}
      <motion.div
        className={styles.coverCircle}
        initial={false}
        transition={
          prefersReducedMotion
            ? { duration: 1 }
            : { type: "tween", ease: "linear", duration: 1 }
        }
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: `${cardWidth || 220}px`,
          height: `${cardWidth || 220}px`,
          backgroundColor: circleColor,
          opacity: 1,
          borderRadius: "50%",
          transformOrigin: origin,
          zIndex: 1,
          pointerEvents: "none",
          transform: `translate(-50%, -50%) scale(${overlayScale})`,
        }}
      />
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={false}
        animate={{
          opacity: isAnimating && selected ? dynamicOpacity : 1,
        }}
      />
    </motion.div>
  );
};

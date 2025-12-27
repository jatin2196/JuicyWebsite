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
  const [overlayScale, setOverlayScale] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const animationCompletedRef = useRef(false);
  const redirectTimeoutRef = useRef(null);
  const animationProgressRef = useRef(0);
  const animStartRef = useRef(null);
  const wasAnimatingRef = useRef(false);

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
      setOverlayScale(1);
      animStartRef.current = null;
      wasAnimatingRef.current = false;
      animationCompletedRef.current = false;
    };
  }, []);

  // Redirect to ProductSlider when animation completes
  useEffect(() => {
    if (isAnimating && selected) {
      // Clear any existing timeout
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }

      const startTime = performance.now();
      const duration = 1400; // Total time until redirect

      // Animate overlay scale and opacity until redirect
      const animate = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Scale overlay to cover viewport
        const cover = computeCoverScale();
        const currentScale = 0.95 + (cover - 0.95) * Math.pow(progress, 2);
        setOverlayScale(currentScale);

        // Reduce opacity gradually
        const currentOpacity = Math.max(1 - progress * 0.9, 0.15);
        if (currentOpacity !== dynamicOpacity)
          setDynamicOpacity(currentOpacity);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);

      // Redirect after animation duration
      redirectTimeoutRef.current = setTimeout(() => {
        window.location.hash = `#slide-${id}`;
        animationCompletedRef.current = true;
      }, duration);
    }
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
        redirectTimeoutRef.current = null;
      }
    };
  }, [isAnimating, selected, id]);

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
            if (
              animStartRef.current === null &&
              typeof performance !== "undefined"
            ) {
              animStartRef.current = performance.now();
            }

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
            // First shrink a bit, then grow to cover
            const startScale = 1;
            const dipScale = startScale * 0.95; // 5% dip
            const dipPoint = 0.2; // 20% of the motion duration

            let targetScale = startScale;
            if (progress < dipPoint) {
              const t = progress / dipPoint;
              targetScale = startScale - (startScale - dipScale) * t;
            } else {
              const t = (progress - dipPoint) / (1 - dipPoint);
              const eased = Math.pow(Math.max(t, 0), 2.2); // smoother ease-in grow
              targetScale = dipScale + (cover - dipScale) * eased;
            }

            targetScale = Math.max(targetScale, 0.01);

            // On the first animated frame, jump to startScale so we can visibly dip before rising
            if (!wasAnimatingRef.current) {
              wasAnimatingRef.current = true;
              setOverlayScale(startScale);
            } else {
              setOverlayScale((prev) => prev + (targetScale - prev) * 0.12);
            }
          } else {
            if (overlayScale !== 1) setOverlayScale(1);
            animStartRef.current = null;
            wasAnimatingRef.current = false;
          }
        }}
        onAnimationComplete={(latest) => {
          if (isAnimating && selected && !animationCompletedRef.current) {
            animationCompletedRef.current = true;
            animStartRef.current = null;
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
          animate={{ y: 0 }}
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
              y: selected ? 0 : -32,
              opacity: isAnimating && selected ? dynamicOpacity : 1,
              ...(isAnimating && selected
                ? {
                    zIndex: 10,
                  }
                : {}),
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0.5 }
                : {
                    y: {
                      type: "spring",
                      stiffness: 140,
                      damping: 22,
                      mass: 1,
                      duration: 0.5,
                    },
                    opacity: { duration: 0.15, ease: "linear" },
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
        animate={
          isAnimating
            ? { scale: overlayScale }
            : selected
            ? { scale: [0.5, 1] }
            : { scale: 0.5 }
        }
        transition={
          isAnimating
            ? prefersReducedMotion
              ? { duration: 0.25 }
              : { type: "tween", ease: "linear", duration: 0.25 }
            : prefersReducedMotion
            ? { duration: 0.5 }
            : { duration: 0.5, ease: "easeOut" }
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
          translateX: "-50%",
          translateY: "-50%",
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

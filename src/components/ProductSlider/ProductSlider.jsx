import cx from "classnames";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../../data/products";
import styles from "./ProductSlider.module.scss";
import Header from "../Header/Header";
import JuicyImage from "../../assets/images/juicy.png";
import Button from "../Button/Button";
import { LeftArrowIcon } from "../../assets/icons/LeftArrowIcon";
import { RightArrowIcon } from "../../assets/icons/RightArrowIcon";

const MotionImg = motion.img;
const MotionDiv = motion.div;

export default function ProductSlider() {
  const getIdFromHash = () => {
    const hash = window.location.hash || "";
    if (hash.startsWith("#slide-")) {
      return hash.replace("#slide-", "");
    }
    return "";
  };

  const idFromHash = getIdFromHash();
  const initialIndex = products.findIndex((p) => p.id === idFromHash);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    const onHashChange = () => {
      const id = getIdFromHash();
      const idx = products.findIndex((p) => p.id === id);
      setCurrentIndex(idx);
    };
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const selectedProduct = currentIndex >= 0 ? products[currentIndex] : null;

  if (!selectedProduct) {
    return null;
  }

  const {
    title,
    description,
    slideDescription,
    image,
    type,
    flavourImage,
    pageHeroBackground,
    heroSlideCircleColor,
    slideCanCapacity,
  } = selectedProduct;

  const _description = slideDescription || description;

  return (
    <>
      <Header />
      <div
        className={styles.slideHero}
        style={{
          background: pageHeroBackground,
        }}
      >
        <AnimatePresence mode="wait">
          <MotionDiv
            key={`bg-${selectedProduct.id}`}
            className={styles.slideBackground}
            style={{
              background: pageHeroBackground,
            }}
            initial={{
              clipPath:
                direction === "right"
                  ? "circle(0% at 100% 100%)"
                  : "circle(150% at 100% 100%)",
            }}
            animate={{
              clipPath:
                direction === "right"
                  ? "circle(150% at 100% 100%)"
                  : "circle(0% at 100% 100%)",
            }}
            exit={{
              clipPath:
                direction === "right"
                  ? "circle(0% at 100% 100%)"
                  : "circle(150% at 100% 100%)",
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          />
        </AnimatePresence>
        <div className={styles.slideContent}>
          <img src={JuicyImage} className={styles.slideLogo} alt={title} />

          <div className={styles.slideImage}>
            <AnimatePresence mode="wait">
              <MotionImg
                key={selectedProduct.id}
                src={image}
                alt={title}
                initial={{ x: window.innerWidth / 2.5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: window.innerWidth / 2.5, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeIn",
                }}
              />
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {flavourImage &&
                Array.from({ length: 4 }).map((_, index) => (
                  <MotionDiv
                    key={index}
                    className={cx(
                      styles.flavourImage,
                      styles[`fI${index + 1}`]
                    )}
                    style={{
                      backgroundImage: `url(${flavourImage})`,
                    }}
                    alt={title}
                  ></MotionDiv>
                ))}
            </AnimatePresence>
          </div>

          <ul className={styles.navigation}>
            <li
              onClick={() => {
                setDirection("left");
                const prevIndex =
                  (currentIndex - 1 + products.length) % products.length;
                window.location.hash = `#slide-${products[prevIndex].id}`;
              }}
            >
              <LeftArrowIcon />
            </li>
            <li
              onClick={() => {
                setDirection("right");
                const nextIndex = (currentIndex + 1) % products.length;
                window.location.hash = `#slide-${products[nextIndex].id}`;
              }}
            >
              <RightArrowIcon />
            </li>
          </ul>

          <AnimatePresence mode="wait">
            <MotionDiv
              key={`info-${selectedProduct.id}`}
              className={styles.slideInfo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className={styles.stitle}>{title}</h2>
              <h2 className={styles.sdescription}>{_description}</h2>
              <Button color={type} text="View" />
            </MotionDiv>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={`capacity-${selectedProduct.id}`}
            className={styles.slideCanCapacity}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {slideCanCapacity.map((capacity, index) => (
              <li
                key={capacity}
                className={index === 0 ? styles.active : ""}
                style={{
                  backgroundColor: heroSlideCircleColor,
                }}
              >
                <p>{capacity}</p>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </>
  );
}

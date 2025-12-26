import cx from "classnames";
import { useEffect, useState } from "react";
import { products } from "../../data/products";
import styles from "./ProductSlider.module.scss";
import Header from "../Header/Header";
import JuicyImage from "../../assets/images/juicy.png";
import Button from "../Button/Button";
import { LeftArrowIcon } from "../../assets/icons/LeftArrowIcon";
import { RightArrowIcon } from "../../assets/icons/RightArrowIcon";

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
        <div className={styles.slideContent}>
          <img src={JuicyImage} className={styles.slideLogo} alt={title} />

          <div className={styles.slideImage}>
            <img src={image} alt={title} />

            {flavourImage && (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className={cx(
                      styles.flavourImage,
                      styles[`fI${index + 1}`]
                    )}
                    style={{
                      backgroundImage: `url(${flavourImage})`,
                    }}
                    alt={title}
                  ></div>
                ))}
              </>
            )}
          </div>

          <ul className={styles.navigation}>
            <li
              onClick={() => {
                const prevIndex =
                  (currentIndex - 1 + products.length) % products.length;
                window.location.hash = `#slide-${products[prevIndex].id}`;
              }}
            >
              <LeftArrowIcon />
            </li>
            <li
              onClick={() => {
                const nextIndex = (currentIndex + 1) % products.length;
                window.location.hash = `#slide-${products[nextIndex].id}`;
              }}
            >
              <RightArrowIcon />
            </li>
          </ul>

          <div className={styles.slideInfo}>
            <h2 className={styles.stitle}>{title}</h2>
            <h2 className={styles.sdescription}>{_description}</h2>
            <Button color={type} text="View" />
          </div>
        </div>

        <ul className={styles.slideCanCapacity}>
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
        </ul>
      </div>
    </>
  );
}

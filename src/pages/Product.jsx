import cx from "classnames";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import styles from "../assets/styles/Product.module.scss";
import Header from "../components/Header/Header";
import JuicyImage from "../assets/images/juicy.png";
import Button from "../components/Button/Button";
import { LeftArrowIcon } from "../assets/icons/LeftArrowIcon";
import { RightArrowIcon } from "../assets/icons/RightArrowIcon";

export default function Product() {
  const params = useParams();

  const selectedProduct = products.find((product) => product.id === params.id);

  if (!selectedProduct) {
    return <div>Product not found</div>;
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
            <li onClick={() => {}}>
              <LeftArrowIcon />
            </li>
            <li onClick={() => {}}>
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

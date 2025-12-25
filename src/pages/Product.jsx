import cx from "classnames";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import styles from "../assets/styles/Product.module.scss";
import Header from "../components/Header/Header";
import JuicyImage from "../assets/images/juicy.png";

export default function Product() {
  const params = useParams();

  const selectedProduct = products.find((product) => product.id === params.id);

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div
      className={styles.slideHero}
      style={{
        background: selectedProduct.pageHeroBackground,
      }}
    >
      <Header />

      <img
        src={JuicyImage}
        className={styles.slideLogo}
        alt={selectedProduct.title}
      />

      <div className={styles.slideImage}>
        <img src={selectedProduct.image} alt={selectedProduct.title} />

        {selectedProduct.flavourImage && (
          <>
            <img
              className={cx(styles.flavourImage, styles.fI1)}
              src={selectedProduct.flavourImage}
              alt={selectedProduct.title}
            />
            <img
              className={cx(styles.flavourImage, styles.fI2)}
              src={selectedProduct.flavourImage}
              alt={selectedProduct.title}
            />
            <img
              className={cx(styles.flavourImage, styles.fI3)}
              src={selectedProduct.flavourImage}
              alt={selectedProduct.title}
            />
            <img
              className={cx(styles.flavourImage, styles.fI4)}
              src={selectedProduct.flavourImage}
              alt={selectedProduct.title}
            />
          </>
        )}
      </div>
    </div>
  );
}

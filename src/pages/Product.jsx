import { useParams } from "react-router-dom";
import { products } from "../data/products";
import styles from "../assets/styles/Product.module.scss";
import Header from "../components/Header/Header";

export default function Product() {
  const params = useParams();

  const selectedProduct = products.find((product) => product.id === params.id);

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div
      style={{
        background: selectedProduct.pageHeroBackground,
      }}
    >
      <Header />
      {selectedProduct.id} - {selectedProduct.title}
      background: radial-gradient(50% 50% at 50% 50%, #AA93E3 0%, #7547E5 100%);
    </div>
  );
}

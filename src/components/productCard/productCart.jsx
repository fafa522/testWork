import styles from "./styles.module.scss";

import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/service/api";

export const ProductCard = () => {
  const { productId } = useParams();
  const { data: products, isLoading } = useGetProductsQuery();
  const product = products?.find(({ id }) => id === Number(productId));
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!product) {
    return <div>refresh the page</div>;
  }

  return (
    <>
      <Link to={"/testWork"}>
        <img className={styles.back} src="/arrow-right.svg" />
      </Link>
      <div className={styles.root}>
        <img src={product.imageUrl} alt={product.imageUrl} />
        <h2>{product.title}</h2>
        <span>{product.description}</span>
        <div>{product.price} Руб.</div>
      </div>
    </>
  );
};

/* eslint-disable react/prop-types */
import styles from "./styles.module.scss";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../redux/service/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Card = ({ product, onDelete }) => {
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [isFavorite, setIsFavorite] = useState(product.isFavorite);

  useEffect(() => {
    setIsFavorite(product.isFavorite);
  }, [product]);

  const favoriteToggle = async () => {
    try {
      const updatedProduct = { isFavorite: !isFavorite };
      await updateProduct({ ...product, ...updatedProduct }).unwrap();
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("fall", error);
    }
  };

  const removeCard = async () => {
    try {
      await deleteProduct(product.id).unwrap();
      if (onDelete) onDelete(product.id);
      setIsFavorite(false);
    } catch (error) {
      console.error("fall", error);
    }
  };

  return (
    <Link className={styles.link} to={`${product.id}`}>
      <div className={styles.root}>
        <img
          src={`testWork/${product.imageUrl}`}
          alt={`testWork/${product.imageUrl}`}
        />
        <div>{product.title}</div>
        <div className={styles.icons}>
          <img
            onClick={(e) => {
              e.preventDefault();
              favoriteToggle();
            }}
            src={isFavorite ? "/testWork/like-2.svg" : "/testWork/like-1.svg"}
            alt="like"
          />
          <img
            onClick={(e) => {
              e.preventDefault();
              removeCard();
            }}
            src="/testWork/trash.svg"
            alt="trash"
          />
        </div>
      </div>
    </Link>
  );
};

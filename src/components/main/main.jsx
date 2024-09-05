import { Link, Outlet } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/service/api";
import { Card } from "../card/card";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

export const Main = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (products) {
      setProductList(products);
    }
  }, [products]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!products) {
    return <div>refresh the page</div>;
  }

  const handleDelete = (productId) => {
    setProductList(productList.filter((product) => product.id !== productId));
  };

  const filteredProducts = productList.filter((product) => {
    if (filter === "favorites") {
      return product.isFavorite;
    }
    return true;
  });

  return (
    <>
      <Link className={styles.create} to={"/create"}>
        <span>Создать карточку</span>
      </Link>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={styles.filterDropdown}
      >
        <option value="all">Все товары</option>
        <option value="favorites">Понравившиеся</option>
      </select>

      <div className={styles.root}>
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <Card key={product.id} product={product} onDelete={handleDelete} />
          ))
        ) : (
          <div>Нет товаров для отображения</div>
        )}
      </div>
      <Outlet />
    </>
  );
};

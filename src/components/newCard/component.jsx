import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useAddProductMutation } from "../../redux/service/api";
import { useState } from "react";

export const NewCard = () => {
  const [createNewCard] = useAddProductMutation();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newError = {};

    if (!title) {
      newError.title = "Название не может быть пустым";
    }

    if (!price) {
      newError.price = "Цена не может быть пустой";
    } else if (isNaN(price) || price <= 0) {
      newError.price = "Цена не может быть меньше 0";
    }

    if (!imageUrl) {
      newError.imageUrl = "Ссылка на картинку обязательна";
    }

    if (!description) {
      newError.description = "Описание не может быть пустым";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const createCard = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData = {
      title,
      price,
      imageUrl,
      description,
    };

    try {
      await createNewCard(productData).unwrap();
      setTitle("");
      setPrice("");
      setImageUrl("");
      setDescription("");
      setErrors({});
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <>
      <Link to={"/testWork"}>
        <img className={styles.back} src="/arrow-right.svg" />
      </Link>
      <form className={styles.root} onSubmit={createCard}>
        <div>
          <input
            placeholder="Введите название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>
        <div>
          <input
            placeholder="Введите цену"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          {errors.price && <span className={styles.error}>{errors.price}</span>}
        </div>
        <div>
          <input
            placeholder="Ссылка на картинку"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          ></input>
          {errors.imageUrl && (
            <span className={styles.error}>{errors.imageUrl}</span>
          )}
        </div>
        <div>
          <textarea
            placeholder="Введите описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>
        <button type="submit">Загрузить</button>
      </form>
    </>
  );
};

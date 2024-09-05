import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Main } from "./components/main/main";
import { ProductCard } from "./components/productCard/productCart";
import { NewCard } from "./components/newCard/component";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/:productId",
    element: <ProductCard />,
  },
  {
    path: "/create",
    element: <NewCard />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

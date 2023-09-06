import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";
import "./style.css";

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery },
  } = CartState();
  console.log("cart data using context byStock", products, byFastDelivery);

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) => {
        return sort === "lowToHigh" ? a.price - b.price : b.price - a.price;
      });
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.fastDelivery === byFastDelivery;
      });
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => {
          return <SingleProduct prod={prod} key={prod?.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;

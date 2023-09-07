import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";
import "./style.css";

const Home = () => {
  const {
    state: { products, data },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = data;

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

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.ratings >= byRating;
      });
    }

    if (byStock) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.inStock === 0;
      });
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.name.toLowerCase().includes(searchQuery.toLowerCase());
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

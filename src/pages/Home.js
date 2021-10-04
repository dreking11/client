import React, {useEffect, useState} from "react";
import { getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts()
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(3).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
    <div className="jumbotron text-danger h1 font-weight-bold text-center" >
      <Jumbotron text={['New Arrivals', 'Best Sellers','Latest Products']}/>
    </div>

    <div className="container">
      <div className="row">
        {products.map((product) => (
        <div key={product.id} className="col-md-4">
          <ProductCard product={product}/>
        </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;
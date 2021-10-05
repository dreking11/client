import React, {useEffect, useState} from "react";
import { getProducts } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";


const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadAllProducts()
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts('sold', 'desc', page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
    <div className="container">
      { loading ? (
      <LoadingCard count={3}/>
      ) : (
      <div className="row">
        {products.map((product) => (
        <div key={product.id} className="col-md-4">
          <ProductCard product={product}/>
        </div>
        ))}
      </div>
       )}
    </div>
    </>
  );
};

export default BestSellers;
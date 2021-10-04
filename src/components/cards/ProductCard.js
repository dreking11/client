import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import surfacePro from "../../images/surface-pro-platnium.png";
import { Link } from "react-router-dom";

const { Meta } = Card;

const ProductCard = ({product}) => {

    const {images,title,description,slug} = product;
    return (
    <Card 
    cover={
        <img
          src={images && images.length ? images[0].url : surfacePro}
          style={{ height: "150px", objectFit: "over" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
        <EyeOutlined className="text-warning"/> <br/> View Product
        </Link>,
        <>
        <ShoppingCartOutlined className="text-danger"/>  <br/> Add to Cart
        </>,
    ]}
      >
        <Meta title={title} description={`${description && description.substring(0,10)}...`} />
    </Card>
)
}

export default ProductCard;
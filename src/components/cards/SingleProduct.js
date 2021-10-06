import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import surfacePro from "../../images/surface-pro-platnium.png";

const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product;
  return (
    <>
      <div className="col-md-7">
       { images && images.length ? (<Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((i) =><img src={i.url} key={i.public_id} />)}
        </Carousel>): (
        <Card
        cover={
          <img
            src={images && images.length ? images[0].url : surfacePro}
            className="mb-3 card-image"
          />
        }
        ></Card>
        )}
      </div>

      <div className="col-md-5">
        
        <Card 
        actions=
        {[
          <>
            <ShoppingCartOutlined className="text-success" /> <br/> Add To Cart
          </>,
          <Link to="/">
            <HeartOutlined className="text-success" /> <br/>Add To Wishlist
          </Link>,
        ]}
        >
          <Meta title={title} description={description} />
          <p>price/category/subs/shipping/color,brand,quanitity available,sold</p>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;

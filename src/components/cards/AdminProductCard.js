import React from "react";
import { Card } from "antd";
import surfacePro from "../../images/surface-pro-platnium.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;

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
      <EditOutlined className="text-warning"/>,
      <DeleteOutlined onClick={()=>handleRemove(slug)} className="text-danger"/>]}
    >
      <Meta title={title} description={`${description && description.substring(0,10)}...`} />
    </Card>
  );
};

export default AdminProductCard;

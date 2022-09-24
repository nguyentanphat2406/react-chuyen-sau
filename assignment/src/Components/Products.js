import React, { useContext } from "react";
import { ProductsContext } from "../Global/ProductsContext";
import { CartContext } from "../Global/CartContext";

export const Products = () => {
  const { products } = useContext(ProductsContext);

  const { dispatch } = useContext(CartContext);
  console.log(products);

  return (
    <>
      {products.length !== 0}
      <div className="products-container">
        {products.length === 0 &&(
          <div>Không có sản phẩm hiển thị</div>
        )}
        {products.map((product) => (
          <div className="product-card" key={product.ProductID}>
            <div className="product-img">
              <img src={product.ProductImg} alt="not found" />
            </div>
            <div className="product-name">{product.ProductName}</div>
            <div className="product-price">{product.ProductPrice}.000đ</div>
            <button
              className="addcart-btn"
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  id: product.ProductID,
                  product,
                })
              }
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

import React from "react";

const ProductItem = ({ product, quantity, onIncrement, onDecrement, onAddToCart }) => {
  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <div>
        <button onClick={onDecrement}>-</button>
        <span style={{ margin: "0 10px" }}>{quantity}</span>
        <button onClick={onIncrement}>+</button>
      </div>
      <button onClick={onAddToCart} style={{ marginTop: "10px" }}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;

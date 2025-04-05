import React from "react";
import { FREE_GIFT } from "../data";

const Cart = ({ cartItems, onIncrement, onDecrement, onRemove }) => {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} style={{ marginBottom: "15px" }}>
            <h4>{item.name}</h4>
            <p>Price: ₹{item.price}</p>
            {item.id !== FREE_GIFT.id && (
              <div>
                <button onClick={() => onDecrement(item.id)}>-</button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button onClick={() => onIncrement(item.id)}>+</button>
                <button onClick={() => onRemove(item.id)} style={{ marginLeft: "10px" }}>
                  Remove
                </button>
              </div>
            )}
            {item.id === FREE_GIFT.id && <p>🎁 Free Gift!</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;

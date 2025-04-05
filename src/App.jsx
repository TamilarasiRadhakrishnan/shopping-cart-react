import React, { useState, useEffect } from "react";
import ProductItem from "./components/ProductItem";
import Cart from "./components/Cart";
import ProgressBar from "./components/ProgressBar";
import { PRODUCTS, FREE_GIFT, THRESHOLD } from "./data";

const App = () => {
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [showGiftMessage, setShowGiftMessage] = useState(false);

  const getSubtotal = () => {
    return cart
      .filter((item) => item.id !== FREE_GIFT.id)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = getSubtotal();

  // Free gift logic
  useEffect(() => {
    const giftInCart = cart.find((item) => item.id === FREE_GIFT.id);
    if (subtotal >= THRESHOLD && !giftInCart) {
      setCart((prevCart) => [...prevCart, { ...FREE_GIFT, quantity: 1 }]);
      setShowGiftMessage(true);
    } else if (subtotal < THRESHOLD && giftInCart) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== FREE_GIFT.id));
    }
  }, [subtotal]);

  const handleQuantityChange = (productId, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta),
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, quantity }]);
    }
  };

  const handleIncrementCart = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrementCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="App" style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h1>🛒 Shopping Cart</h1>
      <div className="products">
        {PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            quantity={quantities[product.id] || 1}
            onIncrement={() => handleQuantityChange(product.id, 1)}
            onDecrement={() => handleQuantityChange(product.id, -1)}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>

      <hr style={{ margin: "30px 0" }} />

      <ProgressBar subtotal={subtotal} />

      {showGiftMessage && subtotal >= THRESHOLD && (
        <p style={{ color: "green", fontWeight: "bold" }}>🎉 Free gift added to your cart!</p>
      )}

      <Cart
        cartItems={cart}
        onIncrement={handleIncrementCart}
        onDecrement={handleDecrementCart}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default App;

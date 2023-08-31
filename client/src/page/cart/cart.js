import React from "react";
import { useShopContext } from "../shop/shopcontext";
import { CartItem } from "./cartitem";
import { useNavigate } from "react-router-dom";
import { ShopContextProvider } from "../shop/shopcontext";

import "./cart.css";
const Cart = (props) => {
const productList = props.productList;
const {id} = productList;
console.log("TESTin cart productl________ist ", productList);
 // const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useShopContext();
 const { cartItems, getTotalCartAmount, checkout } = useShopContext();
 
 const listID = [
    "ocean-blue-shirt",
    "classic-varsity-top",
    "yellow-wool-jumper",
    "floral-white-top",
    "striped-silk-blouse",
    "classic-leather-jacket",
    "dark-denim-top",
    "navy-sport-jacket",
    "dark-winter-jacket",
    "black-leather-bag",
    "zipped-jacket",
    "silk-summer-top",
    "longsleeve-cotton-top",
    "chequered-red-shirt",
    "white-cotton-shirt",
    "olive-green-jacket",
    "blue-silk-tuxedo",
    "red-sports-tee",
    "striped-skirt-and-top",
    "led-high-tops",
    "clay-plant-pot",
    "copper-light",
    "cream-sofa",
    "antique-drawers",
    "white-bed-clothes",
    "pink-armchair",
    "wooden-outdoor-table",
    "brown-throw-pillows",
    "white-ceramic-pot",
    "yellow-watering-can",
    "gardening-hand-trowel",
    "biodegradable-cardboard-pots",
    "grey-sofa",
    "wooden-outdoor-slats",
    "wooden-fence",
    "yellow-sofa",
    "knitted-throw-pillows",
    "vanilla-candle",
    "black-bean-bag",
    "bedside-table",
    "chain-bracelet",
    "leather-anchor",
    "bangle-bracelet",
    "bangle-bracelet-with-feathers",
    "boho-earrings",
    "choker-with-bead",
    "choker-with-gold-pendant",
    "choker-with-triangle",
    "dainty-gold-necklace",
    "dreamcatcher-pendant-necklace",
    "galaxy-earrings",
    "gemstone",
    "gold-bird-necklace",
    "looped-earrings",
    "guardian-angel-earrings",
    "moon-charm-bracelet",
    "origami-crane-necklace",
    "pretty-gold-necklace",
    "silver-threader-necklace",
    "stylish-summer-neclace"
  ];
  const idx= listID.indexOf(id);

  const cartItemCount = cartItems[idx];
  const totalAmount = getTotalCartAmount(productList,cartItems);
  const navigate = useNavigate();
  const handleCheckout = () => {
    checkout(productList);
  };
  return (
    <ShopContextProvider productListData={props.productList}>
    <div className="cart">
    <div>
      <h1>Your Cart Items</h1>
    </div>
    <div className="cart">
      {productList.map((product) => {
        if (cartItems[listID.indexOf(product.id)] >=1) {
          return <CartItem data={product} />;
        }
      })}
    </div>
  

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button
            onClick={() => {
              handleCheckout();
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
    </ShopContextProvider>
  );
};
export default Cart;
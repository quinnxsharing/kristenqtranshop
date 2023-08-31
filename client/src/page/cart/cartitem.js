import React from "react";
import { useShopContext } from "../shop/shopcontext";

export const CartItem = (props) => {
  const { id, title, price, image } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useShopContext();
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
  const total= price*cartItemCount;


  return (
    <div className="cartItem">
      <img src={image} />
      <div className="description">
        <p>
          <b>{title}</b>
        </p>
        <p> Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItemCount}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
          <p> Total: ${total}</p>
        </div>
      </div>
    </div>
  );
};
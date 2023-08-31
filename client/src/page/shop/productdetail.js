import React from "react";
import { useParams } from "react-router-dom";
import { useShopContext } from "./shopcontext";

const ProductDetail = ({ productList }) => {
  const { addToCart, cartItems,updateCartItemCount,removeFromCart } = useShopContext();
  const { id } = useParams();
  console.log("HELLO ITS ID",id)
  // Find the product in the productList based on the id parameter
  const product = productList.find((product) => product.id === id);

  if (!product) {
    return <div>Product not found.</div>;
  }

  const { title, body, image, price } = product;

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
  const idx = listID.indexOf(id);
  console.log("HELLO ITS IDX", idx);

  const cartItemCount = cartItems[idx] || 0; // Ensure cartItemCount is defined

  console.log("HELLO ITS cartItemCount", cartItemCount);

  const handleAddToCart = () => {
    addToCart(id);
  };

  return (
    <div className="product-detail">
      <img src={image} alt={title} style={{ height: "400px" }} />
      <h3>{title}</h3>
      <h4> ${price} AUD</h4>
      <div className="description" dangerouslySetInnerHTML={{ __html: body }} />
      <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItemCount}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={(handleAddToCart)}> + </button>
    </div>
    </div>

  );
};

export default ProductDetail;
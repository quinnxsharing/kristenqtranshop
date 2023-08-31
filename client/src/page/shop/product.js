import { useState } from "react";
import { useShopContext } from "./shopcontext";
import { Link } from "react-router-dom";
import "./productlist.css";
const Product = (props) => {
  const { addToCart, cartItems } = useShopContext();

  const [id] = useState(props.id);
  const [title] = useState(props.title);
  const [body] = useState(props.body);
  const [image] = useState(props.image);
  const [price] = useState(props.price);

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
  


  return (
    <div className="product">
      <Link to={`/products/${id}`} className="product-link" >
      <img src={image} alt={title} style={{ width: "300px", height: "300px" }} />
      <h3>{title}</h3>
      <h4> ${price} AUD</h4>
      <div className="description" dangerouslySetInnerHTML={{ __html: body }} />
      </Link>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
      


    </div>
  );
};

export default Product;
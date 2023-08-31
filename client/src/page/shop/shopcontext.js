import { createContext, useEffect, useState,useContext} from "react";
import axios from "axios";
const ShopContext = createContext(null);
export const useShopContext = () => {
  return useContext(ShopContext);
};
export const ShopContextProvider = ({ children, productListData }) => {
  const getDefaultCart = (productListData) => {
    if (!productListData) {
      // Handle the case where productList is not defined (e.g., set a default value)
      productListData = [];
    }
    let cart = {};
    console.log("test nha ",productListData);
    for (let i = 0; i < productListData.length; i++) {
      cart[i] = 0;
    }
   // console.log("this is MAIN CART",cart)
   // console.log("this is MAIN CART LIST 0  ",productListData[0])
  
    return cart;
    
  };

  const initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || getDefaultCart(productListData);
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [IDlist, setIDlist] = useState([]);

  useEffect(() => {
    if (productListData) {
      setIDlist(productListData.map(item => item.id));
      console.log("ID List",IDlist) 

    }
  }, [productListData]);
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
  

  useEffect(() => {
    // Save cartItems to local storage whenever it changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


  const getTotalCartAmount = (productListData, cartItems) => {
    if (!productListData) {
      // Handle the case where productListData is not defined (e.g., set a default value)
      productListData = [];
    }
    let totalAmount = 0;
    let itemPrice=0;
    console.log("ITEM.ididididid",cartItems[1])
    console.log("ITEM.idididiewvwedid",cartItems)

    console.log("ITEM MMMIDIDID",productListData[1])
   
    for (let itemIdx in cartItems) {
      if (productListData[itemIdx]) {
        let itemInfo = productListData[itemIdx];
        itemPrice = itemInfo.price;
        totalAmount += cartItems[itemIdx] * itemInfo.price;
    }
    else {
      console.log("condition is not meet ")
    }
      }
    return totalAmount;
  };
  const addToCart = (itemID) => {
    // Use the functional update pattern to ensure the latest state is used
    setCartItems((prevCartItems) => {
      // Create a shallow copy of the previous cartItems state
      const updatedCartItems = { ...prevCartItems };
      const itemIdx= listID.indexOf(itemID);
      // Check if the item already exists in the cart
      if (updatedCartItems[itemIdx]) {
        // If it exists, increment the quantity by 1
        updatedCartItems[itemIdx] += 1;
      } else {
        // If it doesn't exist, initialize it with a quantity of 1
        updatedCartItems[itemIdx] = 1;
      }
  
      // Return the updated cartItems object
      return updatedCartItems;
    });
  };
  
  const removeFromCart = (itemID) => {
    // Use the functional update pattern to ensure the latest state is used
    setCartItems((prevCartItems) => {
      // Create a shallow copy of the previous cartItems state
      const updatedCartItems = { ...prevCartItems };
      const itemIdx= listID.indexOf(itemID);

      // Check if the item exists in the cart and has a quantity greater than 0
      if (updatedCartItems[itemIdx] && updatedCartItems[itemIdx] > 0) {
        // Decrement the quantity by 1
        updatedCartItems[itemIdx] -= 1;
      }
  
      // Return the updated cartItems object
      return updatedCartItems;
    });
  };
  
  const updateCartItemCount = (newAmount, itemID) => {
    setCartItems((prev) => {
      // Create a copy of the previous cartItems
      
      const updatedCartItems = { ...prev };
      const itemIdx= listID.indexOf(itemID);

      // Update the item with the new amount
      updatedCartItems[itemIdx] = newAmount;
      
      return updatedCartItems;
    });
  };
   
  const checkout = async (productListData) => {
    try {
      // Ensure that productListData is defined and not empty
      if (!productListData || productListData.length === 0) {
        console.error('Product list data is undefined or empty.');
        return;
      }
  
      // Create an order object based on the cartItems
      const orderItems = [];
      for (const itemIdx in cartItems) {
        if (cartItems[itemIdx] > 0) {
          const itemInfo = productListData[parseInt(itemIdx, 10)]; // Convert itemIdx to a number
          if (itemInfo) {
            const orderItem = {
              product_id: itemInfo.id,
              quantity: cartItems[itemIdx],
              price: itemInfo.price,
            };
            orderItems.push(orderItem);
          }
        }
      }
  
      // Calculate the total order amount
      const orderTotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
      // Create the order object
      const order = {
        user_id: 1, 
        order_date: new Date().toISOString().slice(0, 10),
        order_status: 'pending',
        order_total: orderTotal,
        order_items: orderItems,
      };
  
      // Send the order to the server
      const response = await axios.post('http://localhost:3001/orders', order);
      console.log('Order placed successfully:', response.data);
  
      // Clear the cart
      setCartItems(getDefaultCart(productListData));
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };


  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };
 // console.log("shop context is render")
  console.log("this is cart item ", cartItems);

  return (
    <ShopContext.Provider value={contextValue} >
      {children}
    </ShopContext.Provider>
  );
};
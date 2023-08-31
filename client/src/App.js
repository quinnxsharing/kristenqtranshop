import './App.css';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import NavBar from "./components/navbar";
import Cart from "./page/cart/cart";
import Orders from"./page/orders/orders";
import { ShopContextProvider } from './page/shop/shopcontext';
import { useEffect, useState } from "react";
import axios from "axios";
import ProductDetail from './page/shop/productdetail';
import CheckoutComponent from './page/orders/checkout';
import ProductFilter from './page/shop/productfilter';
import baseUrl from './baseUrl';

function App(props) {
  const [productList, setProductList] = useState([]); 
    useEffect(() => {
        console.log("effect is being run");
        axios.get(`${baseUrl}/products`).then((response) => {
          console.log("we have a response", response.data);
          setProductList(response.data);
        });
      }, []);
      console.log("We are rendering the Shop component");
  
  return (

    <div className="App">
   <ShopContextProvider productListData={props.productList}>

    <Router>
    <NavBar/>
    <Routes>
     <Route path="/"  element= { <ProductFilter products={productList} />} />
     <Route path="/products/:id" element={<ProductDetail productList={productList} />} />
     <Route path="/cart" element = {<Cart productList={productList}/>}/>
     <Route path="/orders" element = {<Orders/>}/>
     <Route path="/checkout" element={<CheckoutComponent/>} />
  </Routes>

  </Router> 
  </ShopContextProvider>
  </div>

  );
}

export default App;
 
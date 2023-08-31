import React from "react";
import{Link} from 'react-router-dom';
import { ShoppingCart} from "phosphor-react";
import "./navbar.css";
import User from "../page/user/user";
const NavBar =()=> {
    return (
        <div className="navbar">
            <div className= "user">
                <User></User>

            </div>

            <div className="links">
            <Link to="/">Shop</Link>
            <Link to="/cart"> <ShoppingCart size= {30}/></Link>
            <Link to="/orders">Orders</Link>
            </div>
             <p>navbar</p>
        </div>
    );
}
export default NavBar; 
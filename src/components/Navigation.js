import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import "../App.css";
import { useSelector } from "react-redux";
import shoppingcart from "../imagesByEoin/shopping-cart.png";
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import SvgIcon from "@material-ui/icons/ShoppingCartSharp";
import { signout } from '../actions/userActions';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function Navigation(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <div>
      <header>
        <ul className="header">
        <li className="cart-icon">
          <a className="cart-text" href="/cart/:id?">
            <SvgIcon>
              <ShoppingCartSharpIcon></ShoppingCartSharpIcon>
            </SvgIcon>{cartItems.length === 0 ? null : cartItems.length}</a>
            </li>                
          <div className="navLeftSide">

            <li>
              <Link to="/">
                <h2 className="mobilefonth2">timberandbarkmulch.ie</h2>
              </Link>
            </li>
          </div>

          <div>
            <li>
              <button className="burger-menu" onClick={openMenu}>
                &#9776;
              </button>
            </li>
          </div>

          <span className="notForMobile">

          {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <ul>
              {/* <li>
              <Link to="/signin">Sign </Link>
              </li> */}
              
              <li>
                <a href="/#about">About</a>
              </li>

              <li>
                <a href="/#products">Products</a>
              </li>

              <li>
                <a href="/#contact">Contact</a>
              </li>

              <li>
              <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link></li></ul>
            )}
            </span>
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}

            
         
        </ul>
        <div className="straightenThis"></div>
      </header>

      <aside className="sidebar">
        <h3>Navigation</h3>
        <h5 className="sidebar-close-button" onClick={closeMenu}>
          X
        </h5>
        <ul className="categories">
          <li>
            <h5><a className="whitetext" href="/">Home</a></h5>
          </li>
          <li>
            <h5><a className="whitetext" href="/#products">Products</a></h5>
          </li>
          <li>
            <h5><a className="whitetext" href="/#contact">Contact</a></h5>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Navigation;

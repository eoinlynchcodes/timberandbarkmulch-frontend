import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import Navigation from "../components/Navigation.js";
import Footer from '../components/Footer.js';
import { userAddressMapReducer } from '../reducers/userReducers';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    // <div className="row top">
    //   <div className="col-2">
    //     <h1>Shopping Cart</h1>
    //     {error && <MessageBox variant="danger">{error}</MessageBox>}
    //     {cartItems.length === 0 ? (
    //       <MessageBox>
    //         Cart is empty. <Link to="/">Go Shopping</Link>
    //       </MessageBox>
    //     ) : (
    //       <ul>
    //         {cartItems.map((item) => (
    //           <li key={item.product}>
    //             <div className="row">
    //               <div>
    //                 <img
    //                   src={item.image}
    //                   alt={item.name}
    //                   className="small"
    //                 ></img>
    //               </div>
    //               <div className="min-30">
    //                 <Link to={`/product/${item.product}`}>{item.name}</Link>
    //               </div>
    //               <div>
    //                 <select
    //                   value={item.qty}
    //                   onChange={(e) =>
    //                     dispatch(
    //                       addToCart(item.product, Number(e.target.value))
    //                     )
    //                   }
    //                 >
    //                   {[...Array(item.countInStock).keys()].map((x) => (
    //                     <option key={x + 1} value={x + 1}>
    //                       {x + 1}
    //                     </option>
    //                   ))}
    //                 </select>
    //               </div>
    //               <div>${item.price}</div>
    //               <div>
    //                 <button
    //                   type="button"
    //                   onClick={() => removeFromCartHandler(item.product)}
    //                 >
    //                   Delete
    //                 </button>
    //               </div>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     )}
    //   </div>
    //   <div className="col-1">
    //     <div className="card card-body">
    //       <ul>
    //         <li>
    //           <h2>
    //             Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
    //             {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
    //           </h2>
    //         </li>
    //         <li>
    //           <button
    //             type="button"
    //             onClick={checkoutHandler}
    //             className="primary block"
    //             disabled={cartItems.length === 0}
    //           >
    //             Proceed to Checkout
    //           </button>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>

    <section>
    {/* <Navigation /> */}
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div><h4>
              Cart is Empty
            </h4>
            <div className="see-products-button">
            <Link to="/"><h4 className="see-products"><u>Go to Products</u></h4></Link>
            </div>
            </div>
          ) : (
            cartItems.map((item) => (
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product} className="black-text" >{item.name}</Link>
                  </div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <p
                      type="button"
                      className=""
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <u>Delete</u>
                    </p>
                </div>
                <div className="cart-price">€{item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items) : €{" "}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          onClick={checkoutHandler}
          id="greenButton"
          className="button primary full-width"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
    <Footer/>
  </section>
  );
}

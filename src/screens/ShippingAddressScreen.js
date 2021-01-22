import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Footer from "../components/Footer";
import { savePaymentMethod } from "../actions/cartActions";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    props.history.push("/signin");
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [instructions, setInstructions] = useState(
    shippingAddress.instructions
  );
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
      dispatch(saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          instructions
        }));
      dispatch(savePaymentMethod(paymentMethod));
      props.history.push('/placeorder');
  };


  return (

    <div>
      {/* <CheckoutSteps step1 step2></CheckoutSteps> */}
      <div className="form">
        <form onSubmit={submitHandler}>
          {/* <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label for="paymentMethod">Paypal</label>
              </div>
            </li>
          </ul> */}

          <ul className="form-container">
            <li>
              <h2>Delivery Address</h2>
            </li>

            <li>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder=""
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              ></input>
            </li>

            <li>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="city">Town:</label>
              <input
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="postalCode">
                Eircode:{" "}
                <a className="black-text" href="https://finder.eircode.ie/#/">
                  <i className="red-text">*Click here to Find Your Eircode</i>
                </a>
              </label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="country">County:</label>
              <input
                type="text"
                name="country"
                id="country"
                value={country}
                placeholder="Note: We only deliver in Westmeath."
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            </li>

            <li>
              <label htmlFor="country">
                Instructions for Delivery Driver (Optional):
              </label>
              <input
                type="text"
                name="instructions"
                id=""
                placeholder=""
            
                onChange={(e) => setInstructions(e.target.value)}
              ></input>
            </li>

            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
      <br />
      <Footer />
    </div>
  );
}

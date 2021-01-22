import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Navigation from "../components/Navigation";
import stoveburning from "../imagesByEoin/stoveburning.png";
import firewoodstack from "../imagesByEoin/firewoodstack.jpeg";
import yard from "../imagesByEoin/yard.jpg";
import timberstack from "../imagesByEoin/timberstack.jpg";
import MyForm from "../components/MyForm.js";
import Footer from "../components/Footer";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { listTopSellers } from "../actions/userActions";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    props.history.push("/cart/" + product._id + "?qty=" + 1);
  };

  return (
    <>
      {/* <Navigation /> */}
      <div className="videoAndDescription">
        <div className="left33">
          <div className="textToSquare">
            <div className="main-text-block">
              <h1>
                Firewood.
                <br /> Delivered.
              </h1>
              <h5 className="">
                Order online and get firewood delivered in Westmeath.
                <br /> Seasoned and dried by air or kiln.
              </h5>

              <div className="flexThisEvenly">
                <a className="" href="#products">
                  <p className="orderNowButton">Order Now</p>
                </a>
                <a className="" href="#products">
                  <p className="seeProductButton">
                    <u>See Products</u>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="right66">
          <img src={stoveburning} />
        </div>
      </div>

      <div className="firewoodSection">
        <img src={firewoodstack} />
      </div>

      <div className="">
        <div id="supplyID" className="forPaddingSections">
          <hr className="smallHR" />
          <h3 className="supplytext">
            <i>
              Over 40 years of supplying firewood, timber products and tree
              services.
            </i>
          </h3>
          <hr className="smallHR" />
        </div>
      </div>

      <div className="containerByEoin">
        <section className="products-section">
          <div className="product-padding-section">
            {/* <h1 id="products">Products</h1> */}
            <p>More products will be available here soon.</p>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <ul id="products" className="products">
                {products.map((product) => (
                  <li key={product._id}>
                    {product ? (
                      <div className="product">
                        <Link to={"/product/" + product._id}>
                          <img
                            className="product-image"
                            src={product.image}
                            alt="product"
                          />
                        </Link>
                        <div className="product-name pad">
                          <Link
                            className="product-actual-name"
                            to={"/product/" + product._id}
                          >
                            {product.name}
                          </Link>
                        </div>

                        <div className="product-price pad">
                          {" "}
                          {product.price ? `€ ${product.price}` : null}
                        </div>

                        <div className="buttonDivHomepageProduct">
                          <div className="button primary fifty">More Info</div>
                          {product.countInStock > 0 ? (
                            <div
                              onClick={(product) => handleAddToCart(product)}
                              id="greenButton"
                              className="whitetext button fifty"
                            >
                              Add to Cart
                            </div>
                          ) : (
                            <div className="button primary">
                              <a href="#contact" className="whitetext">
                                Email Us For Orders
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h2>
                          Products will soon be available for purchase here.
                        </h2>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="">
          <div className="forPaddingSections">
            <section>
              <div className="oneofthree">
                <h1>1</h1>
                <h3>
                  <u>Order Firewood</u>
                </h3>
                <h5>Choose your product.</h5>
              </div>
              <hr/>
              <div className="oneofthree">
                <h1>2</h1>
                <h3>
                  <u>Choose Delivery or Collection</u>
                </h3>
                <h4>
                  Receive firewood delivery or schedule a time for collection
                  from our yard in Mullingar.
                </h4>
              </div>
              <hr/>
              <div className="oneofthree">
                <h1>3</h1>
                <h3>
                  <u>Make use of your new firewood</u>
                </h3>
                <h4>
                  All of our firewood is seasoned for at least 2 years. Get
                  exceptional heat from your fire.
                </h4>
              </div>
            </section>
          </div>
        </section>

        <section className="homepageSectionFirewood">
          <div className="forPaddingSections">
            <h2>Our Firewood</h2>
            <section className="grey-border">
              <div className="imagecontainer">
                <img className="imagetocontain" src={yard} />
              </div>
              <div className="forPaddingSections">
                <ul className="our-firewood-section padText">
                  <li>Seasoned for at least two years.</li>
                  <li>
                    Comes from dangerous trees that had to be cut down for
                    safety reasons.
                  </li>
                  <li>
                    Naturally dried and seasoned in our yard in the centre of
                    Ireland for at least 2 years.
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </section>

        <section className="about-section">
          <div className="forPaddingSections">
            <h1 id="about">About</h1>
            <section className="grey-border">
              <div>
                <img src={timberstack} />
              </div>
              <div className="forPaddingSections">
                <p className="padText">
                  Mick Lynch &amp; Son Tree Surgery have been felling dangerous
                  trees and selling firewood since 1978. In response to an
                  increasing demand for timber based products in the midlands,
                  John Lynch decided to setup timberandmulch.ie and the
                  necessary infrastructure to process and sell firewood, bark
                  mulch and slabs of hardwood for use with furniture,
                  construction, art, design and more.
                </p>
              </div>
            </section>
          </div>
        </section>

        <section className="contact-section">
          <div className="forPaddingSections">
            <h1 id="contact">Contact Us</h1>
            <MyForm />
            {/* <form className="contactForm">
              <label>Name:</label>
              <input type="text" 
              name="name"
              />
              <br />

              <label>Email:</label>
              <input type="text"
              name="email" />
              <br />

              <label>Phone Number:</label>
              <input type="text" 
              name="number"
              />
              <br />

              <label>Message:</label>
              <textarea type="textarea"
               name="message"
               rows="8" />
              <br />
              <input
                type="submit"
                className="contact-submit-button"
                value="Send Message"
              />
            </form> */}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

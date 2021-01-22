import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
        <li>
          <h1>Sign In</h1>
        </li>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <li>
          <label htmlFor="email">Email address</label><br/>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </li>
        <li>
          <label htmlFor="password">Password</label><br/>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </li>
        <li>
          <label />
          <button className="button primary" type="submit">
            Sign In
          </button>
        </li>
        <li>
          <label />
          <li>
            New customer?{' '}
            <Link to={`/register?redirect=${redirect}`} className="button secondary text-center">
              Create your account
            </Link>
          </li>
        </li>
        </ul>
      </form>
    </div>
  );
}

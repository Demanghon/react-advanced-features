import React, { useState, useEffect, useReducer, useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
  if(action.type === "SET_VALUE"){
    return { value: action.value, isValid: action.value.includes("@")};
  }
  return state;
}

const passwordReducer = (state, action) => {
  if (action.type === "SET_VALUE") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  return state;
};

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const [emailState, emailDispatch] = useReducer(emailReducer, {value: '', isValid: false});
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, { value: '', isValid: false });
  const [formIsValid, setFormIsValid] = useState(false);


   useEffect(() => {
     var myTimeout = setTimeout(() => {
       console.log("Form validation");
       setFormIsValid(passwordState.isValid && emailState.isValid);
     }, 500);

     return () => {
       clearTimeout(myTimeout);
     };
   }, [emailState.isValid, passwordState.isValid]); 


  const emailChangeHandler = (event) => {
    emailDispatch({ type: "SET_VALUE", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({ type: "SET_VALUE", value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

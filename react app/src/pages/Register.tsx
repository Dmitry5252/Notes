import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

import style from "../styles/Login.module.scss";

const Login: React.FC = () => (
  <div className={style.loginWrapper}>
    <div className={style.login}>
      <h1 className={style.title}>REGISTER</h1>
      <LoginForm register={true} />
    </div>
    <Link className={style.link} to="/login">
      Login
    </Link>
  </div>
);

export default Login;

import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

import style from "../styles/Login.module.scss";

const Login: React.FC = () => (
  <div className={style.loginWrapper}>
    <div className={style.login}>
      <h1 className={style.title}>LOGIN</h1>
      <LoginForm register={false} />
    </div>
    <Link className={`${style.link} ${style.registerLink}`} to="/register">
      Create account
    </Link>
  </div>
);

export default Login;

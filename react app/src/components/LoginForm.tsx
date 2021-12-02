import React, { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { required, email, minLength, maxLength, composeValidators } from "../utils/validators";
import axios from "../config/axiosInstance";
import { useNavigate } from "react-router";

import style from "../styles/Login.module.scss";
import { FORM_ERROR } from "final-form";

const LoginForm = ({ register }: { register: boolean }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/noteList");
    }
  }, [navigate]);

  const sendLoginRequest = ({ email, password }: { email: string; password: string }) =>
    axios.post("login", { email, password }).then(
      (value) => {
        localStorage.setItem("access_token", value.data.access_token);
        navigate("/main");
      },
      (e) => ({ [FORM_ERROR]: "Invalid email or password" })
    );

  const sendRegisterRequest = ({ email, password }: { email: string; password: string }) =>
    axios.post("register", { email, password }).then(
      (value) => {
        localStorage.setItem("access_token", value.data.access_token);
        navigate("/main");
      },
      (e) => {
        if (e.response.data === "Email already used") return { email: "Email already used" };
      }
    );
  return (
    <Form
      onSubmit={register ? sendRegisterRequest : sendLoginRequest}
      render={({ handleSubmit, submitError }) => (
        <form onSubmit={handleSubmit} className={style.inputsWrapper}>
          <Field validate={composeValidators(required, email)} name="email">
            {({ meta, input }) => (
              <div className={style.inputWrapper}>
                <div className={style.subTitle}>Email</div>
                <input {...input} />
                <div className={style.validationNotice}>{meta.touched && (meta.error || meta.submitError)}</div>
              </div>
            )}
          </Field>
          <Field validate={composeValidators(required, minLength, maxLength)} name="password">
            {({ meta, input }) => (
              <div className={style.inputWrapper}>
                <div className={style.subTitle}>Password</div>
                <input {...input} type="password" />
                <div className={style.validationNotice}>{meta.touched && meta.error}</div>
              </div>
            )}
          </Field>
          <button type="submit" className={style.submitButton}>
            SUBMIT
          </button>
          {submitError && <div className={style.validationNotice}>{submitError}</div>}
        </form>
      )}
    ></Form>
  );
};

export default LoginForm;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ ...props }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister({ password: userData.password, email: userData.email });
  };

  return (
    <div className="login">
      <div className="login__container">
        <h3 className="login__title">Регистрация</h3>
        <form onSubmit={handleSubmit} className="login__form">
          {/* <input id="username" name="username" type="text" value={userData.username} onChange={handleChange}/> */}
          <input
            className="login__input"
            id="email"
            name="email"
            type="email"
            value={userData.email}
            placeholder="Email"
            onChange={handleChange}
            minLength="3"
          />
          <input
            className="login__input"
            id="password"
            name="password"
            type="password"
            value={userData.password}
            placeholder="Пароль"
            onChange={handleChange}
            minLength="3"
          />
          <button type="submit" className="login__button">
            Зарегистрироваться
          </button>
        </form>
        <Link className="login__signin" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;

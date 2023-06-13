import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  
  const { title, buttonText, onRegister } = props;

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({email, password});
  } 

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <section className="register">
      <h2 className="register__title">{title}</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <input
            className='register__input'
            id="email" 
            name="email" 
            type="email"
            placeholder="Email"
            value={email} 
            onChange={handleChangeEmail} 
            required />
          <input 
            className='register__input'
            id="password" 
            name="password" 
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={handleChangePassword}
            required />
          <button className="register__button" 
            type="submit"
            name="button">
            { buttonText || 'Зарегистрироваться' }
          </button>
        </form>
        <div className="register__signin">
          <p className="register__text">Уже зарегистрированы? 
            <Link to="/sing-in" className="register__login-link"> Войти</Link>
          </p>
        </div>
      </section>
  )
}

export default Register;
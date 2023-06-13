import React, { useState } from 'react';

function Login(props) {

  const { title, buttonText, onLogin } = props;

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({email, password});
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

    return (
      <section className="login">
        <h2 className="login__title">{title}</h2>
        <form className="login__form" onSubmit={handleSubmit} >
          <input 
            className="login__input"
            id="email" 
            name="email" 
            type="email"
            placeholder="Email"
            value={email} 
            onChange={handleChangeEmail}
            required />
          <input 
            className="login__input"
            id="password" 
            name="password" 
            type="password"
            placeholder="Пароль"
            value={password} 
            onChange={handleChangePassword}
            required />
          <button className="login__button" 
            type="submit"
            name="button">
            { buttonText || 'Войти' }
          </button>
        </form>
      </section>
    );
  }

export default Login;
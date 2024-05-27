import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/useAuth";
import ReCAPTCHA from "react-google-recaptcha"


const RegisterPage = () => {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();
  const [capVal, serCapVal] = useState(null)

  // Stan formularza
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  // Obsługa zmiany wartości w polach formularza
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePassword1Change = (event) => setPassword1(event.target.value);
  const handlePassword2Change = (event) => setPassword2(event.target.value);

  // Funkcja obsługująca kliknięcie przycisku Zarejestruj
  const handleRegister = async () => {
    try {
      // Sprawdzenie czy hasła się zgadzają
      if (password1 !== password2) {
        console.error('Passwords do not match');
        return;
      }

      // Wysłanie żądania rejestracji
      const response = await axios.post(`http://${process.env.REACT_APP_BACKEND}/accounts/register/`, {
        email,
        password1,
        password2,
      });

      const token = response.data.token;
      const user = response.data.user; // Załóżmy, że dane użytkownika są zwracane w odpowiedzi
      authDispatch({type: 'setToken', data: token, user: user});
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="justify-center flex">
      <div className="w-8/12 shadow flex flex-col items-center p-3">
        {/* Formularz rejestracji */}
          <label className="input input-bordered flex items-center gap-2 w-1/2 m-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className='grow transition duration-500 ease-in-out focus:bg-amber-200 bg-white'
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-1/2 m-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
          <input
            type="password"
            value={password1}
            onChange={handlePassword1Change}
            className='grow transition duration-500 ease-in-out focus:bg-amber-200 bg-white'
          />
          </label>
          
          <label className="input input-bordered flex items-center gap-2 w-1/2 m-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
          <input
            type="password"
            value={password2}
            onChange={handlePassword2Change}
            className='grow transition duration-500 ease-in-out focus:bg-amber-200 bg-white'
          />
          </label>
          <ReCAPTCHA
          sitekey="6LeF2OkpAAAAAOE52axMeXs7pbkWsAoB9JNv-KDp"
          onChange={(val) => serCapVal(val)}
          />
          <input onClick={handleRegister} disabled={!capVal} type="submit" value="Zarejestruj" className="btn" />
        
      </div>
    </div>
  );
};

export default RegisterPage;

// Header.js
import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import profile_img from '../assets/User.svg';
import Navbar from "./navbar";
import { useAuth } from "../context/useAuth";
import { useCart } from "../pages/Cart/cart_context";
import { getUserData } from "./userServices";

const Header = () => {
  const { isLoggedIn, logout, user, token } = useAuth();
  const navigate = useNavigate();
  const { cart, getTotalItems, totalPrice } = useCart();
  const [totalItems, setTotalItems] = useState(0);
  const [userData, setUser] = useState();

  useEffect(() => {
    setTotalItems(getTotalItems());
  }, [cart]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return '';
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(token);
        setUser(userData);
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych użytkownika", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <div className="navbar bg-base-100 font_poppins">
        <div className="flex-1 text-nowrap">
          <Link to='/'>
            <a className="btn text-xl">Złoty sklepik</a>
          </Link>
        </div>

        <div className="flex gap-3">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H5.62563C6.193 4 6.47669 4 6.70214 4.12433C6.79511 4.17561 6.87933 4.24136 6.95162 4.31912C7.12692 4.50769 7.19573 4.7829 7.33333 5.33333L7.51493 6.05972C7.616 6.46402 7.66654 6.66617 7.74455 6.83576C8.01534 7.42449 8.5546 7.84553 9.19144 7.96546C9.37488 8 9.58326 8 10 8V8" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                  <path d="M18 17H7.55091C7.40471 17 7.33162 17 7.27616 16.9938C6.68857 16.928 6.28605 16.3695 6.40945 15.7913C6.42109 15.7367 6.44421 15.6674 6.49044 15.5287V15.5287C6.54177 15.3747 6.56743 15.2977 6.59579 15.2298C6.88607 14.5342 7.54277 14.0608 8.29448 14.0054C8.3679 14 8.44906 14 8.61137 14H14" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M15.7639 14H9.69425C8.71658 14 7.8822 13.2932 7.72147 12.3288L7.2911 9.7466C7.13872 8.8323 7.84378 8 8.77069 8H18.382C19.1253 8 19.6088 8.78231 19.2764 9.44721L17.5528 12.8944C17.214 13.572 16.5215 14 15.7639 14Z" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                  <circle cx="17" cy="20" r="1" fill="#222222" />
                  <circle cx="9" cy="20" r="1" fill="#222222" />
                </svg>
                <span className="badge badge-sm indicator-item">{totalItems}</span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow ">
              <div className="card-body">
                <span className="font-bold text-lg">{totalItems} Produktów</span>
                <span className="text-info">{new Intl.NumberFormat('pl-PL', {style: 'currency', currency: 'PLN'}).format(totalPrice)}</span>
                <div className="card-actions flex justify-center">
                  <Link to='/cart'>
                    <button className="btn bg-amber-300 hover:bg-amber-500 btn-block w-full">Przejdź do koszyka</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {isLoggedIn && userData ? (
                  <div className="flex items-center justify-center h-full w-full bg-gray-200 rounded-full text-xl">
                    {getInitials(userData.first_name, userData.last_name)}
                  </div>
                ) : (
                  <img alt="Tailwind CSS Navbar component" src={profile_img} />
                )}
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {!isLoggedIn && (
                <>
                  <Link to='/register'>
                    <li>
                      <div className="justify-between">
                        Rejestracja
                      </div>
                    </li>
                  </Link>
                  <Link to='/login'>
                    <li>
                      <div className="justify-between">
                        Logowanie
                      </div>
                    </li>
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Link to={'/profile'}>
                    <li><a>Ustawienia</a></li>
                  </Link>
                  <li><a onClick={handleLogout}>Wyloguj</a></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Header;

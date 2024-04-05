import "./navbar.scss";

import { Link } from "react-router-dom";

import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useNotificationStore } from "../../lib/notification-store";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { currentUser } = useAuth();

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) {
    fetch();
  }

  return (
    <nav>
      <div className="left">
        <Link href="/" className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>CodexEstate</span>
        </Link>
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Contact</a>
        <a href="">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="Avatar" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menu-icon">
          <img src="/menu.png" alt="Hamburger" onClick={() => setOpen(!open)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="">Home</a>
          <a href="">About</a>
          <a href="">Contact</a>
          <a href="">Agents</a>
          <a href="">Sign in</a>
          <a href="">Sign up</a>
        </div>
      </div>
    </nav>
  );
};

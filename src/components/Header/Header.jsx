import React, { useState } from "react";
import styles from "./Header.module.scss";
import { UserIcon } from "../../assets/icons/UserIcon";
import { CartIcon } from "../../assets/icons/CartIcon";
import { Link } from "react-router-dom";

const menuLinks = [
  { label: "Flavour", href: "#flavour" },
  { label: "Drinks", href: "#drinks" },
  { label: "Fruit", href: "#fruit" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          to={{ pathname: "/", hash: "" }}
          className={styles.logo}
          onClick={() => {
            // Ensure hash is cleared so ProductSlider unmounts
            if (typeof window !== "undefined") {
              window.location.hash = "";
            }
          }}
        >
          Juicy
        </Link>

        <nav className={styles.nav}>
          {menuLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.navLink}
              onMouseEnter={(e) => (e.target.style.opacity = "1")}
              onMouseLeave={(e) => (e.target.style.opacity = "0.95")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.iconButton}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            aria-label="User account"
          >
            <UserIcon />
          </button>

          <button
            className={styles.iconButton}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            aria-label="Shopping cart"
          >
            <CartIcon />
            <span className={styles.badge}>2</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

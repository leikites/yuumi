import { useEffect, useState } from "react";

import { navItems, siteMeta } from "../../data/site";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="site-header-glow" aria-hidden="true" />

      <a className="site-brand" href="#home">
        <span className="site-brand-text">
          {siteMeta.name.toUpperCase()}
          <span className="brand-dot">.</span>
        </span>
      </a>

      <button
        type="button"
        className={`site-menu-toggle${isMenuOpen ? " is-open" : ""}`}
        aria-expanded={isMenuOpen}
        aria-controls="site-navigation"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <nav
        id="site-navigation"
        className={`site-nav${isMenuOpen ? " is-open" : ""}`}
        aria-label="Home sections"
      >
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

import { navItems, siteMeta } from "../../data/site";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsMenuOpen(false);

    // 平滑滚动到目标section
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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
      <div className="container">
        <div className="site-header-shell">
          <div className="site-header-glow" aria-hidden="true" />

          <a className="site-brand" href="#hero">
            <span className="site-brand-text">
              <span className="site-brand-word">{siteMeta.name.toUpperCase()}</span>
              <span className="brand-dot" aria-hidden="true" />
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
            <span />
          </button>

          <nav
            id="site-navigation"
            className={`site-nav${isMenuOpen ? " is-open" : ""}`}
            aria-label="Home sections"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

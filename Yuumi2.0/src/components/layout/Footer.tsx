import Container from "../common/Container";
import "../../styles/footer.css";

import type { ComponentType } from "react";
import { navItems } from "../../data/site";
import { createLucideIcon } from "lucide-react";

const Linkedin = createLucideIcon("linkedin", [
  [
    "path",
    {
      d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      fill: "currentColor",
      stroke: "none",
      key: "linkedin",
    },
  ],
]);

const Github = createLucideIcon("github", [
  [
    "path",
    {
      d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
      fill: "currentColor",
      stroke: "none",
      key: "github",
    },
  ],
]);

const Twitter = createLucideIcon("twitter", [
  [
    "path",
    {
      d: "M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148 13.98 13.98 0 0 0 11.82 8.292a4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z",
      fill: "currentColor",
      stroke: "none",
      key: "twitter",
    },
  ],
]);

const sitemapLinks = navItems.filter((item) =>
  ["Home", "About", "Experience"].includes(item.label),
);

const projectLinks = navItems
  .filter((item) => ["Work", "Contact"].includes(item.label))
  .map((item) => ({ ...item, accent: item.label === "Contact" }));

const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Use" },
];

const socialTextLinks: Array<{
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}> = [
  { href: "#", label: "LinkedIn", Icon: Linkedin },
  { href: "#", label: "GitHub", Icon: Github },
  { href: "#", label: "Twitter", Icon: Twitter },
];

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer">
      <div className="footer-watermark" aria-hidden="true">
        YUUMI
      </div>
      <Container>
        <div className="footer-shell">
          <div className="footer-top">
            <div className="footer-left">
              <h3 className="footer-brand-title font-headline">
                <span className="brand-outline">YUUMI</span>
                <span className="footer-brand-dot" aria-hidden="true">
                  .
                </span>
              </h3>

              <div className="footer-columns" aria-label="Footer links">
                <div className="footer-col">
                  <div className="footer-col-title font-label">Sitemap</div>
                  <nav className="footer-nav">
                    {sitemapLinks.map((link) => (
                      <a className="footer-link font-label" href={link.href} key={link.label}>
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="footer-col">
                  <div className="footer-col-title font-label">Projects</div>
                  <nav className="footer-nav">
                    {projectLinks.map((link) => (
                      <a
                        className={`footer-link font-label${link.accent ? " footer-link-accent" : ""}`}
                        href={link.href}
                        key={link.label}
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="footer-col">
                  <div className="footer-col-title font-label">Legal</div>
                  <nav className="footer-nav">
                    {legalLinks.map((link) => (
                      <a className="footer-link font-label" href={link.href} key={link.label}>
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            <div className="footer-right">
              <div className="footer-social" aria-label="Social links">
                {socialTextLinks.map((link) => (
                  <a className="footer-social-link font-label" href={link.href} key={link.label}>
                    <link.Icon className="footer-social-icon" aria-hidden="true" />
                    <span className="footer-social-text">
                      <span>{link.label}</span>
                      <span className="footer-social-underline" aria-hidden="true" />
                    </span>
                  </a>
                ))}
              </div>

              <div className="footer-meta">
                <p className="footer-meta-line font-label">© {year} YUUMI. All rights reserved.</p>
                <p className="footer-meta-sub font-label">
                  Crafted in Hong Kong &amp; Guangzhou · Built with React &amp; Tailwind.
                </p>
              </div>
            </div>
          </div>

          <div className="footer-divider" aria-hidden="true" />
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

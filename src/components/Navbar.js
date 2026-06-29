import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_ITEMS = [
  { label: "Home",         href: "#home"         },
  { label: "About",        href: "#about"        },
  { label: "Experience",   href: "#experience"   },
  { label: "Skills",       href: "#skills"       },
  { label: "Projects",     href: "#projects"     },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact",      href: "#contact"      },
  { label: "Resume",       href: "/resume.pdf", external: true },
];

export default function Navbar() {
  const navRef    = useRef(null);
  const logoRef   = useRef(null);
  const linksRef  = useRef([]);
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState("#home");

  /* ── Entrance animation ── */
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(logoRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4 }, "-=0.3")
        .fromTo(linksRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.4 }, "-=0.2");
    });
    return () => ctx.revert();
  }, []);

  /* ── Scroll shrink ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section highlight ── */
  useEffect(() => {
    const sections = NAV_ITEMS.filter(n => !n.external).map(n => document.querySelector(n.href));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* ── Close mobile menu on resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <nav ref={navRef} className={`navbar${scrolled ? " scrolled" : ""}`}>
        <a href="#home" ref={logoRef} className="nav-logo">Subaranjani K B</a>

        {/* Desktop links */}
        <div className="nav-links">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.external ? item.href : item.href}
              target={item.external ? "_blank" : "_self"}
              rel={item.external ? "noreferrer" : ""}
              ref={el => (linksRef.current[i] = el)}
              className={active === item.href ? "active" : ""}
              onClick={(e) => {
                if (!item.external) {
                  setActive(item.href);
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map(item => (
          <a
            key={item.href}
            href={item.external ? item.href : item.href}
            target={item.external ? "_blank" : "_self"}
            rel={item.external ? "noreferrer" : ""}
            onClick={() => {
              if (!item.external) {
                setMenuOpen(false);
              }
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
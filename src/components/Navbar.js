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
];

export default function Navbar({ onResumeClick }) {
  const navRef   = useRef(null);
  const logoRef  = useRef(null);
  const linksRef = useRef([]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState("#home");

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
    const sections = NAV_ITEMS.map(n => document.querySelector(n.href));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
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
              href={item.href}
              ref={el => (linksRef.current[i] = el)}
              className={active === item.href ? "active" : ""}
              onClick={() => setActive(item.href)}
            >
              {item.label}
            </a>
          ))}
          {/* Resume button — desktop only */}
          <button
            onClick={onResumeClick}
            className="nav-resume-btn"
          >
            View Resume
          </button>
        </div>

        {/* Mobile right side: Resume button + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Resume always visible on mobile navbar */}
          <button
            onClick={onResumeClick}
            className="nav-resume-btn-mobile"
          >
            Resume
          </button>
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu — only View Resume option */}
      {menuOpen && (
        <div className="mobile-menu open">
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 600 }}>Navigate</p>
          {NAV_ITEMS.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => { setActive(item.href); setMenuOpen(false); }}
            >
              {item.label}
            </a>
          ))}
          <div style={{ width: '80px', height: '2px', background: 'rgba(124,58,237,0.15)', margin: '10px 0' }} />
          {/* View Resume in hamburger menu — opens modal, no new tab */}
          <button
            onClick={() => { setMenuOpen(false); onResumeClick(); }}
            style={{
              background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))',
              color: '#fff', border: 'none', borderRadius: '14px',
              padding: '16px 48px', fontSize: '22px', fontWeight: 800,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            View Resume
          </button>
        </div>
      )}
    </>
  );
}
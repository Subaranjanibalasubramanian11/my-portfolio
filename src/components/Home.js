import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  /* ── Typewriter ── */
  const roles = [
    "Aspiring Full Stack Developer",
    "MERN Stack Developer",
    "UI/UX Enthusiast",
  ];
  const [text,       setText]       = useState("");
  const [index,      setIndex]      = useState(0);
  const [charIndex,  setCharIndex]  = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const speed   = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      setText(current.substring(0, charIndex));
      if (!isDeleting && charIndex < current.length)        setCharIndex(c => c + 1);
      else if (isDeleting && charIndex > 0)                  setCharIndex(c => c - 1);
      else if (!isDeleting && charIndex === current.length)  setIsDeleting(true);
      else if (isDeleting  && charIndex === 0) {
        setIsDeleting(false);
        setIndex(i => (i + 1) % roles.length);
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]); // eslint-disable-line

  /* ── GSAP entrance ── */
  const badgeRef    = useRef(null);
  const nameLeftRef = useRef(null);
  const nameRightRef= useRef(null);
  const subtitleRef = useRef(null);
  const descRef     = useRef(null);
  const btnsRef     = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(nameLeftRef.current,  { x: -150, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 })
      .fromTo(nameRightRef.current, { x: 150, opacity: 0 },  { x: 0, opacity: 1, duration: 1.2 }, "<")
      .fromTo(badgeRef.current,    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.3")
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .fromTo(descRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .fromTo(btnsRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    return () => tl.kill();
  }, []);

  return (
    <>
      <section id="home" className="home-container" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <div className="home-text" style={{ maxWidth: '820px', margin: '0 auto', alignItems: 'center' }}>

          <div ref={badgeRef} className="hero-badge">
            <div className="badge-dot" />
            Open to opportunities
          </div>

          <h1 className="hero-title" style={{ display: 'flex', justifyContent: 'center', gap: '18px', overflow: 'visible' }}>
            <span ref={nameLeftRef} style={{ display: 'inline-block' }}>K B</span>
            <span ref={nameRightRef} style={{ display: 'inline-block' }}>Subaranjani</span>
          </h1>

          <p ref={subtitleRef} className="hero-typing">{text}</p>

          <p ref={descRef} className="hero-desc">
            I don't just build websites — I create experiences people love to use.
            Aspiring to become a skilled Full Stack Developer, I am passionate
            about building intuitive and user-friendly web applications. With hands-on experience at
            Sparkout Tech Solutions, I enjoy transforming ideas into impactful digital products.
            Driven by a love for coding and UI/UX design, I continuously learn, innovate,
            and strive to create solutions that leave a lasting impression.
          </p>

          <div ref={btnsRef} className="hero-btns" style={{ marginTop: '32px', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => setShowResume(true)}>
              View Resume <span>↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Resume Modal Viewer ── */}
      {showResume && (
        <div
          onClick={() => setShowResume(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            background: 'rgba(26,5,51,0.80)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '20px',
              width: '100%', maxWidth: '850px',
              height: '90vh',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(124,58,237,0.35)',
              border: '1.5px solid rgba(124,58,237,0.25)',
            }}
          >
            {/* Modal header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 24px',
              borderBottom: '1px solid rgba(124,58,237,0.12)',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(219,39,119,0.04))',
            }}>
              <span style={{ fontWeight: 700, color: '#1a0533', fontSize: '15px' }}>
                📄 K B Subaranjani — Resume
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href="/resume.pdf"
                  download
                  style={{
                    padding: '7px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 700,
                    background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                    color: '#fff', textDecoration: 'none',
                  }}
                >
                  ⬇ Download
                </a>
                <button
                  onClick={() => setShowResume(false)}
                  style={{
                    padding: '7px 14px', borderRadius: '8px', border: '1.5px solid rgba(124,58,237,0.25)',
                    background: 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: 700,
                    color: '#7c3aed',
                  }}
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <iframe
              src="/resume.pdf"
              title="Resume"
              style={{ flex: 1, border: 'none', width: '100%' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home({ showResume, setShowResume }) {
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
      <section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 24px 60px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '720px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Badge */}
          <div ref={badgeRef} className="hero-badge">
            <div className="badge-dot" />
            Open to opportunities
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(38px, 8vw, 68px)',
            fontWeight: 800,
            lineHeight: 1.1,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '14px',
            margin: '8px 0 14px',
          }}>
            <span
              ref={nameLeftRef}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >K B</span>
            <span
              ref={nameRightRef}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, var(--accent-2), var(--accent-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >Subaranjani</span>
          </h1>

          {/* Typing */}
          <p ref={subtitleRef} style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(16px, 3.5vw, 22px)',
            fontWeight: 700,
            color: 'var(--accent-3)',
            minHeight: '34px',
            margin: '0 0 20px',
          }}>
            {text}<span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent-2)' }}>|</span>
          </p>

          {/* Description */}
          <p ref={descRef} style={{
            fontSize: 'clamp(14px, 2.5vw, 16px)',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            lineHeight: 1.85,
            maxWidth: '600px',
            textAlign: 'center',
            margin: '0 auto 36px',
          }}>
            I don't just build websites — I create experiences people love to use.
            Aspiring to become a skilled Full Stack Developer, I am passionate
            about building intuitive and user-friendly web applications. With hands-on experience at
            Sparkout Tech Solutions, I enjoy transforming ideas into impactful digital products.
            Driven by a love for coding and UI/UX design, I continuously learn, innovate,
            and strive to create solutions that leave a lasting impression.
          </p>

          {/* Button */}
          <div ref={btnsRef} style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className="btn-primary"
              onClick={() => setShowResume(true)}
              style={{ fontSize: 'clamp(14px, 2vw, 15px)', padding: '14px 36px' }}
            >
              View Resume
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
            padding: '16px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(255,255,255,0.97)',
              borderRadius: '20px',
              width: '100%', maxWidth: '860px',
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
              padding: '14px 20px',
              borderBottom: '1px solid rgba(124,58,237,0.12)',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(219,39,119,0.04))',
              flexWrap: 'wrap', gap: '10px',
            }}>
              <span style={{ fontWeight: 700, color: '#1a0533', fontSize: '14px' }}>
                📄 K B Subaranjani — Resume
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href="/resume.pdf"
                  download
                  style={{
                    padding: '7px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 700,
                    background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                    color: '#fff', textDecoration: 'none',
                  }}
                >
                  ⬇ Download
                </a>
                <button
                  onClick={() => setShowResume(false)}
                  style={{
                    padding: '7px 14px', borderRadius: '8px',
                    border: '1.5px solid rgba(124,58,237,0.25)',
                    background: 'transparent', cursor: 'pointer',
                    fontSize: '13px', fontWeight: 700, color: '#7c3aed',
                  }}
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* PDF iframe (Google Docs Viewer ensures it displays on mobile) */}
            <iframe
              src="https://docs.google.com/gview?url=https://my-portfolio-ivory-two-94.vercel.app/resume.pdf&embedded=true"
              title="Resume"
              style={{ flex: 1, border: 'none', width: '100%' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
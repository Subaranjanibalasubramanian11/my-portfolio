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
  const badgeRef   = useRef(null);
  const nameLeftRef= useRef(null);
  const nameRightRef= useRef(null);
  const subtitleRef= useRef(null);
  const descRef    = useRef(null);
  const btnsRef    = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });

    // Name split coming together (K B on left, Subaranjani on right)
    tl.fromTo(nameLeftRef.current,  { x: -150, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 })
      .fromTo(nameRightRef.current, { x: 150, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 }, "<")
      // Rest of the elements load AFTER name comes together
      .fromTo(badgeRef.current,    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.3")
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .fromTo(descRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .fromTo(btnsRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
      
    return () => tl.kill();
  }, []);

  return (
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
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-primary">
            View Resume <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
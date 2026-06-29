import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "AI Resume Analyzer",
    tag: "Python · Flask · HTML · CSS",
    desc: "Built a web application to analyze resumes and provide improvement suggestions. Designed an intuitive interface for resume upload and result visualization.",
    features: ["Resume upload system", "AI-based analysis engine", "Improvement suggestions", "Clean UI for result display"],
    github: "https://github.com/Subaranjanibalasubramanian11/resume-analyzer",
  },
  {
    title: "E-Library Management System",
    tag: "Python · Flask · HTML · CSS",
    desc: "Developed a digital library platform with book management and user authentication. Integrated a chatbot feature to enhance user experience.",
    features: ["User login & signup", "Upload and view books", "Chatbot support", "Responsive UI design"],
    github: "https://github.com/Subaranjanibalasubramanian11/E_library_management",
  },
  {
    title: "AI Interview Simulator",
    tag: "MongoDB · Express.js · React.js · Node.js · OpenAI API",
    desc: "Developed an AI-powered platform for HR and technical interview practice. Implemented JWT-based authentication and voice/text answer input.",
    features: ["AI-powered interview practice", "HR and technical rounds", "Voice/text answer input", "JWT-based authentication"],
    github: "https://github.com/Subaranjanibalasubramanian11/ai-interview-simulator",
  },
  {
    title: "Guvi Auth System",
    tag: "HTML · CSS · JS · MongoDB · Redis · MySQL",
    desc: "Developed user registration, login, and profile management system. Implemented secure authentication with MySQL integration and designed responsive UI.",
    features: ["User registration & login", "Database integration (MySQL)", "Secure authentication", "Responsive frontend"],
    github: "https://github.com/Subaranjanibalasubramanian11/internship-project",
  },
];

export default function Projects() {
  const [selected,   setSelected]   = useState(null);
  const sectionRef  = useRef(null);
  const cardsRef    = useRef([]);
  const detailRef   = useRef(null);

  /* Slide-in cards on scroll */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-heading", {
        opacity: 0, y: 30, duration: 0.6,
        scrollTrigger: { trigger: ".proj-heading", start: "top 85%" },
      });

      cardsRef.current.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
          delay: i * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Animate detail panel in */
  const openProject = (proj) => {
    setSelected(proj);
    setTimeout(() => {
      if (detailRef.current) {
        gsap.fromTo(
          detailRef.current,
          { opacity: 0, y: 30, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
        );
        detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 10);
  };

  const closeProject = () => {
    if (detailRef.current) {
      gsap.to(detailRef.current, {
        opacity: 0, y: 20, duration: 0.3, ease: "power2.in",
        onComplete: () => setSelected(null),
      });
    } else {
      setSelected(null);
    }
  };

  return (
    <section id="projects" ref={sectionRef}>
      <div className="proj-heading">
        <p className="section-label">What I've Built</p>
        <h2 className="section-title">My <span>Projects</span></h2>
      </div>

      <div className="project-grid">
        {PROJECTS.map((proj, i) => (
          <div
            key={i}
            ref={el => (cardsRef.current[i] = el)}
            className={`project-card${selected?.title === proj.title ? " active" : ""}`}
            onClick={() => openProject(proj)}
          >
            {proj.badge && <span className="proj-badge">{proj.badge}</span>}
            <p className="proj-num">0{i + 1}</p>
            <h3 className="proj-title">{proj.title}</h3>
            <p className="proj-tag">{proj.tag}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <p className="proj-hint" style={{ margin: 0 }}>
                Click to view details <span className="proj-hint-arrow">↗</span>
              </p>
              <a 
                href={proj.github} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary" 
                style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={16} style={{ marginRight: '6px' }} /> Repository
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="project-details" ref={detailRef}>
          <div className="proj-detail-header">
            <div>
              <h3 className="proj-detail-title">{selected.title}</h3>
              <span className="proj-detail-tag">{selected.tag}</span>
            </div>
            <button className="proj-close" onClick={closeProject}>✕ Close</button>
          </div>

          <div className="proj-detail-body">
            <div className="proj-detail-left" style={{ borderRight: 'none', paddingRight: 0 }}>
              <p className="proj-sub">About</p>
              <p className="proj-desc">{selected.desc}</p>

              <p className="proj-sub">Features</p>
              <div className="proj-features">
                {selected.features.map((f, i) => (
                  <div className="proj-feature-item" key={i}>
                    <span className="feat-dot" /> {f}
                  </div>
                ))}
              </div>

              <a
                href={selected.github}
                target="_blank"
                rel="noreferrer"
                className="proj-github-btn"
                style={{ display: 'inline-flex', marginTop: '24px' }}
              >
                <FaGithub size={16} style={{ marginRight: '6px' }} /> View Repository
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
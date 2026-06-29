import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHeart, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const ENQUIRY_OPTIONS = [
  "General Enquiry",
  "Job Opportunity",
  "Project Collaboration",
  "Freelance Work",
  "Internship Offer",
  "Tech Discussion",
  "Other",
];

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef    = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", type: "General Enquiry", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields before sending.");
      return;
    }
    // Build mailto link → opens email client pre-filled, sends to portfolio owner
    const subject = encodeURIComponent(`[Portfolio] ${form.type} from ${form.name}`);
    const body    = encodeURIComponent(
      `Hi Subaranjani,\n\nYou have a new message from your portfolio:\n\n` +
      `Name   : ${form.name}\nEmail  : ${form.email}\nType   : ${form.type}\n\nMessage:\n${form.message}\n\n` +
      `---\nThis message was sent via your portfolio contact form.`
    );
    window.location.href = `mailto:subaranjani1111@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ name: "", email: "", type: "General Enquiry", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-heading", {
        opacity: 0, y: 30, duration: 0.6,
        scrollTrigger: { trigger: ".contact-heading", start: "top 85%" },
      });
      gsap.from(".contact-intro", {
        opacity: 0, y: 20, duration: 0.5, delay: 0.15,
        scrollTrigger: { trigger: ".contact-intro", start: "top 88%" },
      });
      gsap.from(formRef.current, {
        opacity: 0, y: 30, duration: 0.6, delay: 0.3,
        scrollTrigger: { trigger: formRef.current, start: "top 85%" },
      });
      gsap.from(".contact-socials", {
        opacity: 0, y: 20, duration: 0.5, delay: 0.4,
        scrollTrigger: { trigger: ".contact-socials", start: "top 90%" },
      });
      gsap.from(".contact-footer", {
        opacity: 0, y: 16, duration: 0.5,
        scrollTrigger: { trigger: ".contact-footer", start: "top 95%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const inputStyle = {
    padding: '12px 14px', borderRadius: '10px',
    border: '1.5px solid rgba(124,58,237,0.18)',
    background: 'rgba(255,255,255,0.50)',
    color: '#1a0533', outline: 'none',
    fontSize: '14px', fontWeight: '500',
    width: '100%', fontFamily: 'inherit',
    transition: 'border-color .2s',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section"
      style={{ padding: '80px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* Heading */}
      <div className="contact-heading" style={{ textAlign: 'center', marginBottom: '12px' }}>
        <p className="section-label">Let's Connect</p>
        <h2 className="section-title">Get in <span>Touch</span></h2>
      </div>

      <p className="contact-intro" style={{ textAlign: 'center', marginBottom: '36px', maxWidth: '540px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
        I'm always open to new opportunities and collaborations.
        Fill out the form below and I'll get back to you as soon as possible!
      </p>

      {/* Contact Form Card */}
      <div
        ref={formRef}
        className="glass-card"
        style={{ width: '100%', maxWidth: '540px', padding: '36px 32px', borderRadius: '20px' }}
      >
        <h3 style={{ marginBottom: '24px', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          ✉️ Send a Message
        </h3>

        {/* Success Banner */}
        {sent && (
          <div style={{
            background: 'rgba(124,58,237,0.10)', border: '1.5px solid rgba(124,58,237,0.30)',
            borderRadius: '10px', padding: '12px 16px', marginBottom: '20px',
            color: 'var(--accent-1)', fontWeight: 700, fontSize: '14px',
          }}>
            ✅ Your email client opened! Send the email to complete your message.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Your Name *</label>
            <input
              name="name" type="text" placeholder="e.g. Priya Sharma"
              value={form.name} onChange={handleChange}
              style={inputStyle} required
            />
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Your Email *</label>
            <input
              name="email" type="email" placeholder="you@email.com"
              value={form.email} onChange={handleChange}
              style={inputStyle} required
            />
          </div>

          {/* Enquiry Type */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Enquiry Type</label>
            <select
              name="type" value={form.type} onChange={handleChange}
              style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.60)' }}
            >
              {ENQUIRY_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          {/* Message */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Message *</label>
            <textarea
              name="message" placeholder="Write your message here..."
              value={form.message} onChange={handleChange}
              rows={5} required
              style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: '6px', width: '100%', padding: '14px', justifyContent: 'center', fontSize: '15px' }}
          >
            <FaEnvelope /> Send Message
          </button>
        </form>

        {/* Direct email */}
        <div style={{
          marginTop: '22px', textAlign: 'center', paddingTop: '18px',
          borderTop: '1px solid rgba(124,58,237,0.12)',
        }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Or reach me directly:</p>
          <a href="mailto:subaranjani1111@gmail.com" style={{ color: 'var(--accent-1)', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>
            subaranjani1111@gmail.com
          </a>
        </div>
      </div>

      {/* Social links */}
      <div
        className="contact-socials"
        style={{ marginTop: '28px', display: 'flex', gap: '14px', justifyContent: 'center', width: '100%', maxWidth: '540px', flexWrap: 'wrap' }}
      >
        <a href="https://github.com/Subaranjanibalasubramanian11" target="_blank" rel="noreferrer" className="btn-outline" style={{ flex: '1 1 140px', justifyContent: 'center', minWidth: '120px' }}>
          <FaGithub /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/subaranjani-balasubramanian-7a6b9930a" target="_blank" rel="noreferrer" className="btn-outline" style={{ flex: '1 1 140px', justifyContent: 'center', minWidth: '120px' }}>
          <FaLinkedin /> LinkedIn
        </a>
        <a href="https://leetcode.com/u/Subaranjani_K_B/" target="_blank" rel="noreferrer" className="btn-outline" style={{ flex: '1 1 140px', justifyContent: 'center', minWidth: '120px' }}>
          <SiLeetcode /> LeetCode
        </a>
      </div>

      {/* Footer */}
      <div className="contact-footer" style={{ marginTop: '56px', color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
        Made with <FaHeart color="#ef4444" style={{ display: 'inline-block', transform: 'translateY(2px)' }} /> by <span style={{ fontWeight: 700, color: 'var(--accent-1)' }}>Subaranjani K B</span> · 2026
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { profile, socials } from "@/lib/data";

export default function Contact() {
  const { ref, inView } = useReveal();

  return (
    <section id="contact" style={{ position: "relative" }}>
      <style>{`
        .contact-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(80px, 12vw, 140px) clamp(20px, 5vw, 60px);
        }

        .contact-box {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border);
          padding: clamp(40px, 8vw, 96px) clamp(28px, 6vw, 80px);
        }

        .contact-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--accent), transparent 60%);
        }

        .contact-box::after {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, var(--accent), transparent 60%);
        }

        .contact-section-tag {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
        }

        .contact-section-tag::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: var(--accent);
        }

        .contact-title {
          font-family: var(--display);
          font-weight: 800;
          font-size: clamp(44px, 9vw, 108px);
          line-height: 0.92;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin-bottom: 32px;
        }

        .contact-title-ghost {
          display: block;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(200,241,53,0.35);
        }

        .contact-body {
          font-family: var(--display);
          font-size: clamp(14px, 1.6vw, 17px);
          color: var(--muted);
          line-height: 1.75;
          max-width: 440px;
          margin-bottom: 48px;
        }

        .contact-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
        }

        .contact-email-btn {
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--bg);
          background: var(--accent);
          padding: 14px 28px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: box-shadow 0.3s, transform 0.2s;
          white-space: nowrap;
        }

        .contact-email-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: var(--accent2);
          transform: translateX(-105%);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .contact-email-btn:hover {
          box-shadow: 0 0 40px rgba(200,241,53,0.35);
          transform: translateY(-2px);
        }

        .contact-email-btn:hover::after { transform: translateX(0); }
        .contact-email-btn span { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; }

        .contact-socials {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          align-items: center;
          padding-left: 8px;
        }

        .contact-social-link {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.25s;
        }

        .contact-social-link::before {
          content: '';
          display: block;
          width: 14px;
          height: 1px;
          background: currentColor;
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          flex-shrink: 0;
        }

        .contact-social-link:hover { color: var(--accent); }
        .contact-social-link:hover::before { width: 24px; }

        .contact-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 80px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }

        .contact-footer-copy {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .contact-footer-back {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.25s;
        }

        .contact-footer-back:hover { color: var(--accent); }

        .contact-deco-num {
          position: absolute;
          bottom: clamp(28px, 6vw, 48px);
          right: clamp(28px, 6vw, 60px);
          font-family: var(--mono);
          font-weight: 700;
          font-size: clamp(80px, 14vw, 180px);
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(200,241,53,0.07);
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.05em;
        }
      `}</style>

      <div className="contact-wrap">
        <div ref={ref} className="contact-box">
          <div style={{
            position: "absolute", top: "-15%", right: "-8%",
            width: "min(480px, 60vw)", height: "min(480px, 60vw)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,241,53,0.09) 0%, transparent 70%)",
            filter: "blur(70px)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "-10%", left: "-5%",
            width: "min(320px, 45vw)", height: "min(320px, 45vw)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)",
            filter: "blur(60px)", pointerEvents: "none",
          }} />

          <div className="contact-deco-num">04</div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div
              className="contact-section-tag"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              04 / Contact
            </motion.div>

            <motion.h2
              className="contact-title"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Got a project
              <span className="contact-title-ghost">in mind?</span>
            </motion.h2>

            <motion.p
              className="contact-body"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              Always open buat peluang baru. Mau product, startup, atau side project yang seru — drop a line, gw bales.
            </motion.p>

            <motion.div
              className="contact-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href={`mailto:${profile.email}`} className="contact-email-btn">
                <span>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {profile.email}
                </span>
              </a>

              <div className="contact-socials">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="contact-footer"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="contact-footer-copy">
                © {new Date().getFullYear()} {profile.name} — Built with Next.js
              </span>
              <a href="#" className="contact-footer-back">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 9V1M1 5l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to top
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
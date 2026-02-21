"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile, socials } from "@/lib/data";

const ROLES = ["Fullstack", "Designer", "Builder", "Creator"];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (display.length < current.length) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pause);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, wordIdx, words, speed, pause]);

  return display;
}

export default function Hero() {
  const role = useTypewriter(ROLES);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(88px, 14vh, 140px) clamp(20px, 5vw, 60px) 80px",
        maxWidth: "1200px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <style>{`
        .hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(240,236,228,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240,236,228,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%);
          pointer-events: none;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          padding: 6px 12px;
          border: 1px solid rgba(200,241,53,0.25);
          background: rgba(200,241,53,0.05);
          margin-bottom: 32px;
          width: fit-content;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        .hero-name {
          font-family: var(--display);
          font-weight: 800;
          font-size: clamp(38px, 10.5vw, 110px);
          line-height: 0.93;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin-bottom: 6px;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .hero-lastname {
          font-family: var(--display);
          font-weight: 800;
          font-size: clamp(38px, 10.5vw, 110px);
          line-height: 0.93;
          letter-spacing: -0.03em;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(240,236,228,0.18);
          margin-bottom: 14px;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .hero-typewriter-line {
          font-family: var(--display);
          font-weight: 800;
          font-size: clamp(38px, 10.5vw, 110px);
          line-height: 0.93;
          letter-spacing: -0.03em;
          color: var(--accent);
          margin-bottom: 44px;
          display: flex;
          align-items: baseline;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .typewriter-cursor {
          display: inline-block;
          width: 3px;
          height: 0.75em;
          background: var(--accent);
          margin-left: 5px;
          vertical-align: baseline;
          flex-shrink: 0;
          animation: blink 0.9s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-bio {
          font-family: var(--display);
          font-size: clamp(14px, 1.6vw, 17px);
          line-height: 1.75;
          color: var(--muted);
          max-width: 480px;
          margin-bottom: 44px;
        }

        .cta-primary {
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--bg);
          background: var(--accent);
          padding: 14px 28px;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s, transform 0.2s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          text-decoration: none;
          display: inline-block;
          white-space: nowrap;
        }

        .cta-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent2);
          transform: translateX(-105%);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .cta-primary:hover { box-shadow: 0 0 32px rgba(200,241,53,0.4); transform: translateY(-2px); }
        .cta-primary:hover::after { transform: translateX(0); }
        .cta-primary span { position: relative; z-index: 1; }

        .cta-secondary {
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink);
          padding: 13px 28px;
          border: 1px solid var(--border);
          text-decoration: none;
          display: inline-block;
          transition: border-color 0.3s;
          white-space: nowrap;
        }

        .cta-secondary:hover { border-color: rgba(240,236,228,0.5); }

        .social-link {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.25s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .social-link::before {
          content: '';
          display: block;
          width: 16px;
          height: 1px;
          background: currentColor;
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          flex-shrink: 0;
        }

        .social-link:hover { color: var(--accent); }
        .social-link:hover::before { width: 28px; }

        .stat-item { display: flex; flex-direction: column; gap: 4px; }

        .stat-num {
          font-family: var(--mono);
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 700;
          color: var(--ink);
          line-height: 1;
        }

        .stat-num span { color: var(--accent); }

        .stat-label {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 32px;
          right: clamp(20px, 5vw, 60px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .scroll-text {
          font-family: var(--mono);
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          writing-mode: vertical-rl;
        }

        @media (max-width: 640px) {
          .stats-row { display: none !important; }
          .scroll-indicator { display: none !important; }
          .hero-bio { margin-bottom: 36px; }
        }
      `}</style>

      <div className="hero-grid-bg" />

      <div style={{
        position: "absolute", top: "20%", right: "-5%",
        width: "min(500px, 60vw)", height: "min(500px, 60vw)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,241,53,0.1) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", left: "-8%",
        width: "min(360px, 50vw)", height: "min(360px, 50vw)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <motion.div style={{ y, opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-tag">
            <span className="status-dot" />
            {profile.available ? "Available for work" : "Currently busy"}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="hero-name">{profile.name.split(" ")[0]}</h1>
          <div className="hero-lastname">{profile.name.split(" ")[1] ?? "Portfolio"}</div>
          <div className="hero-typewriter-line">
            {role}
            <span className="typewriter-cursor" />
          </div>
        </motion.div>

        <motion.p
          className="hero-bio"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {profile.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "44px" }}
        >
          <a href="#work" className="cta-primary"><span>View Work</span></a>
          <a href={`mailto:${profile.email}`} className="cta-secondary">Get in Touch</a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.44 }}
          style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}
        >
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-link">
              {s.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          className="stats-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: "flex", gap: "40px", flexWrap: "wrap",
            marginTop: "56px", paddingTop: "28px",
            borderTop: "1px solid var(--border)",
          }}
        >
          {[
            { num: "3", suffix: "yr", label: "Experience" },
            { num: "20", suffix: "+", label: "Projects Built" },
            { num: "∞", suffix: "", label: "Caffeine Consumed" },
          ].map((s) => (
            <div key={s.label} className="stat-item">
              <div className="stat-num">{s.num}<span>{s.suffix}</span></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="scroll-indicator">
        <motion.div
          animate={{ scaleY: [1, 0.25, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{
            width: 1, height: 56,
            background: "linear-gradient(to bottom, var(--accent), transparent)",
            transformOrigin: "top",
          }}
        />
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  );
}
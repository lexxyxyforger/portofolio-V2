"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { profile } from "@/lib/data";

const links = [
  { label: "Work", href: "#work", num: "01" },
  { label: "About", href: "#about", num: "02" },
  { label: "Contact", href: "#contact", num: "03" },
];

const glitchVariants = {
  rest: { x: 0, opacity: 1 },
  glitch: {
    x: [0, -2, 2, -1, 0],
    opacity: [1, 0.8, 1, 0.9, 1],
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [logoGlitch, setLogoGlitch] = useState(false);
  const [time, setTime] = useState("");
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const triggerGlitch = () => {
    setLogoGlitch(true);
    setTimeout(() => setLogoGlitch(false), 400);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;500;600;700;800&display=swap');

        :root {
          --bg: #080808;
          --bg2: #0f0f0f;
          --ink: #f0ece4;
          --muted: #6b6560;
          --accent: #c8f135;
          --accent2: #ff6b35;
          --border: rgba(240,236,228,0.08);
          --glass: rgba(15,15,15,0.75);
          --mono: 'Space Mono', monospace;
          --display: 'Syne', sans-serif;
        }

        .nav-link-wrap {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .nav-link-inner {
          display: flex;
          flex-direction: column;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav-link-wrap:hover .nav-link-inner {
          transform: translateY(-50%);
        }

        .nav-link-text {
          display: block;
          height: 1.5em;
          line-height: 1.5em;
          font-family: var(--display);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          transition: color 0.3s;
        }

        .nav-link-wrap:hover .nav-link-text {
          color: var(--ink);
        }

        .hire-btn {
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--bg);
          background: var(--accent);
          padding: 8px 18px;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }

        .hire-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent2);
          transform: translateX(-105%);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hire-btn:hover::before { transform: translateX(0); }
        .hire-btn:hover { box-shadow: 0 0 24px rgba(200,241,53,0.35); transform: translateY(-1px); }
        .hire-btn span { position: relative; z-index: 1; }

        .menu-line {
          display: block;
          height: 1.5px;
          background: var(--ink);
          transform-origin: center;
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          z-index: 39;
          pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
        }

        .mobile-link {
          font-family: var(--display);
          font-size: clamp(52px, 14vw, 80px);
          font-weight: 800;
          line-height: 0.95;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(240,236,228,0.2);
          transition: -webkit-text-stroke 0.3s, color 0.3s;
          text-transform: uppercase;
          letter-spacing: -0.03em;
        }

        .mobile-link:hover {
          color: var(--accent);
          -webkit-text-stroke: 1.5px var(--accent);
        }

        .ticker-text {
          display: inline-flex;
          gap: 48px;
          animation: ticker 18s linear infinite;
          white-space: nowrap;
        }

        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .glitch-logo {
          position: relative;
          font-family: var(--display);
          font-size: 20px;
          font-weight: 800;
          color: var(--ink);
          cursor: pointer;
          user-select: none;
        }

        .glitch-logo::before,
        .glitch-logo::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          opacity: 0;
        }

        .glitch-logo.active::before {
          opacity: 0.8;
          color: var(--accent2);
          clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
          transform: translateX(-3px);
          animation: glitch1 0.3s steps(1) forwards;
        }

        .glitch-logo.active::after {
          opacity: 0.8;
          color: var(--accent);
          clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%);
          transform: translateX(3px);
          animation: glitch2 0.3s steps(1) forwards;
        }

        @keyframes glitch1 {
          0% { transform: translateX(-3px); opacity: 0.8; }
          33% { transform: translateX(2px); }
          66% { transform: translateX(-1px); }
          100% { transform: translateX(0); opacity: 0; }
        }

        @keyframes glitch2 {
          0% { transform: translateX(3px); opacity: 0.8; }
          33% { transform: translateX(-2px); }
          66% { transform: translateX(1px); }
          100% { transform: translateX(0); opacity: 0; }
        }
      `}</style>

      <div className="noise-overlay" />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          background: scrolled ? "var(--glass)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        }}
      >
        {scrolled && (
          <div style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: 0.6,
            position: "absolute",
            bottom: -1, left: 0, right: 0,
          }} />
        )}

        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}>
          <Link href="/" onClick={triggerGlitch}>
            <span
              className={`glitch-logo${logoGlitch ? " active" : ""}`}
              data-text={profile.name.split(" ")[0]}
            >
              {profile.name.split(" ")[0]}
              <span style={{ color: "var(--accent)" }}>.</span>
            </span>
          </Link>

          <div style={{
            display: "none",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--mono)",
            fontSize: "10px",
            color: "var(--muted)",
            letterSpacing: "0.05em",
          }} className="time-display">
            <div className="status-dot" />
            <span>{time}</span>
          </div>

          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }} className="desktop-nav">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link-wrap"
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{ textDecoration: "none", height: "1.5em", display: "block" }}
              >
                <div className="nav-link-inner">
                  <span className="nav-link-text">{link.label}</span>
                  <span className="nav-link-text" style={{ color: "var(--accent)", fontFamily: "var(--mono)" }}>
                    /{link.num}
                  </span>
                </div>
              </a>
            ))}

            <a href={`mailto:${profile.email}`} className="hire-btn">
              <span>Hire Me</span>
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "none", flexDirection: "column", gap: "5px",
              padding: "8px", marginRight: "-8px",
            }}
            className="mobile-menu-btn"
          >
            <motion.span
              className="menu-line"
              animate={{ width: menuOpen ? "20px" : "20px", rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "block", width: "20px" }}
            />
            <motion.span
              className="menu-line"
              animate={{ opacity: menuOpen ? 0 : 1, width: menuOpen ? "0px" : "14px" }}
              transition={{ duration: 0.2 }}
              style={{ display: "block", width: "14px" }}
            />
            <motion.span
              className="menu-line"
              animate={{ width: menuOpen ? "20px" : "20px", rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "block", width: "20px" }}
            />
          </button>
        </div>

        {!scrolled && (
          <div style={{
            borderTop: "1px solid var(--border)",
            overflow: "hidden",
            height: "28px",
            display: "flex",
            alignItems: "center",
          }}>
            <div className="ticker-text" style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {Array(6).fill(null).map((_, i) => (
                <span key={i}>
                  Available for work&nbsp;&nbsp;✦&nbsp;&nbsp;
                  Open to collab&nbsp;&nbsp;✦&nbsp;&nbsp;
                  Based in Earth&nbsp;&nbsp;✦&nbsp;&nbsp;
                  Let&apos;s build something&nbsp;&nbsp;✦&nbsp;&nbsp;
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.header>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .time-display { display: flex !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "var(--bg)",
              display: "flex", flexDirection: "column",
              justifyContent: "flex-end",
              padding: "100px 32px 48px",
            }}
          >
            <div style={{
              position: "absolute", top: "20%", right: "10%",
              fontFamily: "var(--mono)", fontSize: "10px",
              color: "var(--muted)", letterSpacing: "0.1em",
              writingMode: "vertical-rl", textTransform: "uppercase",
              opacity: 0.4,
            }}>
              {time}
            </div>

            <div style={{
              position: "absolute", top: "15%", left: "32px",
              fontFamily: "var(--mono)", fontSize: "9px",
              color: "var(--muted)", letterSpacing: "0.15em",
              textTransform: "uppercase", opacity: 0.5,
            }}>
              Navigation
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.08 + 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "flex", alignItems: "baseline", gap: "16px" }}
                >
                  <span style={{
                    fontFamily: "var(--mono)", fontSize: "10px",
                    color: "var(--accent)", opacity: 0.7, letterSpacing: "0.1em",
                  }}>
                    {link.num}
                  </span>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="mobile-link"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              style={{
                marginTop: "40px", paddingTop: "24px",
                borderTop: "1px solid var(--border)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}
            >
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setMenuOpen(false)}
                style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)", textDecoration: "none", letterSpacing: "0.05em" }}
              >
                {profile.email}
              </a>
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <div className="status-dot" />
                <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Available
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
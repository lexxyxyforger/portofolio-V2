"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { profile } from "@/lib/data";

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "Prisma", "Redis", "REST & GraphQL"] },
  { category: "Tools & Vibes", items: ["Figma", "Git", "Docker", "Vercel", "VS Code"] },
];

const experience = [
  { company: "Startup XYZ", role: "Frontend Engineer Intern", period: "2024", desc: "Built dashboard UI from scratch, shipped 3 features to prod." },
  { company: "Freelance", role: "Fullstack Dev", period: "2023–now", desc: "Worked with 10+ clients on landing pages, SaaS MVPs, and e-commerce." },
  { company: "Open Source", role: "Contributor", period: "2022–now", desc: "PRs merged on several community React projects and UI libs." },
];

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

export default function About() {
  const { ref: titleRef, inView: titleInView } = useReveal();
  const { ref: leftRef, inView: leftInView } = useReveal();
  const { ref: rightRef, inView: rightInView } = useReveal();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ position: "relative", overflow: "hidden", background: "var(--bg)" }}
    >
      <style>{`
        .about-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(200,241,53,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,241,53,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .about-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(80px, 12vw, 140px) clamp(20px, 5vw, 60px);
          position: relative;
          z-index: 1;
        }

        .about-section-tag {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .about-section-tag::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: var(--accent);
        }

        .about-title {
          font-family: var(--display);
          font-weight: 800;
          font-size: clamp(42px, 7vw, 88px);
          line-height: 0.93;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin-bottom: 72px;
        }

        .about-title-ghost {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(200,241,53,0.35);
          display: block;
        }

        .about-grid {
          display: grid;
          gap: 20px;
        }

        @media (min-width: 768px) {
          .about-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
        }

        .acard {
          background: rgba(255,255,255,0.025);
          border: 1px solid var(--border);
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, background 0.3s;
        }

        .acard::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,241,53,0.3), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .acard:hover { border-color: rgba(200,241,53,0.2); background: rgba(200,241,53,0.02); }
        .acard:hover::before { opacity: 1; }

        .acard-label {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .acard-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .bio-text {
          font-family: var(--display);
          font-size: clamp(14px, 1.5vw, 16px);
          color: var(--muted);
          line-height: 1.8;
        }

        .bio-highlight {
          color: var(--ink);
          font-weight: 700;
          position: relative;
        }

        .bio-highlight::after {
          content: '';
          position: absolute;
          bottom: 1px; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          opacity: 0.6;
        }

        .stat-row {
          display: flex;
          gap: 1px;
          margin-top: 20px;
          border: 1px solid var(--border);
          overflow: hidden;
        }

        .stat-cell {
          flex: 1;
          padding: 14px 12px;
          text-align: center;
          border-right: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          transition: background 0.25s;
        }

        .stat-cell:last-child { border-right: none; }
        .stat-cell:hover { background: rgba(200,241,53,0.04); }

        .stat-cell-num {
          font-family: var(--mono);
          font-size: 22px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1;
        }

        .stat-cell-num span { color: var(--accent); }

        .stat-cell-label {
          font-family: var(--mono);
          font-size: 8px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 4px;
        }

        .exp-row {
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
          transition: all 0.2s;
          cursor: default;
        }

        .exp-row:first-child { padding-top: 0; }
        .exp-row:last-child { border-bottom: none; padding-bottom: 0; }
        .exp-row:hover { padding-left: 6px; }

        .exp-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3px;
        }

        .exp-company {
          font-family: var(--display);
          font-weight: 700;
          font-size: 14px;
          color: var(--ink);
          transition: color 0.2s;
        }

        .exp-row:hover .exp-company { color: var(--accent); }

        .exp-period {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          color: var(--accent);
          border: 1px solid rgba(200,241,53,0.2);
          padding: 2px 7px;
          background: rgba(200,241,53,0.05);
        }

        .exp-role {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--accent2);
          margin-bottom: 4px;
          text-transform: uppercase;
        }

        .exp-desc {
          font-family: var(--display);
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
        }

        .skill-tag {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 6px 14px;
          border: 1px solid var(--border);
          color: var(--muted);
          background: transparent;
          cursor: default;
          transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
          white-space: nowrap;
        }

        .skill-tag:hover, .skill-tag.active {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(200,241,53,0.06);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(200,241,53,0.12);
        }

        .avail-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          border: 1px solid rgba(200,241,53,0.25);
          background: rgba(200,241,53,0.05);
          padding: 5px 12px;
          margin-bottom: 14px;
          width: fit-content;
        }

        .avail-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        .avail-title {
          font-family: var(--display);
          font-weight: 800;
          font-size: clamp(20px, 3vw, 26px);
          color: var(--ink);
          margin-bottom: 8px;
          line-height: 1.1;
        }

        .avail-body {
          font-family: var(--display);
          font-size: 14px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .avail-cta {
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--bg);
          background: var(--accent);
          padding: 12px 24px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transition: box-shadow 0.3s, transform 0.2s;
        }

        .avail-cta::after {
          content: '';
          position: absolute; inset: 0;
          background: var(--accent2);
          transform: translateX(-105%);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .avail-cta:hover { box-shadow: 0 0 28px rgba(200,241,53,0.35); transform: translateY(-2px); }
        .avail-cta:hover::after { transform: translateX(0); }
        .avail-cta span { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }

        .tag-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
      `}</style>

      <div className="about-grid-bg" />

      <motion.div
        style={{
          position: "absolute", top: "-10%", left: "-5%",
          width: "min(500px, 60vw)", height: "min(500px, 60vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,241,53,0.08) 0%, transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
        }}
        animate={{ x: mousePos.x * 0.04 + "%", y: mousePos.y * 0.03 + "%" }}
        transition={{ type: "spring", damping: 40, stiffness: 60 }}
      />
      <motion.div
        style={{
          position: "absolute", bottom: "0", right: "-5%",
          width: "min(400px, 50vw)", height: "min(400px, 50vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
        }}
        animate={{ x: -mousePos.x * 0.02 + "%", y: -mousePos.y * 0.02 + "%" }}
        transition={{ type: "spring", damping: 40, stiffness: 50 }}
      />

      <div className="about-wrap">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-section-tag">02 / About</div>
          <h2 className="about-title">
            Who I
            <span className="about-title-ghost"> Am.</span>
          </h2>
        </motion.div>

        <div className="about-grid">
          <div ref={leftRef} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <motion.div
              className="acard"
              initial={{ opacity: 0, y: 24 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="acard-label">Profile</div>
              <p className="bio-text">
                Gw <span className="bio-highlight">Full-Stack Developer</span> based in Jakarta yang obsess sama clean code, great DX, dan UI yang beneran berasa hidup.
              </p>
              <p className="bio-text" style={{ marginTop: "12px" }}>
                Mahasiswa yang nggak bisa pisah dari terminal, figma, dan kopi ☕. When I&apos;m not shipping — I&apos;m sketching, hiking, atau ngedown rabbit hole soal type design.
              </p>
              <div className="stat-row">
                {[
                  { num: "10", suffix: "+", label: "Clients" },
                  { num: "2", suffix: "+", label: "Years" },
                  { num: "30", suffix: "+", label: "Projects" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="stat-cell"
                    initial={{ opacity: 0, y: 10 }}
                    animate={leftInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                  >
                    <div className="stat-cell-num">{s.num}<span>{s.suffix}</span></div>
                    <div className="stat-cell-label">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="acard"
              initial={{ opacity: 0, y: 24 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="acard-label">Experience</div>
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  className="exp-row"
                  initial={{ opacity: 0, x: -16 }}
                  animate={leftInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <div className="exp-top">
                    <span className="exp-company">{exp.company}</span>
                    <span className="exp-period">{exp.period}</span>
                  </div>
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-desc">{exp.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div ref={rightRef} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {skills.map((group, gi) => (
              <motion.div
                key={group.category}
                className="acard"
                initial={{ opacity: 0, y: 24 }}
                animate={rightInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="acard-label">{group.category}</div>
                <div className="tag-wrap">
                  {group.items.map((item, ii) => (
                    <motion.span
                      key={item}
                      className={`skill-tag${hoveredSkill === item ? " active" : ""}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={rightInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: gi * 0.08 + ii * 0.05, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                      onMouseEnter={() => setHoveredSkill(item)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div
              className="acard"
              initial={{ opacity: 0, y: 24 }}
              animate={rightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderColor: "rgba(200,241,53,0.15)" }}
            >
              <div className="avail-badge">
                <span className="avail-dot" />
                Available Now
              </div>
              <div className="avail-title">Let&apos;s build something sick 🔥</div>
              <p className="avail-body">
                Open for full-time, freelance, dan kolaborasi project. Reach out dan cerita idenya!
              </p>
              <a href={`mailto:${profile.email}`} className="avail-cta">
                <span>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Kirim Pesan
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
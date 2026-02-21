"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { projects } from "@/lib/data";

function ProjectRow({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const { ref, inView } = useReveal<HTMLAnchorElement>();

  return (
    <motion.a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="project-row"
    >
      <motion.div
        className="project-row-bg"
        initial={{ opacity: 0, x: "-100%" }}
        whileHover={{ opacity: 1, x: "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <span className="project-index">{project.id}</span>

      <div className="project-body">
        <div className="project-title-row">
          <h3 className="project-title">{project.title}</h3>
          <span className="project-category">{project.category}</span>
        </div>
        <p className="project-desc">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="project-meta">
        <span className="project-year">{project.year}</span>
        <div className="project-arrow">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const { ref, inView } = useReveal<HTMLDivElement>();

  return (
    <section id="work" style={{ position: "relative" }}>
      <style>{`
        .projects-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(80px, 12vw, 140px) clamp(20px, 5vw, 60px);
        }

        .projects-header {
          display: flex;
          align-items: baseline;
          gap: 20px;
          margin-bottom: 64px;
        }

        .projects-num {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .projects-title {
          font-family: var(--display);
          font-weight: 800;
          font-size: clamp(36px, 6vw, 72px);
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: var(--ink);
        }

        .projects-title-ghost {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(200,241,53,0.3);
        }

        .projects-list {
          border-top: 1px solid var(--border);
        }

        .project-row {
          display: grid;
          grid-template-columns: 40px 1fr auto;
          gap: 24px;
          align-items: start;
          padding: 28px 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: padding-left 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .project-row:hover { padding-left: 12px; }

        .project-row-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(200,241,53,0.04) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .project-index {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--muted);
          padding-top: 6px;
          position: relative;
          z-index: 1;
          transition: color 0.25s;
        }

        .project-row:hover .project-index { color: var(--accent); }

        .project-body {
          position: relative;
          z-index: 1;
          min-width: 0;
        }

        .project-title-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .project-title {
          font-family: var(--display);
          font-weight: 800;
          font-size: clamp(20px, 3vw, 28px);
          letter-spacing: -0.02em;
          color: var(--ink);
          line-height: 1;
          transition: color 0.25s;
        }

        .project-row:hover .project-title { color: var(--accent); }

        .project-category {
          font-family: var(--mono);
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          border: 1px solid var(--border);
          padding: 3px 10px;
          transition: border-color 0.25s, color 0.25s;
        }

        .project-row:hover .project-category {
          border-color: rgba(200,241,53,0.3);
          color: var(--accent);
        }

        .project-desc {
          font-family: var(--display);
          font-size: clamp(13px, 1.4vw, 15px);
          color: var(--muted);
          line-height: 1.7;
          max-width: 520px;
          margin-bottom: 14px;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .project-tag {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          position: relative;
        }

        .project-tag::before {
          content: '#';
          opacity: 0.4;
          margin-right: 1px;
        }

        .project-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          position: relative;
          z-index: 1;
          padding-top: 4px;
        }

        .project-year {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        .project-arrow {
          width: 28px;
          height: 28px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          opacity: 0;
          transform: rotate(-45deg);
          transition: opacity 0.3s, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s, color 0.3s;
        }

        .project-row:hover .project-arrow {
          opacity: 1;
          transform: rotate(0deg);
          border-color: var(--accent);
          color: var(--accent);
        }

        @media (max-width: 540px) {
          .project-row {
            grid-template-columns: 32px 1fr;
            grid-template-rows: auto auto;
          }

          .project-meta {
            grid-column: 2;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding-top: 0;
            margin-top: 4px;
          }

          .project-arrow { opacity: 1; transform: rotate(0deg); }
        }
      `}</style>

      <div className="projects-wrap">
        <motion.div
          ref={ref}
          className="projects-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="projects-num">01 / Work</span>
          <h2 className="projects-title">
            Selected{" "}
            <span className="projects-title-ghost">Work.</span>
          </h2>
        </motion.div>

        <div className="projects-list">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
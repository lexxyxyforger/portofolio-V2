import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      className="px-5 sm:px-8 py-8 max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <p className="text-xs" style={{ color: "var(--color-muted)" }}>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p className="text-xs" style={{ color: "var(--color-muted)" }}>
        Next.js 15 · Tailwind v4 · Framer Motion · Lenis
      </p>
    </footer>
  );
}
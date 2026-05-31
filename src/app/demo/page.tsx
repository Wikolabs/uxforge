"use client";
import { useState } from "react";

const PRODUCT = "UXForge";

const PAL = {
  bg: "#FDF6E3",
  bg2: "#FAEFC9",
  surface: "rgba(0,0,0,0.035)",
  surfaceHover: "rgba(0,0,0,0.06)",
  border: "rgba(0,0,0,0.08)",
  txt1: "#1F1808",
  txt2: "#5A4A20",
  txt3: "#9A8A55",
  accent: "#B45309",
  accentSoft: "rgba(180,83,9,0.10)",
  accentBorder: "rgba(180,83,9,0.30)",
  accentGlow: "rgba(180,83,9,0.15)",
  navBg: "rgba(253,246,227,0.85)",
};

export default function DemoPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [product, setProduct] = useState("");
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [v3, setV3] = useState("");
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState("");
  const [model, setModel] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [staticMode, setStaticMode] = useState(false);

  const t = lang === "fr" ? {
    back: "Retour", title: "Demo", sub: PRODUCT + " — analyse de feedback utilisateurs + frictions",
    desc: "Collez 3 verbatims clients reels (ou ceux pre-remplis). L'agent IA cartographie les points de friction et propose des recommandations design. Aucune connexion reelle a Maze, Figma ou Typeform — c'est un POC qui montre la logique de production.",
    inputLabel: "Vos verbatims utilisateurs",
    plProduct: "Produit analyse (ex: app mobile banking)",
    plV1: "Verbatim #1 (collez un commentaire client)",
    plV2: "Verbatim #2",
    plV3: "Verbatim #3",
    generate: "Analyser les verbatims", generating: "Analyse en cours...",
    briefTitle: "Synthese UX research", emptyHint: "La synthese s'affiche ici une fois generee.",
    btnMaze: "Pousser dans Maze", btnFigma: "Exporter vers FigJam", btnJira: "Creer tickets Jira",
    mazeMock: "Pousse vers Maze (mode demo, pas de connexion reelle Maze)",
    figmaMock: "Export FigJam declenche (mode demo, pas de connexion reelle Figma)",
    jiraMock: "3 tickets Jira crees dans backlog PROD (mode demo, pas de connexion reelle)",
    fallback: "Mode statique : la cle LLM sera ajoutee au prochain deploiement.",
    poweredBy: "Modele :",
    note: "DEMO POC — aucune connexion reelle a Maze, Figma, Typeform, Hotjar. L'IA interprete les verbatims pour la demonstration.",
    samples: [
      "Je n'ai pas compris ce que faisait l'app pendant les 2 premieres minutes.",
      "J'ai cherche le bouton d'export pendant 5 minutes, il est cache dans un sous-menu.",
      "Le pricing est confus, je ne sais pas combien je vais payer si je depasse le quota.",
    ],
    btnSample: "Charger des exemples",
  } : {
    back: "Back", title: "Demo", sub: PRODUCT + " — user feedback analysis + frictions",
    desc: "Paste 3 real customer verbatims (or use pre-filled ones). The AI agent maps friction points and proposes design recommendations. No real connection to Maze, Figma or Typeform — this is a POC showing the production logic.",
    inputLabel: "Your user verbatims",
    plProduct: "Product analyzed (e.g. mobile banking app)",
    plV1: "Verbatim #1 (paste a customer comment)",
    plV2: "Verbatim #2",
    plV3: "Verbatim #3",
    generate: "Analyze verbatims", generating: "Analyzing...",
    briefTitle: "UX research synthesis", emptyHint: "The synthesis will appear here once generated.",
    btnMaze: "Push to Maze", btnFigma: "Export to FigJam", btnJira: "Create Jira tickets",
    mazeMock: "Pushed to Maze (demo mode, no real Maze connection)",
    figmaMock: "FigJam export triggered (demo mode, no real Figma connection)",
    jiraMock: "3 Jira tickets created in PROD backlog (demo mode, no real connection)",
    fallback: "Static mode: LLM key will be added at next deploy.",
    poweredBy: "Model:",
    note: "DEMO POC — no real connection to Maze, Figma, Typeform, Hotjar. The AI interprets verbatims for demonstration.",
    samples: [
      "I didn't understand what the app does for the first 2 minutes.",
      "I looked for the export button for 5 minutes, it's hidden in a sub-menu.",
      "Pricing is confusing, I don't know how much I'll pay if I exceed quota.",
    ],
    btnSample: "Load sample verbatims",
  };

  function loadSamples() {
    setV1(t.samples[0]);
    setV2(t.samples[1]);
    setV3(t.samples[2]);
  }

  async function generate() {
    setError(""); setBrief(""); setModel(""); setStaticMode(false);
    const verbatims = [v1, v2, v3].map((s) => s.trim()).filter(Boolean);
    if (!verbatims.length) {
      setError(lang === "fr" ? "Collez au moins 1 verbatim." : "Paste at least 1 verbatim.");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verbatims, product, lang }),
      });
      const j = await r.json();
      if (j.error === "llm_not_configured") {
        setBrief(j.mockBrief || "");
        setStaticMode(true);
      } else if (j.error) {
        setError(j.message || j.error);
      } else {
        setBrief(j.brief || "");
        setModel(j.model || "");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "unknown_error");
    } finally {
      setLoading(false);
    }
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3200);
  }

  return (
    <div style={{ minHeight: "100vh", background: PAL.bg, color: PAL.txt1, display: "flex", flexDirection: "column" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        .wk-input { width: 100%; padding: 12px 14px; border-radius: 10px; background: ${PAL.surface}; border: 1px solid ${PAL.border}; color: ${PAL.txt1}; font-family: inherit; font-size: 14px; transition: border-color .2s, background .2s; }
        .wk-input:focus { outline: none; border-color: ${PAL.accent}; background: ${PAL.surfaceHover}; }
        .wk-textarea { width: 100%; padding: 10px 12px; border-radius: 10px; background: ${PAL.surface}; border: 1px solid ${PAL.border}; color: ${PAL.txt1}; font-family: inherit; font-size: 13px; line-height: 1.5; resize: vertical; min-height: 60px; }
        .wk-textarea:focus { outline: none; border-color: ${PAL.accent}; background: ${PAL.surfaceHover}; }
        .wk-btn-primary { background: ${PAL.accent}; color: #FFFFFF; border: none; border-radius: 10px; padding: 13px 22px; font-weight: 700; font-size: 14px; cursor: pointer; font-family: inherit; transition: opacity .2s, transform .2s; display: inline-flex; align-items: center; gap: 8px; }
        .wk-btn-primary:hover { opacity: .9; transform: translateY(-1px); }
        .wk-btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }
        .wk-btn-ghost { background: ${PAL.surface}; color: ${PAL.txt1}; border: 1px solid ${PAL.border}; border-radius: 10px; padding: 9px 14px; font-weight: 600; font-size: 13px; cursor: pointer; font-family: inherit; transition: background .2s, border-color .2s; display: inline-flex; align-items: center; gap: 6px; }
        .wk-btn-ghost:hover { background: ${PAL.surfaceHover}; border-color: ${PAL.accentBorder}; }
        .wk-md p, .wk-md ul { margin: 0 0 10px; }
        .wk-md ul { padding-left: 18px; }
        .wk-md li { margin-bottom: 4px; line-height: 1.65; }
        .wk-md strong { color: ${PAL.accent}; font-weight: 700; display: block; margin-top: 10px; margin-bottom: 4px; font-size: 0.78rem; letter-spacing: 1.5px; text-transform: uppercase; }
        @media (max-width: 768px) {
          .demo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <nav style={{ padding: "16px 32px", borderBottom: `1px solid ${PAL.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: PAL.navBg, backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 10 }}>
        <a href="/" style={{ color: PAL.accent, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
          ← {t.back} {PRODUCT}<span style={{ color: PAL.accent }}>.</span>
        </a>
        <div style={{ display: "inline-flex", border: `1px solid ${PAL.border}`, borderRadius: 100, padding: 2, background: PAL.surface }}>
          <button onClick={() => setLang("fr")} style={{ background: lang === "fr" ? PAL.accent : "transparent", color: lang === "fr" ? "#FFFFFF" : PAL.txt2, border: "none", padding: "4px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", borderRadius: 100, fontFamily: "inherit" }}>FR</button>
          <button onClick={() => setLang("en")} style={{ background: lang === "en" ? PAL.accent : "transparent", color: lang === "en" ? "#FFFFFF" : PAL.txt2, border: "none", padding: "4px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", borderRadius: 100, fontFamily: "inherit" }}>EN</button>
        </div>
      </nav>

      <main style={{ flex: 1, padding: "32px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <h1 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, margin: "0 0 6px" }}>
          {t.title} · <em style={{ fontStyle: "italic", color: PAL.accent }}>{PRODUCT}</em>
        </h1>
        <p style={{ color: PAL.txt2, fontSize: "0.95rem", lineHeight: 1.65, maxWidth: 720, margin: "0 0 6px" }}>{t.sub}</p>
        <p style={{ color: PAL.txt3, fontSize: "0.78rem", lineHeight: 1.55, maxWidth: 720, margin: "0 0 28px" }}>{t.desc}</p>

        <div className="demo-grid" style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 24 }}>
          <section style={{ background: PAL.surface, border: `1px solid ${PAL.border}`, borderRadius: 16, padding: 22 }}>
            <h2 style={{ fontSize: "0.72rem", color: PAL.txt3, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: "0 0 14px" }}>{t.inputLabel}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
              <input className="wk-input" value={product} onChange={(e) => setProduct(e.target.value)} placeholder={t.plProduct} />
              <textarea className="wk-textarea" value={v1} onChange={(e) => setV1(e.target.value)} placeholder={t.plV1} />
              <textarea className="wk-textarea" value={v2} onChange={(e) => setV2(e.target.value)} placeholder={t.plV2} />
              <textarea className="wk-textarea" value={v3} onChange={(e) => setV3(e.target.value)} placeholder={t.plV3} />
            </div>
            <button className="wk-btn-ghost" onClick={loadSamples} style={{ width: "100%", justifyContent: "center", marginBottom: 10 }}>
              📋 {t.btnSample}
            </button>
            <button className="wk-btn-primary" disabled={loading} onClick={generate} style={{ width: "100%", justifyContent: "center" }}>
              {loading ? `⏳ ${t.generating}` : `🔍 ${t.generate}`}
            </button>
            {error && <div style={{ marginTop: 12, color: "#B91C1C", fontSize: 13, padding: "8px 12px", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 8 }}>{error}</div>}
            <p style={{ color: PAL.txt3, fontSize: 11, lineHeight: 1.5, marginTop: 18, marginBottom: 0, paddingTop: 14, borderTop: `1px solid ${PAL.border}` }}>{t.note}</p>
          </section>

          <section style={{ background: PAL.bg2, border: `1px solid ${PAL.border}`, borderRadius: 16, padding: 22, minHeight: 420, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: "0.72rem", color: PAL.txt3, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: brief ? "#16A34A" : PAL.txt3 }} />
                {t.briefTitle}
              </h2>
              {model && <span style={{ fontSize: 10, color: PAL.txt3, fontFamily: "monospace" }}>{t.poweredBy} {model}</span>}
            </div>

            {!brief ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: PAL.txt3, fontSize: 14, textAlign: "center", padding: 30 }}>
                {t.emptyHint}
              </div>
            ) : (
              <div className="wk-md" style={{ color: PAL.txt1, fontSize: 14, lineHeight: 1.7, flex: 1 }} dangerouslySetInnerHTML={{ __html: renderMarkdown(brief) }} />
            )}

            {brief && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18, paddingTop: 18, borderTop: `1px solid ${PAL.border}` }}>
                <button className="wk-btn-ghost" onClick={() => showToast(t.mazeMock)}>🧪 {t.btnMaze}</button>
                <button className="wk-btn-ghost" onClick={() => showToast(t.figmaMock)}>🎨 {t.btnFigma}</button>
                <button className="wk-btn-ghost" onClick={() => showToast(t.jiraMock)}>🎫 {t.btnJira}</button>
              </div>
            )}
            {staticMode && <div style={{ marginTop: 14, color: PAL.txt3, fontSize: 12, fontStyle: "italic" }}>{t.fallback}</div>}
          </section>
        </div>
      </main>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: PAL.bg, border: `1px solid ${PAL.accentBorder}`, borderRadius: 12, padding: "12px 20px", color: PAL.txt1, fontSize: 13, fontWeight: 600, zIndex: 50, backdropFilter: "blur(20px)", boxShadow: "0 8px 28px rgba(0,0,0,0.15)" }}>
          ✓ {toast}
        </div>
      )}
    </div>
  );
}

function renderMarkdown(md: string): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const blocks: string[] = [];
  let listBuf: string[] = [];
  const flushList = () => {
    if (listBuf.length) {
      blocks.push("<ul>" + listBuf.map((l) => `<li>${l}</li>`).join("") + "</ul>");
      listBuf = [];
    }
  };
  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (!line) { flushList(); continue; }
    if (line.startsWith("- ")) {
      listBuf.push(esc(line.slice(2)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"));
    } else if (line.startsWith("**") && line.endsWith("**")) {
      flushList();
      blocks.push(`<strong>${esc(line.slice(2, -2))}</strong>`);
    } else {
      flushList();
      blocks.push(`<p>${esc(line).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`);
    }
  }
  flushList();
  return blocks.join("");
}

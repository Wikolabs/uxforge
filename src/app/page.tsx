export default function UXForgePage() {
  return (
    <div style={{ fontFamily: "var(--font-body, 'Quicksand', sans-serif)", background: "#fff", color: "#1a1a2e" }}>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f3e8ff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #86198f, #a21caf)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 900 }}>U</span>
            </div>
            <span style={{ fontFamily: "var(--font-display, 'Paytone One', sans-serif)", fontWeight: 900, fontSize: 20, color: "#86198f", letterSpacing: "-0.5px" }}>UXForge</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ display: "flex", gap: 28 }}>
              {["Fonctionnalités", "Cas d'usage", "Tarifs"].map(link => (
                <a key={link} href="#" style={{ fontSize: 14, fontWeight: 600, color: "#6b21a8", textDecoration: "none", opacity: 0.8 }}>{link}</a>
              ))}
            </div>
            <a
              href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer"
              style={{ background: "#86198f", color: "#fff", padding: "9px 20px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 2px 12px rgba(134,25,143,0.35)" }}
            >
              Demander une démo
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "linear-gradient(160deg, #fdf4ff 0%, #f5f3ff 60%, #fff 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

            {/* Left: copy */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f3e8ff", border: "1px solid #d8b4fe", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#7e22ce" }}>✦ IA Research</span>
              </div>
              <h1 style={{ fontFamily: "var(--font-display, 'Paytone One', sans-serif)", fontSize: 52, fontWeight: 900, lineHeight: 1.1, color: "#1a1a2e", marginBottom: 20 }}>
                Analysez <span style={{ color: "#86198f" }}>1 000 retours</span><br />utilisateurs en<br />10 minutes
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: "#4b5563", marginBottom: 32, maxWidth: 460 }}>
                UXForge agrège vos feedbacks utilisateurs toutes sources confondues, détecte automatiquement les friction points et génère des recommandations UX priorisées — sans effort manuel.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a
                  href="https://calendly.com/wikolabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: "#86198f", color: "#fff", padding: "14px 28px", borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 20px rgba(134,25,143,0.4)", display: "inline-block" }}
                >
                  📅 Réserver un créneau →
                </a>
                <a
                  href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20UXForge%20avec%20Wikolabs."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: "#25d366", color: "#fff", padding: "14px 28px", borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: "none", display: "inline-block" }}
                >
                  💬 WhatsApp →
                </a>
                <a href="#" style={{ padding: "14px 24px", borderRadius: 12, fontSize: 15, fontWeight: 600, color: "#7e22ce", textDecoration: "none", border: "2px solid #d8b4fe", display: "inline-block" }}>
                  Voir une démo
                </a>
              </div>
              <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 14 }}>Sans carte bancaire • Analyse gratuite sur 100 feedbacks</p>
            </div>

            {/* Right: mockup dashboard */}
            <div style={{ position: "relative" }}>
              <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 48px rgba(134,25,143,0.18)", border: "1px solid #f3e8ff", overflow: "hidden", fontFamily: "monospace" }}>

                {/* Dashboard header */}
                <div style={{ background: "#86198f", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>UXForge — Analyse en cours</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["#ff5f57","#febc2e","#28c840"].map(c => (
                      <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>

                  {/* Left: feedback list */}
                  <div style={{ padding: "16px", borderRight: "1px solid #f3e8ff" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#7e22ce", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Feedbacks bruts</p>
                    {[
                      { emoji: "😤", tag: "Frustration", color: "#fce7f3", tagColor: "#be185d", text: "Je ne trouve jamais le bouton pour continuer..." },
                      { emoji: "😊", tag: "Satisfaction", color: "#f0fdf4", tagColor: "#15803d", text: "L'interface est claire et intuitive, top !" },
                      { emoji: "🤔", tag: "Confusion", color: "#fefce8", tagColor: "#a16207", text: "Pourquoi l'étape 3 demande encore mon adresse ?" },
                      { emoji: "😤", tag: "Frustration", color: "#fce7f3", tagColor: "#be185d", text: "Ça plante à chaque fois que je valide le formulaire." },
                      { emoji: "🤔", tag: "Confusion", color: "#fefce8", tagColor: "#a16207", text: "C'est pas clair du tout, je sais pas où cliquer." },
                    ].map((item, i) => (
                      <div key={i} style={{ marginBottom: 10, background: item.color, borderRadius: 8, padding: "8px 10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <span style={{ fontSize: 13 }}>{item.emoji}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: item.tagColor, background: "#fff", padding: "2px 7px", borderRadius: 10 }}>{item.tag}</span>
                        </div>
                        <p style={{ fontSize: 11, color: "#374151", margin: 0, lineHeight: 1.4 }}>{item.text}</p>
                      </div>
                    ))}
                    <p style={{ fontSize: 10, color: "#9ca3af", textAlign: "center", marginTop: 8 }}>+ 995 feedbacks analysés...</p>
                  </div>

                  {/* Right: chart + insight */}
                  <div style={{ padding: "16px" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#7e22ce", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Top Pain Points</p>
                    {[
                      { label: "CTA non visible", pct: 67, color: "#86198f" },
                      { label: "Étape 3 confuse", pct: 53, color: "#a21caf" },
                      { label: "Formulaire trop long", pct: 41, color: "#c026d3" },
                      { label: "Erreurs non expliquées", pct: 29, color: "#d946ef" },
                    ].map((bar, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: 10, color: "#374151", fontWeight: 600 }}>{bar.label}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: bar.color }}>{bar.pct}%</span>
                        </div>
                        <div style={{ background: "#f3e8ff", borderRadius: 4, height: 8, overflow: "hidden" }}>
                          <div style={{ width: `${bar.pct}%`, height: "100%", background: bar.color, borderRadius: 4 }} />
                        </div>
                      </div>
                    ))}

                    {/* Insight card */}
                    <div style={{ marginTop: 16, background: "linear-gradient(135deg, #86198f, #a21caf)", borderRadius: 10, padding: "12px 14px" }}>
                      <p style={{ fontSize: 9, fontWeight: 700, color: "#f5d0fe", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>✦ Insight prioritaire</p>
                      <p style={{ fontSize: 11, color: "#fff", lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
                        67% des utilisateurs abandonnent à l'étape 3 — bouton CTA non visible
                      </p>
                      <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                        <span style={{ fontSize: 9, background: "rgba(255,255,255,0.2)", color: "#fff", padding: "2px 8px", borderRadius: 8 }}>Impact: Critique</span>
                        <span style={{ fontSize: 9, background: "rgba(255,255,255,0.2)", color: "#fff", padding: "2px 8px", borderRadius: 8 }}>Effort: Faible</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div style={{ position: "absolute", bottom: -16, left: -16, background: "#fff", border: "2px solid #f3e8ff", borderRadius: 14, padding: "10px 16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#86198f", margin: 0 }}>⚡ 1 000 feedbacks</p>
                <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>analysés en 10 min</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: "#86198f", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, textAlign: "center" }}>
          {[
            { number: "1 000", label: "feedbacks analysés en 10 minutes", suffix: "" },
            { number: "67%", label: "des problèmes UX non détectés sans IA", suffix: "" },
            { number: "−80%", label: "de temps de recherche utilisateur", suffix: "" },
          ].map((stat, i) => (
            <div key={i}>
              <p style={{ fontFamily: "var(--font-display, 'Paytone One', sans-serif)", fontSize: 52, fontWeight: 900, color: "#fff", margin: "0 0 8px", lineHeight: 1 }}>{stat.number}</p>
              <p style={{ fontSize: 15, color: "#f5d0fe", lineHeight: 1.5, margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      {/* Feature 1 */}
      <section style={{ padding: "96px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "#f3e8ff", borderRadius: 12, padding: "10px 18px", marginBottom: 20 }}>
              <span style={{ fontSize: 28 }}>🔗</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display, 'Paytone One', sans-serif)", fontSize: 36, fontWeight: 900, color: "#1a1a2e", marginBottom: 16, lineHeight: 1.2 }}>
              Analyse de feedback<br /><span style={{ color: "#86198f" }}>multi-source</span>
            </h2>
            <p style={{ fontSize: 17, color: "#4b5563", lineHeight: 1.7, marginBottom: 24 }}>
              Connectez toutes vos sources de retours en quelques clics. UXForge ingère et normalise automatiquement les feedbacks issus de Typeform, Intercom, App Store et vos fichiers CSV.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {["Typeform & Google Forms", "Intercom & Zendesk", "App Store & Google Play reviews", "Import CSV / Excel"].map(item => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "#374151", fontWeight: 600 }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#f3e8ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#86198f", flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: "#fdf4ff", borderRadius: 20, padding: 32, border: "1px solid #f3e8ff" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#7e22ce", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>Sources connectées</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { name: "Typeform", icon: "📋", count: "342 réponses" },
                { name: "Intercom", icon: "💬", count: "278 tickets" },
                { name: "App Store", icon: "⭐", count: "189 avis" },
                { name: "CSV Import", icon: "📂", count: "191 lignes" },
              ].map(src => (
                <div key={src.name} style={{ background: "#fff", borderRadius: 12, padding: "16px", border: "1px solid #e9d5ff", display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 24 }}>{src.icon}</span>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{src.name}</p>
                  <p style={{ fontSize: 12, color: "#86198f", fontWeight: 600, margin: 0 }}>{src.count}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, background: "#86198f", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>Total analysé</span>
              <span style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>1 000 feedbacks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2 */}
      <section style={{ padding: "96px 24px", background: "#fdf4ff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1px solid #f3e8ff", boxShadow: "0 4px 24px rgba(134,25,143,0.08)" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#7e22ce", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>Carte de chaleur — Étape 3</p>
            <div style={{ background: "#f3e8ff", borderRadius: 12, height: 160, position: "relative", overflow: "hidden", marginBottom: 16 }}>
              {/* Heatmap simulation */}
              <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", width: 120, height: 40, background: "rgba(134,25,143,0.15)", borderRadius: 8, border: "2px dashed #86198f", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, color: "#86198f", fontWeight: 700 }}>Bouton CTA</span>
              </div>
              <div style={{ position: "absolute", top: 24, left: 20, width: 80, height: 14, background: "rgba(0,0,0,0.08)", borderRadius: 4 }} />
              <div style={{ position: "absolute", top: 48, left: 20, width: 60, height: 10, background: "rgba(0,0,0,0.05)", borderRadius: 4 }} />
              <div style={{ position: "absolute", top: 30, right: 30, width: 50, height: 50, borderRadius: "50%", background: "rgba(239,68,68,0.25)", filter: "blur(8px)" }} />
              <div style={{ position: "absolute", top: 50, left: 60, width: 30, height: 30, borderRadius: "50%", background: "rgba(239,68,68,0.15)", filter: "blur(6px)" }} />
              <div style={{ position: "absolute", top: 8, right: 8, background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 700, padding: "3px 7px", borderRadius: 6 }}>Zone froide</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { label: "Taux d'abandon étape 3", value: "67%", color: "#ef4444" },
                { label: "Clics sur CTA", value: "3,2%", color: "#86198f" },
              ].map(m => (
                <div key={m.label} style={{ flex: 1, background: "#fdf4ff", borderRadius: 10, padding: "12px", textAlign: "center" }}>
                  <p style={{ fontSize: 22, fontWeight: 900, color: m.color, margin: "0 0 4px" }}>{m.value}</p>
                  <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display: "inline-block", background: "#f3e8ff", borderRadius: 12, padding: "10px 18px", marginBottom: 20 }}>
              <span style={{ fontSize: 28 }}>🔥</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display, 'Paytone One', sans-serif)", fontSize: 36, fontWeight: 900, color: "#1a1a2e", marginBottom: 16, lineHeight: 1.2 }}>
              Détection automatique<br />des <span style={{ color: "#86198f" }}>friction points</span>
            </h2>
            <p style={{ fontSize: 17, color: "#4b5563", lineHeight: 1.7, marginBottom: 24 }}>
              UXForge corrèle les verbatims qualitatifs avec les données comportementales — session recordings et heatmaps — pour localiser précisément les points de blocage dans vos parcours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { title: "Corrélation session + verbatim", desc: "Chaque feedback lié à un moment précis du parcours" },
                { title: "Clustering thématique IA", desc: "Regroupement automatique des problèmes similaires" },
                { title: "Score de criticité", desc: "Priorisation par fréquence × impact business" },
              ].map(feat => (
                <div key={feat.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#f3e8ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 16, color: "#86198f" }}>◆</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: "0 0 2px" }}>{feat.title}</p>
                    <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3 */}
      <section style={{ padding: "96px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "#f3e8ff", borderRadius: 12, padding: "10px 18px", marginBottom: 20 }}>
              <span style={{ fontSize: 28 }}>🎯</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display, 'Paytone One', sans-serif)", fontSize: 36, fontWeight: 900, color: "#1a1a2e", marginBottom: 16, lineHeight: 1.2 }}>
              Recommandations<br /><span style={{ color: "#86198f" }}>actionnables IA</span>
            </h2>
            <p style={{ fontSize: 17, color: "#4b5563", lineHeight: 1.7, marginBottom: 24 }}>
              Plus de listes de bugs interminables. UXForge génère un plan de correction priorisé avec un scoring effort / impact pour chaque recommandation — prêt à partager avec votre équipe produit.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="https://calendly.com/wikolabs"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", background: "#86198f", color: "#fff", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px rgba(134,25,143,0.35)" }}
              >
                📅 Réserver un créneau →
              </a>
              <a
                href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20UXForge%20avec%20Wikolabs."
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", background: "#25d366", color: "#fff", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none" }}
              >
                💬 WhatsApp →
              </a>
            </div>
          </div>
          <div style={{ background: "#fdf4ff", borderRadius: 20, padding: 28, border: "1px solid #f3e8ff" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#7e22ce", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Plan de correction IA</p>
            {[
              { prio: "P1", title: "Rendre le CTA visible à l'étape 3", effort: "Faible", impact: "Critique", color: "#ef4444" },
              { prio: "P2", title: "Réduire le formulaire étape 3 à 3 champs", effort: "Moyen", impact: "Élevé", color: "#f97316" },
              { prio: "P3", title: "Ajouter une barre de progression", effort: "Faible", impact: "Moyen", color: "#eab308" },
              { prio: "P4", title: "Messages d'erreur explicites", effort: "Faible", impact: "Moyen", color: "#84cc16" },
            ].map(rec => (
              <div key={rec.prio} style={{ marginBottom: 12, background: "#fff", borderRadius: 12, padding: "14px 16px", border: "1px solid #f3e8ff", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: rec.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: "#fff" }}>{rec.prio}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", margin: "0 0 6px" }}>{rec.title}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: 11, background: "#f3e8ff", color: "#7e22ce", padding: "2px 8px", borderRadius: 8, fontWeight: 600 }}>Effort: {rec.effort}</span>
                    <span style={{ fontSize: 11, background: "#fce7f3", color: "#be185d", padding: "2px 8px", borderRadius: 8, fontWeight: 600 }}>Impact: {rec.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "96px 24px", background: "linear-gradient(135deg, #86198f 0%, #a21caf 50%, #6b21a8 100%)", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display, 'Paytone One', sans-serif)", fontSize: 44, fontWeight: 900, color: "#fff", marginBottom: 18, lineHeight: 1.15 }}>
            Prêt à comprendre vos utilisateurs 10× plus vite ?
          </h2>
          <p style={{ fontSize: 18, color: "#f5d0fe", lineHeight: 1.7, marginBottom: 36 }}>
            Connectez vos sources de feedback et obtenez votre premier rapport d'analyse UX en moins de 10 minutes.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://calendly.com/wikolabs"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", background: "#fff", color: "#86198f", padding: "16px 36px", borderRadius: 14, fontSize: 17, fontWeight: 800, textDecoration: "none", boxShadow: "0 6px 32px rgba(0,0,0,0.2)" }}
            >
              📅 Réserver un créneau →
            </a>
            <a
              href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20UXForge%20avec%20Wikolabs."
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", background: "#25d366", color: "#fff", padding: "16px 36px", borderRadius: 14, fontSize: 17, fontWeight: 800, textDecoration: "none", boxShadow: "0 6px 32px rgba(0,0,0,0.2)" }}
            >
              💬 WhatsApp →
            </a>
          </div>
          <p style={{ fontSize: 14, color: "#e9d5ff", marginTop: 16 }}>Sans engagement • Résultats en 10 minutes</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0f0f1a", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #86198f, #a21caf)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 900 }}>U</span>
            </div>
            <span style={{ fontFamily: "var(--font-display, 'Paytone One', sans-serif)", fontSize: 18, fontWeight: 900, color: "#f5d0fe" }}>UXForge</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 20 }}>
            {["Fonctionnalités", "Cas d'usage", "Confidentialité", "Contact"].map(link => (
              <a key={link} href="#" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>{link}</a>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>© 2025 UXForge — Un produit Wikolabs</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginTop: "0.5rem", fontSize: "0.8rem" }}>
            <a href="mailto:team@wikolabs.com" style={{ textDecoration: "none", color: "inherit" }}>team@wikolabs.com</a>
            <span style={{ color: "#6b7280" }}>·</span>
            <a href="tel:+261386626100" style={{ textDecoration: "none", color: "inherit" }}>+261 38 66 261 00</a>
            <span style={{ color: "#6b7280" }}>·</span>
            <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' type="button" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>Prendre RDV</button>
          </div>
        </div>
      </footer>

    </div>
  );
}

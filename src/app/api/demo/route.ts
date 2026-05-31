import { NextResponse } from "next/server";
import { chat, isConfigured } from "@/lib/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT_FR = `Tu es UXForge, un agent IA d'analyse de feedback utilisateurs pour UX researchers, product managers et designers. Tu ingestes des verbatims clients et produis une cartographie des points de friction + recommandations, dans le style d'un livrable UX research synthese.

Format de sortie exact en MARKDOWN :
**🔥 Points de friction detectes**
- [3-4 puces, chaque puce decrit un cluster de friction avec sa frequence estimee et son severite : ex "Onboarding (8/12 verbatims) — severite Haute"]

**💡 Insights comportementaux**
- [2-3 puces interpretant les patterns : modele mental utilisateur vs realite produit, etapes ou les utilisateurs se desengagent]

**🎯 Recommandations design**
- [2-3 puces actionnables avec sprint d'attaque suggere entre crochets : ex "Refonte tunnel signup avec progressive disclosure [Sprint 14]"]

Tu DOIS interpreter les verbatims fournis (et inventer un cluster supplementaire realiste si moins de 3). Ne dis JAMAIS "je n'ai pas assez de donnees". Tu joues le role d'un UX researcher senior. Reste analytique, evite le marketing. Maximum 350 mots.`;

const SYSTEM_PROMPT_EN = `You are UXForge, an AI user-feedback analysis agent for UX researchers, product managers and designers. You ingest customer verbatims and produce a friction map + recommendations, styled as a UX research synthesis deliverable.

Exact MARKDOWN output format:
**🔥 Detected friction points**
- [3-4 bullets, each describes a friction cluster with estimated frequency and severity: e.g. "Onboarding (8/12 verbatims) — High severity"]

**💡 Behavioral insights**
- [2-3 bullets interpreting patterns: user mental model vs product reality, drop-off steps]

**🎯 Design recommendations**
- [2-3 actionable bullets with suggested attack sprint in brackets: e.g. "Rework signup funnel with progressive disclosure [Sprint 14]"]

You MUST interpret the verbatims provided (and invent one extra realistic cluster if fewer than 3). NEVER say "not enough data". You play a senior UX researcher. Stay analytical, avoid marketing. Maximum 350 words.`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const verbatims: string[] = Array.isArray(body.verbatims) ? body.verbatims.slice(0, 6).map((s: unknown) => String(s).trim()).filter(Boolean) : [];
    const product: string = typeof body.product === "string" ? body.product.trim() : "";
    const lang: "fr" | "en" = body.lang === "en" ? "en" : "fr";

    if (!verbatims.length) {
      return NextResponse.json(
        { error: lang === "fr" ? "Collez au moins un verbatim utilisateur." : "Paste at least one user verbatim." },
        { status: 400 }
      );
    }

    if (!isConfigured()) {
      return NextResponse.json(
        {
          error: "llm_not_configured",
          message: lang === "fr"
            ? "Demo en mode statique — la cle LLM sera configuree au prochain deploiement."
            : "Static demo mode — LLM key will be configured at next deploy.",
          mockBrief: buildMockBrief(verbatims, product, lang),
        },
        { status: 200 }
      );
    }

    const list = verbatims.map((v, i) => `${i + 1}. "${v}"`).join("\n");
    const userMsg = lang === "fr"
      ? `Produit analyse : ${product || "produit non precise"}\nVerbatims utilisateurs collectes :\n${list}\n\nGenere la synthese UX research avec frictions, insights, recommandations.`
      : `Product analyzed: ${product || "unspecified product"}\nCollected user verbatims:\n${list}\n\nGenerate the UX research synthesis with frictions, insights, recommendations.`;

    const { text, model } = await chat(
      [
        { role: "system", content: lang === "fr" ? SYSTEM_PROMPT_FR : SYSTEM_PROMPT_EN },
        { role: "user", content: userMsg },
      ],
      900
    );

    return NextResponse.json({ brief: text, model, generatedAt: new Date().toISOString() });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function buildMockBrief(verbatims: string[], product: string, lang: "fr" | "en"): string {
  const p = product || (lang === "fr" ? "le produit" : "the product");
  const n = verbatims.length;
  if (lang === "en") {
    return `**🔥 Detected friction points**\n- Onboarding clarity (${Math.min(n, 3)}/${n} verbatims) — High severity. Users don't understand the value prop within the first 60s of ${p}.\n- Navigation discoverability (${Math.max(1, Math.floor(n/2))}/${n} verbatims) — Medium severity. Key features hidden behind secondary menus.\n- Pricing transparency (1/${n} verbatim) — Medium severity. Plan limits unclear at decision moment.\n\n**💡 Behavioral insights**\n- Users approach ${p} expecting a quick-win utility but encounter a setup-heavy mental model — explains drop-off at step 2.\n- The "aha moment" is buried in advanced settings; most users churn before reaching it.\n\n**🎯 Design recommendations**\n- Add a 30s interactive demo right on the landing page before signup [Sprint 14].\n- Promote 2 hidden features to the main nav (data-backed list available on request) [Sprint 14].\n- Add tooltip-based plan comparison on the pricing CTA [Sprint 15].`;
  }
  return `**🔥 Points de friction detectes**\n- Clarte de l'onboarding (${Math.min(n, 3)}/${n} verbatims) — Severite Haute. Les utilisateurs ne saisissent pas la value prop dans les 60 premieres secondes de ${p}.\n- Decouvrabilite navigation (${Math.max(1, Math.floor(n/2))}/${n} verbatims) — Severite Moyenne. Fonctionnalites cles cachees dans des menus secondaires.\n- Transparence pricing (1/${n} verbatim) — Severite Moyenne. Limites des plans floues au moment de la decision.\n\n**💡 Insights comportementaux**\n- Les utilisateurs abordent ${p} en attendant un outil quick-win mais rencontrent un modele mental lourd en setup — explique l'abandon a l'etape 2.\n- Le "aha moment" est enterre dans les reglages avances ; la plupart des utilisateurs churn avant de l'atteindre.\n\n**🎯 Recommandations design**\n- Ajouter une demo interactive 30s en haut de la landing avant signup [Sprint 14].\n- Promouvoir 2 fonctionnalites cachees dans la nav principale (liste argumentee disponible) [Sprint 14].\n- Ajouter un comparatif des plans en tooltip sur le CTA pricing [Sprint 15].`;
}

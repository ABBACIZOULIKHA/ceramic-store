const GEMINI_MODEL =
  process.env.REACT_APP_GEMINI_CHAT_MODEL || "gemini-3.6-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `Tu es l'assistant virtuel d'Abbaci Ceramic, un magasin de céramique.
Tu conseilles les clients sur :
- la faïence murale (cuisine, salle de bain)
- le carrelage de sol
- les sanitaires

Règles :
- Réponds toujours en français, de façon concise et amicale (3 phrases maximum en général).
- Aide à choisir selon la pièce, le style, le format, l'entretien et le budget.
- Pour estimer des quantités, explique la méthode (surface en m² x coef de perte de 10%) sans inventer de prix.
- N'invente jamais de prix, de disponibilités ou de références précises : oriente vers la page Produits du site ou vers la page Contact pour confirmer auprès du magasin.
- Si la question n'a aucun rapport avec la céramique ou l'aménagement, réponds brièvement et ramène poliment vers le sujet.`;

export const sendChatMessage = async (history) => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Clé API Gemini manquante");

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: history.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      })),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    }),
  });

  let payload;
  try {
    payload = await res.json();
  } catch {
    throw new Error("Réponse invalide du serveur");
  }

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error(
        "Accès refusé par Google : vérifiez votre clé API / projet"
      );
    }
    if (res.status === 429) {
      throw new Error("Limite d'utilisation atteinte, réessayez plus tard");
    }
    throw new Error(
      payload?.error?.message || `Erreur ${res.status}`
    );
  }

  const parts = payload?.candidates?.[0]?.content?.parts ?? [];
  const text = parts
    .filter((p) => p.text)
    .map((p) => p.text)
    .join("")
    .trim();

  if (!text) {
    throw new Error("Réponse vide, réessayez");
  }

  return text;
};

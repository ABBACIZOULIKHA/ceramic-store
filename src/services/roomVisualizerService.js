const GEMINI_MODEL =
  process.env.REACT_APP_GEMINI_MODEL || "gemini-3.1-flash-image";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const PROMPT = `Tu es un photographe professionnel spécialisé dans les simulations d'ameublement.
Image 1 : une photo produit (carrelage ou sanitaires) du catalogue.
Image 2 : une photo prise par le client chez lui.

Crée une image réaliste où le produit de l'image 1 est appliqué/installé naturellement dans la scène de l'image 2.
Règles :
- Conserve exactement l'apparence du produit (motif, couleur, texture, format) sans modification.
- Respecte la perspective, l'éclairage et l'ambiance de la pièce.
- Le résultat doit ressembler à une vraie photo après installation.
- Ne modifie rien d'autre dans la pièce.`;

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = () => reject(new Error("Impossible de lire le fichier"));
    reader.readAsDataURL(file);
  });

const urlToBase64 = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Impossible de récupérer l'image produit");
  const blob = await res.blob();
  return fileToBase64(blob);
};

/**
 * Redimensionne et compresse l'image uploadée (max 1280px, JPEG)
 * pour limiter la taille de la requête vers Gemini.
 * Retourne { mimeType, data } en base64.
 */
export const prepareRoomImage = (file) =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Veuillez choisir un fichier image"));
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const maxDim = 1280;
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      resolve({
        mimeType: "image/jpeg",
        data: canvas.toDataURL("image/jpeg", 0.85).split(",")[1],
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Impossible de lire l'image choisie"));
    };

    img.src = objectUrl;
  });

export const generateRoomPreview = async (productImageUrl, roomImage) => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Clé API Gemini manquante");

  const [productData] = await Promise.all([urlToBase64(productImageUrl)]);

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: PROMPT },
            { inlineData: { mimeType: "image/jpeg", data: productData } },
            {
              inlineData: { mimeType: roomImage.mimeType, data: roomImage.data },
            },
          ],
        },
      ],
    }),
  });

  let payload;
  try {
    payload = await res.json();
  } catch {
    throw new Error("Réponse invalide de Gemini");
  }

  if (!res.ok) {
    if (res.status === 400 && /API key/i.test(payload?.error?.message || "")) {
      throw new Error("Clé API Gemini invalide");
    }
    if (res.status === 429) {
      throw new Error("Quota dépassé, réessayez plus tard");
    }
    throw new Error(
      payload?.error?.message || `Échec de la génération (${res.status})`
    );
  }

  const parts = payload?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inlineData);

  if (!imagePart) {
    const blockReason = payload?.promptFeedback?.blockReason;
    throw new Error(
      blockReason
        ? `Image bloquée (${blockReason})`
        : "Aucune image générée, réessayez avec une autre photo"
    );
  }

  return `data:${imagePart.inlineData.mimeType || "image/png"};base64,${imagePart.inlineData.data}`;
};

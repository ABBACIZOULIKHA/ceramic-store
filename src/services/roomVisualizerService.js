const NVIDIA_MODEL =
  process.env.REACT_APP_NVIDIA_MODEL || "qwen-image-edit-nvpcb-ovsl2sl";
const NVIDIA_URL =
  "https://integrate.api.nvidia.com/v1/images/edits";

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

      canvas.toBlob(
        (blob) => {
          if (!blob) reject(new Error("Impossible de compresser l'image"));
          resolve(blob);
        },
        "image/jpeg",
        0.85
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Impossible de lire l'image choisie"));
    };

    img.src = objectUrl;
  });

const buildPrompt = (productImageUrl) => {
  return `Place this ceramic tile product naturally onto the floor surface in this room photo. The tile should be installed realistically as if it were part of the room — matching the perspective, lighting, shadows, and ambiance of the scene. The result should look like a professional interior photography shot of the ceramic tile floor installation. Keep the rest of the room unchanged.`;
};

export const generateRoomPreview = async (productImageUrl, roomBlob) => {
  const apiKey = process.env.REACT_APP_NVIDIA_API_KEY;
  if (!apiKey) throw new Error("Clé API NVIDIA manquante");

  const formData = new FormData();
  formData.append("model", NVIDIA_MODEL);
  formData.append("image", roomBlob, "room.jpg");
  formData.append("prompt", buildPrompt(productImageUrl));

  const res = await fetch(NVIDIA_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
    },
    body: formData,
  });

  let payload;
  try {
    payload = await res.json();
  } catch {
    throw new Error("Réponse invalide de NVIDIA");
  }

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new Error("Clé API NVIDIA invalide");
    }
    if (res.status === 429) {
      throw new Error("Quota dépassé, réessayez plus tard");
    }
    throw new Error(
      payload?.error?.message || `Échec de la génération (${res.status})`
    );
  }

  const data = payload?.data;
  if (!data || !data[0]) {
    throw new Error("Aucune image générée, réessayez avec une autre photo");
  }

  const result = data[0];
  if (result.b64_json) {
    return `data:image/png;base64,${result.b64_json}`;
  }
  if (result.url) {
    return result.url;
  }
  throw new Error("Format de réponse inattendu de NVIDIA");
};
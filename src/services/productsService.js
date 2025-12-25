import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);


export const fetchProducts = async (filters = {}) => {
  const {
    search,
    categories = [],
    utilisations = [],
    format,
    aspect,
    finitions = [],
    epaisseur,
  } = filters;

  const hasFaienceFilters =
    utilisations.length > 0 ||
    finitions.length > 0 ||
    !!format ||
    !!aspect ||
    !!epaisseur;

  const hasSanitairesCategory = categories.includes("Sanitaires");

  const noFiltersApplied =
    !search &&
    categories.length === 0 &&
    !hasFaienceFilters;

  /* =========================
     FAÏENCE
  ========================= */
  let faienceQuery = supabase
    .from("faience")
    .select("id, nom, disponibilite, format, aspect, epaisseur");

  if (search) {
    faienceQuery = faienceQuery.ilike("nom", `%${search}%`);
  }

  if (format) faienceQuery = faienceQuery.eq("format", format);
  if (aspect) faienceQuery = faienceQuery.eq("aspect", aspect);
  if (epaisseur) faienceQuery = faienceQuery.eq("epaisseur", epaisseur);

  const { data: faiences } = await faienceQuery;

  let filteredFaiences = faiences || [];

 /* =========================
   CATEGORIES – TRAITEMENT COMPLET
========================= */

if (categories.length > 0) {

  // 🟢 CAS 1 : seulement "Sanitaires"
  if (categories.length === 1 && hasSanitairesCategory) {
    filteredFaiences = [];
  }

  // 🟡 CAS 2 : Sanitaires + autres catégories
  else {
    const faienceCategoriesOnly = categories.filter(
      c => c !== "Sanitaires"
    );

    if (faienceCategoriesOnly.length > 0) {
      const { data } = await supabase
        .from("faience_categories")
        .select("id_faience, categories(nom)")
        .in("categories.nom", faienceCategoriesOnly);

      const allowedIds = data.map(d => d.id_faience);

      filteredFaiences = filteredFaiences.filter(f =>
        allowedIds.includes(f.id)
      );
    }
  }
}


  if (utilisations.length > 0) {
    const { data } = await supabase
      .from("faience_utilisations")
      .select("id_faience, utilisations(nom)")
      .in("utilisations.nom", utilisations);

    const allowedIds = data.map(d => d.id_faience);
    filteredFaiences = filteredFaiences.filter(f =>
      allowedIds.includes(f.id)
    );
  }

  if (finitions.length > 0) {
    const { data } = await supabase
      .from("faience_finitions")
      .select("id_faience, finitions(nom)")
      .in("finitions.nom", finitions);

    const allowedIds = data.map(d => d.id_faience);
    filteredFaiences = filteredFaiences.filter(f =>
      allowedIds.includes(f.id)
    );
  }

  const { data: faiencePhotos } = await supabase
    .from("photos_grand_faience")
    .select("id_faience, url");

  const faienceProducts = filteredFaiences.map(f => ({
    id: f.id,
    type: "faience",
    nom: f.nom,
    disponibilite: f.disponibilite,
    image:
      faiencePhotos.find(p => p.id_faience === f.id)?.url || null,
  }));

  /* =========================
     BATHROOM
  ========================= */
  let bathroomProducts = [];

  if (
    noFiltersApplied ||
    (hasSanitairesCategory && !hasFaienceFilters)
  ) {
    let bathroomQuery = supabase
      .from("bathroom")
      .select("id, nom, disponibilite");

    if (search) {
      bathroomQuery = bathroomQuery.ilike("nom", `%${search}%`);
    }

    const { data: bathrooms } = await bathroomQuery;

    const { data: bathroomPhotos } = await supabase
      .from("photos_grand_bathroom")
      .select("id_bathroom, url");

    bathroomProducts = bathrooms.map(b => ({
      id: b.id,
      type: "bathroom",
      nom: b.nom,
      disponibilite: b.disponibilite,
      image:
        bathroomPhotos.find(p => p.id_bathroom === b.id)?.url || null,
    }));
  }

  return [...faienceProducts, ...bathroomProducts];
};





// export const fetchProducts = async (filters = {}) => {
//   const {
//     search,
//     categories = [],
//     utilisations = [],
//     format,
//     aspect,
//     finitions = [],
//     epaisseur,
//   } = filters;

//   // 🔴 FAÏENCE-ONLY FILTER DETECTION
//   const isFaienceOnlyFilterApplied =
//     utilisations.length > 0 ||
//     finitions.length > 0 ||
//     !!format ||
//     !!aspect ||
//     !!epaisseur;

//   /* =========================
//      FAÏENCE QUERY
//   ========================= */
//   let faienceQuery = supabase
//     .from("faience")
//     .select("id, nom, disponibilite, format, aspect, epaisseur");

//   if (search) {
//     faienceQuery = faienceQuery.ilike("nom", `%${search}%`);
//   }

//   if (format) {
//     faienceQuery = faienceQuery.eq("format", format);
//   }

//   if (aspect) {
//     faienceQuery = faienceQuery.eq("aspect", aspect);
//   }

//   if (epaisseur) {
//     faienceQuery = faienceQuery.eq("epaisseur", epaisseur);
//   }

//   const { data: faiences, error: faienceError } = await faienceQuery;
//   if (faienceError) throw faienceError;

//   let filteredFaiences = faiences;

//   /* =========================
//      RELATIONAL FILTERS
//   ========================= */

//   if (categories.length > 0) {
//     const { data } = await supabase
//       .from("faience_categories")
//       .select("id_faience, categories(nom)")
//       .in("categories.nom", categories);

//     const allowedIds = data.map(d => d.id_faience);
//     filteredFaiences = filteredFaiences.filter(f =>
//       allowedIds.includes(f.id)
//     );
//   }

//   if (utilisations.length > 0) {
//     const { data } = await supabase
//       .from("faience_utilisations")
//       .select("id_faience, utilisations(nom)")
//       .in("utilisations.nom", utilisations);

//     const allowedIds = data.map(d => d.id_faience);
//     filteredFaiences = filteredFaiences.filter(f =>
//       allowedIds.includes(f.id)
//     );
//   }

//   if (finitions.length > 0) {
//     const { data } = await supabase
//       .from("faience_finitions")
//       .select("id_faience, finitions(nom)")
//       .in("finitions.nom", finitions);

//     const allowedIds = data.map(d => d.id_faience);
//     filteredFaiences = filteredFaiences.filter(f =>
//       allowedIds.includes(f.id)
//     );
//   }

//   /* =========================
//      PHOTOS FAÏENCE
//   ========================= */
//   const { data: faiencePhotos } = await supabase
//     .from("photos_grand_faience")
//     .select("id_faience, url");

//   const faienceProducts = filteredFaiences.map(f => ({
//     id: f.id,
//     type: "faience",
//     nom: f.nom,
//     disponibilite: f.disponibilite,
//     image:
//       faiencePhotos.find(p => p.id_faience === f.id)?.url || null,
//   }));

//   /* =========================
//      🚫 STOP HERE IF FAÏENCE FILTERS APPLIED
//   ========================= */
//   if (isFaienceOnlyFilterApplied) {
//     return faienceProducts;
//   }

//   /* =========================
//      BATHROOM (ONLY IF NO FAÏENCE FILTERS)
//   ========================= */
//   let bathroomQuery = supabase
//     .from("bathroom")
//     .select("id, nom, disponibilite");

//   if (search) {
//     bathroomQuery = bathroomQuery.ilike("nom", `%${search}%`);
//   }

//   const { data: bathrooms } = await bathroomQuery;

//   const { data: bathroomPhotos } = await supabase
//     .from("photos_grand_bathroom")
//     .select("id_bathroom, url");

//   const bathroomProducts = bathrooms.map(b => ({
//     id: b.id,
//     type: "bathroom",
//     nom: b.nom,
//     disponibilite: b.disponibilite,
//     image:
//       bathroomPhotos.find(p => p.id_bathroom === b.id)?.url || null,
//   }));

//   return [...faienceProducts, ...bathroomProducts];
// };









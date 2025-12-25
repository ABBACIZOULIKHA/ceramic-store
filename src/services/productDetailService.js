import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);




/* ======================
   FAÏENCE
====================== */
export const fetchFaienceDetail = async (id) => {
  const { data: faience } = await supabase
    .from("faience")
    .select("*")
    .eq("id", id)
    .single();

  const { data: grands } = await supabase
    .from("photos_grand_faience")
    .select("url")
    .eq("id_faience", id);

  const { data: units } = await supabase
    .from("photos_unite_faience")
    .select("url, description")
    .eq("id_faience", id);

  const { data: utilisations } = await supabase
    .from("faience_utilisations")
    .select("utilisations(nom)")
    .eq("id_faience", id);

  const { data: finitions } = await supabase
    .from("faience_finitions")
    .select("finitions(nom)")
    .eq("id_faience", id);

  return {
    type: "faience",
    ...faience,
    grandImages: grands.map(i => i.url),
    unitImages: units,
    utilisations: utilisations.map(u => u.utilisations.nom),
    finitions: finitions.map(f => f.finitions.nom),
  };
};

/* ======================
   BATHROOM
====================== */
export const fetchBathroomDetail = async (id) => {
  const { data: bathroom } = await supabase
    .from("bathroom")
    .select("*")
    .eq("id", id)
    .single();

  const { data: grands } = await supabase
    .from("photos_grand_bathroom")
    .select("url")
    .eq("id_bathroom", id);

  const { data: units } = await supabase
    .from("photos_unite_bathroom")
    .select("url, description")
    .eq("id_bathroom", id);

  return {
    type: "bathroom",
    ...bathroom,
    grandImages: grands.map(i => i.url),
    unitImages: units,
  };
};

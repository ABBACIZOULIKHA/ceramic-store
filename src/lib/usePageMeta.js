import { useEffect } from "react";

export const SITE_NAME = "Abbaci Ceramic";

export const SITE_DESCRIPTION =
  "Abbaci Ceramic, magasin de faïences, carrelages et sanitaires à Hadjout (Tipaza). Carreaux de sol, faïences murales et accessoires de qualité pour vos projets de construction et rénovation.";

export const usePageMeta = ({ title, description }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
  }, [title, description]);
};
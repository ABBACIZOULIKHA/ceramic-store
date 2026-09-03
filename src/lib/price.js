export const formatPrice = (value) => {
  if (value === null || value === undefined) return null;
  return `${Number(value).toLocaleString("fr-FR")} DA`;
};

export const discountPercent = (prix, prixPromo) => {
  if (!prix || !prixPromo || prixPromo >= prix) return null;
  return Math.round((1 - prixPromo / prix) * 100);
};
import React, { useCallback } from 'react'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HeroSlider from '../components/HeroSlider';
import APropos from '../components/APropos';
import ProducerLogos from '../components/ProducerLogos';
import Produits from '../components/Produits';
import ProductSection from '../components/ProductSection';
import { fetchNewProducts, fetchPromotionProducts } from '../services/productsService';
import { usePageMeta } from '../lib/usePageMeta';

export default function HomePage() {
  usePageMeta({
    title: "Abbaci Ceramic | Faïences, Carrelages & Sanitaires à Hadjout",
    description:
      "Abbaci Ceramic : carreaux de sol, faïences murales et sanitaires de qualité à Hadjout, Tipaza. Découvrez nos produits pour vos projets de construction et de rénovation.",
  });

  const loadNewProducts = useCallback(() => fetchNewProducts(8), []);
  const loadPromoProducts = useCallback(() => fetchPromotionProducts(8), []);

  return (
    <div className='bg-white/60 dark:bg-gray-900'>
   <Navbar />
<div className="pt-[120px]">
  <HeroSlider />
</div>
 <APropos/>
 <ProducerLogos/>
 <ProductSection
   id="nouveautes"
   accentLabel="Nouveautés"
   title="Les Nouveautés"
   subtitle="Découvrez nos derniers arrivages, fraîchement débarqués au magasin."
   fetcher={loadNewProducts}
   className="bg-white"
 />
 <ProductSection
   id="promotions"
   accentLabel="Promotions"
   title="Nos Promotions"
   subtitle="Profitez de nos offres spéciales avant la fin des stocks."
   fetcher={loadPromoProducts}
   className="bg-ivory"
 />
 <Produits/>
   <Footer/>
    </div>
  )
}

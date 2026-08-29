import React from 'react'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HeroSlider from '../components/HeroSlider';
import APropos from '../components/APropos';
import Produits from '../components/Produits';
import { usePageMeta } from '../lib/usePageMeta';

export default function HomePage() {
  usePageMeta({
    title: "Abbaci Ceramic | Faïences, Carrelages & Sanitaires à Hadjout",
    description:
      "Abbaci Ceramic : carreaux de sol, faïences murales et sanitaires de qualité à Hadjout, Tipaza. Découvrez nos produits pour vos projets de construction et de rénovation.",
  });

  return (
    <div className='bg-white/60 dark:bg-gray-900'>
   <Navbar />
<div className="pt-[120px]">
  <HeroSlider />
</div>
 <APropos/>
 <Produits/>
   <Footer/>
    </div>
  )
}

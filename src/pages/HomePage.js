import React from 'react'
import Contact from "../components/ContactInfo";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HeroSlider from '../components/HeroSlider';
import APropos from '../components/APropos';
import Produits from '../components/Produits';

export default function HomePage() {
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

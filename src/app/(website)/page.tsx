import React from 'react';
import { HeroStory } from '@/components/HeroStory';
import { FruitExperienceShowcase } from '@/components/FruitExperienceShowcase';
import { FamilyStorySection } from '@/components/FamilyStorySection';
import { BundleBuilder } from '@/components/BundleBuilder';
import { CorporateGifting } from '@/components/CorporateGifting';

export default function HomePage() {
  return (
    <div id="view-home">
      {/* 1. Signature Hero Storytelling */}
      <HeroStory />

      {/* 2. Interactive 5-Fruit Spotlight Wheel & 3D Package Inspector */}
      <FruitExperienceShowcase />

      {/* 3. Craftsmanship & Family Story Narrative */}
      <FamilyStorySection />

      {/* 4. Custom Family Sampler & Combo Collections */}
      <BundleBuilder />

      {/* 5. Luxury Corporate & Family Gifting Hampers */}
      <CorporateGifting />
    </div>
  );
}

import React from 'react';
import { HeroStory } from './HeroStory';
import { FruitExperienceShowcase } from './FruitExperienceShowcase';
import { FamilyStorySection } from './FamilyStorySection';
import { BundleBuilder } from './BundleBuilder';
import { CorporateGifting } from './CorporateGifting';

export const HomeView = () => {
    return (
        <div id="view-home">
            {/* 1. Signature Hero Storytelling Experience */}
            <HeroStory />

            {/* 2. Interactive 5-Fruit Spotlight Wheel & 3D Package Inspector */}
            <FruitExperienceShowcase />

            {/* 3. Craftsmanship & Family Story Narrative */}
            <FamilyStorySection />

            {/* 4. Custom Family Sampler Bundle Builder */}
            <BundleBuilder />

            {/* 5. Luxury Corporate & Family Gifting Hampers */}
            <CorporateGifting />
        </div>
    );
};

export default HomeView;

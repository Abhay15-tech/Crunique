export const PACK_SIZES = [
    { size: "25g", label: "Trial Pack", multiplier: 0.5, price: 2.49, description: "Perfect for first-time tasters & daily carry" },
    { size: "50g", label: "Regular Pack", multiplier: 1.0, price: 4.99, description: "Ideal daily healthy snacking portion" },
    { size: "100g", label: "Family Pack", multiplier: 1.8, price: 8.99, description: "Best value for family movie nights & sharing" },
    { size: "250g", label: "Value Pack", multiplier: 3.8, price: 18.99, description: "Bulk value pack for frequent health lovers" }
];

export const CRUNIQUE_PRODUCTS = [
    {
        id: "apple-chips",
        name: "Crispy Apple Chips",
        tagline: "Crisp. Sweet. Naturally Fresh.",
        collection: "Classic Collection",
        collectionDesc: "Timeless fruit flavors crafted for everyday healthy snacking.",
        price: 4.99,
        originalPrice: 5.99,
        accentColor: "#D62828",
        accentGlow: "rgba(214, 40, 40, 0.4)",
        personality: "Premium • Classic • Elegant • Everyday Healthy Snack",
        image: "assets/images/apple_chips.png",
        rating: 4.9,
        reviewsCount: 184,
        badge: "Classic Collection",
        highlights: [
            "100% Real Fuji & Honeycrisp Apples",
            "Rich in Dietary Fiber",
            "Naturally Sweet with Zero Sugar Added",
            "Perfect Everyday Healthy Snack"
        ],
        provenance: "Sourced from high-altitude Himachal & Kashmir family orchards, hand-selected at peak sugar density.",
        craftProcess: "Thin-sliced with skin on to lock in dietary fiber, low-temp vacuum crisped to achieve legendary crunch without oil.",
        healthBenefits: "Supports digestive wellness, rich in polyphenol antioxidants, low glycemic index for sustained energy.",
        storageInfo: "Store in a cool, dry place. Reseal nitrogen-flushed zipper pouch tightly after opening.",
        shelfLife: "12 Months from Manufacturing Date",
        nutrition: {
            servingSize: "30g",
            calories: 95,
            totalFat: "0g",
            sodium: "0mg",
            totalCarbs: "22g",
            dietaryFiber: "4g",
            sugars: "16g (100% Natural)",
            protein: "1g"
        },
        ingredients: ["100% Real Apples", "Dash of natural organic lemon juice"],
        flavorProfile: { sweetness: 88, tartness: 35, crunch: 96, aroma: 92 },
        pairings: ["Artisanal Dark Chocolate", "Green Tea", "Greek Yogurt", "Charcuterie Platter"]
    },
    {
        id: "banana-chips",
        name: "Crunchy Banana Crisps",
        tagline: "Energy in Every Crunch.",
        collection: "Classic Collection",
        collectionDesc: "Timeless fruit flavors crafted for everyday healthy snacking.",
        price: 4.49,
        originalPrice: 5.49,
        accentColor: "#F4C430",
        accentGlow: "rgba(244, 196, 48, 0.4)",
        personality: "Energetic • Comforting • Wholesome • Family Friendly",
        image: "assets/images/banana_chips.png",
        rating: 4.8,
        reviewsCount: 162,
        badge: "Classic Collection",
        highlights: [
            "100% Real Golden Bananas",
            "Rich in Natural Potassium",
            "Great Pre-Workout Snack",
            "Kid-Friendly & Wholesome"
        ],
        provenance: "Sourced directly from Kerala sun-drenched family plantations, harvested at peak golden sweetness.",
        craftProcess: "Gently dehydrated under low temperature to retain potassium, natural dietary fiber, and warm banana warmth.",
        healthBenefits: "Provides clean pre-workout carbohydrate energy, aids muscle cramp prevention, easy on digestion.",
        storageInfo: "Store in a cool, dry place. Keep airtight for ultimate crunch.",
        shelfLife: "12 Months from Manufacturing Date",
        nutrition: {
            servingSize: "30g",
            calories: 110,
            totalFat: "0.5g",
            sodium: "1mg",
            totalCarbs: "25g",
            dietaryFiber: "3.5g",
            sugars: "14g (100% Natural)",
            protein: "1.5g"
        },
        ingredients: ["100% Sun-Ripened Bananas"],
        flavorProfile: { sweetness: 90, tartness: 10, crunch: 94, aroma: 86 },
        pairings: ["Almond Butter", "Espresso", "Oatmeal Bowl", "Honey Drizzle"]
    },
    {
        id: "kiwi-chips",
        name: "Exotic Kiwi Chips",
        tagline: "A Tangy Crunch of Nature.",
        collection: "Exotic Collection",
        collectionDesc: "Premium fruit experiences with unique, vibrant flavors.",
        price: 5.99,
        originalPrice: 6.99,
        accentColor: "#6BA539",
        accentGlow: "rgba(107, 165, 57, 0.4)",
        personality: "Premium • Modern • Exotic • Refreshing",
        image: "assets/images/kiwi_chips.png",
        rating: 5.0,
        reviewsCount: 198,
        badge: "Exotic Collection",
        highlights: [
            "100% Real Exotic Kiwi Slices",
            "Rich in Immune Vitamin C",
            "Refreshing Sweet & Tangy Taste",
            "Premium Exotic Superfruit"
        ],
        provenance: "Sourced from pristine organic growers, featuring intact seeds and vibrant green flesh.",
        craftProcess: "Crisped gently using propriety low-heat air technology to lock in Vitamin C and delicate seed crunch texture.",
        healthBenefits: "Supercharges daily immunity with high Vitamin C, supports gut health via actinidin enzymes.",
        storageInfo: "Store in a cool, dry place away from moisture and light.",
        shelfLife: "12 Months from Manufacturing Date",
        nutrition: {
            servingSize: "25g",
            calories: 85,
            totalFat: "0g",
            sodium: "0mg",
            totalCarbs: "19g",
            dietaryFiber: "4.5g",
            sugars: "12g (100% Natural)",
            protein: "1g"
        },
        ingredients: ["100% Fresh Green & SunGold Kiwis"],
        flavorProfile: { sweetness: 72, tartness: 85, crunch: 90, aroma: 98 },
        pairings: ["Sparkling Mineral Water", "Goat Cheese", "Chia Pudding", "Matcha Latte"]
    },
    {
        id: "guava-chips",
        name: "Natural Guava Chips",
        tagline: "India's Favorite Fruit, Reinvented.",
        collection: "Tropical Collection",
        collectionDesc: "A refreshing taste inspired by natural tropical goodness.",
        price: 5.49,
        originalPrice: 6.49,
        accentColor: "#7CB342",
        accentGlow: "rgba(124, 179, 66, 0.4)",
        personality: "Authentic • Natural • Traditional • Indian Inspired",
        image: "assets/images/guava_chips.png",
        rating: 4.9,
        reviewsCount: 145,
        badge: "Tropical Collection",
        highlights: [
            "100% Real Pink Guava",
            "Rich in Lycopene Antioxidants",
            "High in Natural Dietary Fiber",
            "Authentic Tropical Flavor"
        ],
        provenance: "Harvested from heritage Indian guava orchards in Maharashtra & Andhra, celebrated for nostalgic fragrance.",
        craftProcess: "Crafted into thin crispy rounds preserving the floral pink flesh, natural seeds, and tropical aroma.",
        healthBenefits: "High antioxidant profile protects cellular health, low glycemic index ideal for wellness conscious adults.",
        storageInfo: "Keep pouch sealed tightly in a cool ambient pantry.",
        shelfLife: "12 Months from Manufacturing Date",
        nutrition: {
            servingSize: "30g",
            calories: 90,
            totalFat: "0g",
            sodium: "0mg",
            totalCarbs: "20g",
            dietaryFiber: "5g",
            sugars: "11g (100% Natural)",
            protein: "1.2g"
        },
        ingredients: ["100% Real Pink Guava"],
        flavorProfile: { sweetness: 78, tartness: 60, crunch: 92, aroma: 100 },
        pairings: ["Herbal Tea Infusions", "Aged Cheddar", "Smoothie Bowls", "Mint Water"]
    },
    {
        id: "pineapple-chips",
        name: "Tropical Pineapple Rings",
        tagline: "Tropical Sunshine in Every Bite.",
        collection: "Exotic Collection",
        collectionDesc: "Premium fruit experiences with unique, vibrant flavors.",
        price: 5.29,
        originalPrice: 6.29,
        accentColor: "#F9A825",
        accentGlow: "rgba(249, 168, 37, 0.4)",
        personality: "Bright • Joyful • Refreshing • Premium Tropical Experience",
        image: "assets/images/pineapple_chips.png",
        rating: 4.9,
        reviewsCount: 172,
        badge: "Exotic Collection",
        highlights: [
            "100% Real Golden Pineapple Rings",
            "Naturally Juicy & Zesty Flavor",
            "Rich in Vitamin C & Bromelain",
            "Sweet and Tangy Refreshment"
        ],
        provenance: "Sourced from sunlit tropical coastal plantations, selected for maximum core sweetness.",
        craftProcess: "Sliced into complete golden rings and low-temp air crisped to preserve digestive bromelain enzymes.",
        healthBenefits: "Promotes anti-inflammatory digestive health with natural bromelain, hydrates tastebuds with tropical zest.",
        storageInfo: "Store in a cool dry pantry. Zip pouch tightly after every snack session.",
        shelfLife: "12 Months from Manufacturing Date",
        nutrition: {
            servingSize: "30g",
            calories: 92,
            totalFat: "0g",
            sodium: "0mg",
            totalCarbs: "21g",
            dietaryFiber: "3g",
            sugars: "15g (100% Natural)",
            protein: "1g"
        },
        ingredients: ["100% Sweet Golden Pineapple"],
        flavorProfile: { sweetness: 92, tartness: 75, crunch: 95, aroma: 96 },
        pairings: ["Coconut Water", "Granola Parfait", "Iced Hibiscus Tea", "Spiced Nuts"]
    }
];

export const PRODUCT_COLLECTIONS = [
    {
        id: "classic",
        name: "🍎 CLASSIC COLLECTION",
        subtitle: "Everyday Healthy Snacking",
        description: "Timeless fruit flavors crafted for everyday healthy snacking.",
        accentColor: "#D62828",
        productIds: ["apple-chips", "banana-chips"]
    },
    {
        id: "exotic",
        name: "🌿 EXOTIC COLLECTION",
        subtitle: "Unique & Modern Experiences",
        description: "Premium fruit experiences with unique, vibrant flavors.",
        accentColor: "#6BA539",
        productIds: ["kiwi-chips", "pineapple-chips"]
    },
    {
        id: "tropical",
        name: "🌴 TROPICAL COLLECTION",
        subtitle: "Authentic Heritage Goodness",
        description: "A refreshing taste inspired by natural tropical goodness.",
        accentColor: "#7CB342",
        productIds: ["guava-chips"]
    }
];

export const COMBO_PACK_COLLECTIONS = [
    {
        id: "fruit-fiesta",
        name: "🌈 FRUIT FIESTA PACK",
        tagline: "The Complete Crunique Experience",
        description: "Includes all five signature fruit chip flavors: Apple, Banana, Kiwi, Guava & Pineapple.",
        price: 22.99,
        originalPrice: 26.25,
        targetAudience: "Complete Crunique sampler lovers",
        includedFruits: ["Apple Chips", "Banana Chips", "Kiwi Chips", "Guava Chips", "Pineapple Chips"],
        badge: "All 5 Flavors",
        accentColor: "#D4AF37",
        image: "assets/images/apple_chips.png"
    },
    {
        id: "fitness-fuel",
        name: "💪 FITNESS FUEL PACK",
        tagline: "High Energy & Potassium Boost",
        description: "Formulated for active workouts and clean daily fuel: Apple Chips, Banana Chips & Kiwi Chips.",
        price: 13.49,
        originalPrice: 15.47,
        targetAudience: "Gym lovers, fitness enthusiasts, active lifestyle customers",
        includedFruits: ["Apple Chips", "Banana Chips", "Kiwi Chips"],
        badge: "Pre-Workout Pick",
        accentColor: "#F4C430",
        image: "assets/images/banana_chips.png"
    },
    {
        id: "family-snack-box",
        name: "👨‍👩‍👧‍👦 FAMILY SNACK BOX",
        tagline: "Grand Assorted Collection for Home",
        description: "Large family size collection featuring all five fruit flavors for family movie nights and school lunchboxes.",
        price: 34.99,
        originalPrice: 42.00,
        targetAudience: "Families, parents, kids, home snacking",
        includedFruits: ["2x Apple", "2x Banana", "2x Kiwi", "2x Guava", "2x Pineapple"],
        badge: "Best Family Value",
        accentColor: "#3FA34D",
        image: "assets/images/kiwi_chips.png"
    },
    {
        id: "premium-gift-box",
        name: "🎁 PREMIUM GIFT BOX",
        tagline: "Luxury Satin Ribbon Packaging",
        description: "Exquisite keepsake box housing all five fruit chip pouch creations. Perfect for festivals and corporate gifting.",
        price: 29.99,
        originalPrice: 35.00,
        targetAudience: "Corporate gifting, festivals, premium occasions",
        includedFruits: ["All 5 Signature Fruits + Custom Gift Card"],
        badge: "Luxury Gifting",
        accentColor: "#D4AF37",
        image: "assets/images/guava_chips.png"
    },
    {
        id: "travel-snack-pack",
        name: "✈️ TRAVEL SNACK PACK",
        tagline: "Compact On-The-Go Energy",
        description: "Compact trial-sized pouch collection designed for flight carry-ons, office desks, and outdoor road trips.",
        price: 11.99,
        originalPrice: 14.50,
        targetAudience: "Travelers, working professionals, students",
        includedFruits: ["5x 25g Mini Trial Pouches"],
        badge: "On-The-Go",
        accentColor: "#F9A825",
        image: "assets/images/pineapple_chips.png"
    }
];

export const BRAND_STORY_STEPS = [
    {
        step: "01",
        title: "Nature's Sanctuary",
        subtitle: "Orchard Fresh Sourcing",
        description: "We source 100% sun-ripened real fruits directly from trusted family farms committed to ethical and sustainable agriculture."
    },
    {
        step: "02",
        title: "Artisanal Precision",
        subtitle: "Master Slicing & Craftsmanship",
        description: "Each fruit is hand-inspected and sliced to optimal thickness, preserving the natural cell structure, aroma, and vibrant color."
    },
    {
        step: "03",
        title: "Low-Temp Crisp Tech",
        subtitle: "Preserving Nutrients & Crunch",
        description: "Our proprietary vacuum-dehydration removes moisture gently without high temperatures, locking in 98% of natural vitamins and minerals."
    },
    {
        step: "04",
        title: "Eco-Luxury Packaging",
        subtitle: "Sealed for Freshness",
        description: "Packaged in eco-conscious nitrogen-flushed pouches that shield against light and moisture, ensuring unmatched crunch on your table."
    },
    {
        step: "05",
        title: "From Our Family to Yours",
        subtitle: "Pure Snacking Joy",
        description: "Every packet is delivered with warmth, trust, and our family's personal guarantee of purity and unforgettable taste."
    }
];

export const BRAND_VALUES = [
    {
        icon: "Leaf",
        title: "100% Real Fruits",
        description: "Zero added sugar, zero palm oil, zero synthetic colorings or preservatives. Pure fruit goodness in every bite."
    },
    {
        icon: "ShieldCheck",
        title: "Family Care & Trust",
        description: "Every batch is prepared with the same devotion and safety standard we demand for our own children and family table."
    },
    {
        icon: "Sparkles",
        title: "Elevated Craftsmanship",
        description: "We believe healthy snacks should feel luxurious, deeply satisfying, visually stunning, and fun to eat."
    },
    {
        icon: "Globe",
        title: "Sustainable Earth Pledge",
        description: "Supporting small family orchards, using recyclable packaging, and reducing food waste through smart drying."
    }
];

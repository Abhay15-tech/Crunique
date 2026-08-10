// Crunique Product Catalog & Application Data

const CRUNIQUE_PRODUCTS = [
    {
        id: "apple-chips",
        name: "Crispy Apple Chips",
        flavor: "Fuji & Honeycrisp Apple",
        category: "Single Fruit",
        price: 4.99,
        originalPrice: 5.99,
        weight: "110g / 3.9 oz",
        calories: 95,
        rating: 4.9,
        reviewsCount: 128,
        badge: "Best Seller",
        image: "assets/images/apple_chips.png",
        description: "Naturally sweet and golden thin-sliced crisp apples. 100% real Fuji apples baked to crunchy perfection with zero added sugar.",
        ingredients: ["100% Fuji Apples", "Slight dash of natural lemon juice (for freshness)"],
        nutrition: {
            servingSize: "30g",
            calories: 95,
            totalFat: "0g",
            sodium: "0mg",
            totalCarbs: "22g",
            dietaryFiber: "4g",
            sugars: "16g (Natural)",
            protein: "1g",
            vitaminC: "35% DV"
        },
        tags: ["Vegan", "Gluten-Free", "No Added Sugar", "Nut-Free"]
    },
    {
        id: "mango-chips",
        name: "Tropical Mango Crisps",
        flavor: "Alphonso Mango",
        category: "Single Fruit",
        price: 5.49,
        originalPrice: 6.49,
        weight: "120g / 4.2 oz",
        calories: 105,
        rating: 5.0,
        reviewsCount: 156,
        badge: "Customer Favorite",
        image: "assets/images/mango_chips.png",
        description: "Sun-ripened Alphonso mango slices transformed into irresistible golden crisps. Rich in Vitamin A and tropical aroma.",
        ingredients: ["100% Sun-Ripened Alphonso Mangoes"],
        nutrition: {
            servingSize: "30g",
            calories: 105,
            totalFat: "0g",
            sodium: "2mg",
            totalCarbs: "24g",
            dietaryFiber: "3.5g",
            sugars: "18g (Natural)",
            protein: "1g",
            vitaminA: "45% DV"
        },
        tags: ["Vegan", "Gluten-Free", "Organic", "Rich in Fiber"]
    },
    {
        id: "banana-chips",
        name: "Golden Banana Crisps",
        flavor: "Sweet Cavendish Banana",
        category: "Single Fruit",
        price: 4.49,
        originalPrice: 5.29,
        weight: "120g / 4.2 oz",
        calories: 110,
        rating: 4.8,
        reviewsCount: 94,
        badge: "High Potassium",
        image: "assets/images/banana_chips.png",
        description: "Naturally sweet banana slices baked to a satisfying crunch. Zero palm oil, zero fryers—pure potassium-loaded goodness.",
        ingredients: ["100% Natural Cavendish Bananas"],
        nutrition: {
            servingSize: "30g",
            calories: 110,
            totalFat: "0.2g",
            sodium: "0mg",
            totalCarbs: "26g",
            dietaryFiber: "3g",
            sugars: "14g (Natural)",
            protein: "1.2g",
            potassium: "12% DV"
        },
        tags: ["Vegan", "Gluten-Free", "Non-GMO", "Oven Baked"]
    },
    {
        id: "strawberry-chips",
        name: "Freeze-Dried Strawberries",
        flavor: "Wild Strawberry",
        category: "Single Fruit",
        price: 5.99,
        originalPrice: 6.99,
        weight: "40g / 1.4 oz",
        calories: 80,
        rating: 4.9,
        reviewsCount: 210,
        badge: "Superfood",
        image: "assets/images/strawberry_chips.png",
        description: "Tart and intensely sweet freeze-dried strawberry slices. Melts on your tongue with an explosive crunch.",
        ingredients: ["100% Freeze-Dried Strawberries"],
        nutrition: {
            servingSize: "20g",
            calories: 80,
            totalFat: "0g",
            sodium: "0mg",
            totalCarbs: "18g",
            dietaryFiber: "5g",
            sugars: "11g (Natural)",
            protein: "1.5g",
            vitaminC: "90% DV"
        },
        tags: ["Vegan", "Gluten-Free", "Rich in Vitamin C", "Low Calorie"]
    },
    {
        id: "pineapple-chips",
        name: "Sunshine Pineapple Rings",
        flavor: "Sweet Golden Pineapple",
        category: "Single Fruit",
        price: 5.29,
        originalPrice: 6.19,
        weight: "100g / 3.5 oz",
        calories: 90,
        rating: 4.7,
        reviewsCount: 88,
        badge: "Digestive Enzymes",
        image: "assets/images/pineapple_chips.png",
        description: "Tangy-sweet dried pineapple rings bursting with Bromelain enzymes and tropical sunshine flavor.",
        ingredients: ["100% Natural Golden Pineapple"],
        nutrition: {
            servingSize: "25g",
            calories: 90,
            totalFat: "0g",
            sodium: "1mg",
            totalCarbs: "21g",
            dietaryFiber: "3g",
            sugars: "15g (Natural)",
            protein: "0.8g",
            vitaminC: "60% DV"
        },
        tags: ["Vegan", "Gluten-Free", "Digestive Health", "Tangy"]
    },
    {
        id: "orange-chips",
        name: "Zesty Citrus Orange Slices",
        flavor: "Valencia Orange",
        category: "Single Fruit",
        price: 4.99,
        originalPrice: 5.79,
        weight: "120g / 4.2 oz",
        calories: 85,
        rating: 4.8,
        reviewsCount: 76,
        badge: "Vitamin C Boost",
        image: "assets/images/orange_chips.png",
        description: "Fragrant and refreshing crisp orange wheels. Perfect for direct munching or pairing with teas and sparkling water.",
        ingredients: ["100% Valencia Oranges"],
        nutrition: {
            servingSize: "30g",
            calories: 85,
            totalFat: "0g",
            sodium: "0mg",
            totalCarbs: "20g",
            dietaryFiber: "4.5g",
            sugars: "13g (Natural)",
            protein: "1g",
            vitaminC: "100% DV"
        },
        tags: ["Vegan", "Gluten-Free", "Immunity Boost", "Zesty"]
    },
    {
        id: "citrus-chips",
        name: "Dehydrated Citrus & Grapefruit Crisps",
        flavor: "Blood Orange & Ruby Red Grapefruit",
        category: "Signature Fruit",
        price: 5.99,
        originalPrice: 6.99,
        weight: "130g / 4.6 oz",
        calories: 90,
        rating: 5.0,
        reviewsCount: 184,
        badge: "360° Signature",
        image: "product2.jpeg",
        description: "Hand-sliced Blood Oranges and Ruby Red Grapefruits dehydrated to crunchy perfection. Packed with Vitamin C and natural citrus aroma.",
        ingredients: ["100% Blood Oranges", "Ruby Red Grapefruit Slices"],
        nutrition: {
            servingSize: "30g",
            calories: 90,
            totalFat: "0g",
            sodium: "0mg",
            totalCarbs: "21g",
            dietaryFiber: "4g",
            sugars: "14g (Natural)",
            protein: "1g",
            vitaminC: "120% DV"
        },
        tags: ["Vegan", "Gluten-Free", "Immunity Boost", "360 Spin", "Signature"]
    }
];

const CRUNIQUE_REVIEWS = [
    {
        id: 1,
        author: "Sarah Jenkins",
        role: "Certified Nutritionist & Runner",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        title: "The healthiest snack I've ever tasted.",
        content: "As a nutritionist, finding snacks with ZERO added sugar or oil that actually taste delicious is rare. Crunique's Mango and Apple chips are a staple in my pantry now!"
    },
    {
        id: 2,
        author: "Marcus Chen",
        role: "Parent of 2 & Tech Lead",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        title: "My kids absolutely love these.",
        content: "Swapping out potato chips for Crunique was the best decision for our family snack time. The crunch is real, and I don't feel guilty giving them a second pouch."
    },
    {
        id: 3,
        author: "Elena Rostova",
        role: "Fitness Instructor",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        title: "Perfect guilt-free evening snack.",
        content: "The Strawberry chips are insane! They give me that sweet crisp fix before my evening workouts without spiking my blood sugar or adding empty calories."
    },
    {
        id: 4,
        author: "David Miller",
        role: "College Student",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        title: "Essential late-night study snack!",
        content: "I subscribed to the monthly Variety Box. It keeps my energy steady through exams. Clean ingredients, fantastic crunch, and eco packaging!"
    }
];

const CRUNIQUE_FAQS = [
    {
        q: "Are Crunique fruit chips fried?",
        a: "No! Crunique fruit chips are 100% baked or gently freeze-dried at low temperatures to lock in nutrients, natural flavors, and maximum crunch. We use zero oil and zero deep-fryers."
    },
    {
        q: "Do you use any preservatives or added sugars?",
        a: "Never. Our fruit chips contain 100% pure real fruit with zero artificial preservatives, added cane sugar, high-fructose corn syrup, or synthetic colorings. The sweetness comes exclusively from nature."
    },
    {
        q: "How long do Crunique fruit chips stay fresh?",
        a: "Unopened pouches stay fresh for up to 12 months thanks to our multi-layer eco-barrier seal. Once opened, seal tightly with the built-in zip slider and consume within 7 days for peak crispness."
    },
    {
        q: "Are all products 100% Vegan and Gluten-Free?",
        a: "Yes! All Crunique fruit chip flavors are naturally 100% vegan, plant-based, gluten-free, non-GMO, and produced in a nut-free facility."
    },
    {
        q: "How does the Crunique Monthly Subscription work?",
        a: "Our subscription box lets you choose your favorite 4, 8, or 12 packs delivered monthly. You get 20% off retail price, free express shipping, and exclusive access to seasonal fruit drops. Cancel or skip anytime with 1 click."
    }
];

const CRUNIQUE_BLOGS = [
    {
        id: 1,
        title: "5 Mindful Snacking Hacks to Beat Afternoon Slumps",
        category: "Healthy Living",
        readTime: "4 min read",
        date: "July 28, 2026",
        image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&auto=format&fit=crop&q=80",
        excerpt: "Learn how replacing processed junk with naturally fiber-rich fruit chips can sustain your energy and focus through long working hours."
    },
    {
        id: 2,
        title: "Dehydration vs. Baking: The Science Behind the Crunch",
        category: "Our Process",
        readTime: "6 min read",
        date: "July 20, 2026",
        image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=600&auto=format&fit=crop&q=80",
        excerpt: "Discover how low-temperature dehydration preserves up to 94% of raw fruit vitamins while creating the ultimate crisp texture."
    },
    {
        id: 3,
        title: "3 Easy Acai & Fruit Chip Smoothie Bowls You'll Love",
        category: "Recipes",
        readTime: "5 min read",
        date: "July 12, 2026",
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&auto=format&fit=crop&q=80",
        excerpt: "Elevate your morning breakfast bowl with crunchy freeze-dried strawberry and pineapple toppings for antioxidant richness."
    }
];

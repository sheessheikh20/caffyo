/* ============================================================
   CAFFYO by Zauq - Official Menu & Cart Module
   Transcribed directly from the authentic CAFFYO printed menu
   ============================================================ */

const CAFFYO_MENU_ITEMS = [
  // --- HOT COFFEE, CREAM & MILK ---
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'hot-coffee',
    price: 109,
    dietary: 'veg',
    tag: 'Classic',
    image: 'assets/images/hero_coffee.jpg',
    description: 'Balanced rich espresso with textured velvety steamed milk and a dense microfoam head.',
    flavors: ['Classic Crema', 'Bold', 'Velvety']
  },
  {
    id: 'cafe-latte',
    name: 'Cafe Latte',
    category: 'hot-coffee',
    price: 119,
    dietary: 'veg',
    tag: 'Popular',
    image: 'assets/images/hero_coffee.jpg',
    description: 'Smooth, comforting espresso poured with silky microfoam milk and artisanal latte art.',
    flavors: ['Mild', 'Silky', 'Creamy']
  },
  {
    id: 'spanish-latte',
    name: 'Spanish Latte',
    category: 'hot-coffee',
    price: 149,
    dietary: 'veg',
    tag: "Chef's Special",
    image: 'assets/images/hero_coffee.jpg',
    description: 'Our signature espresso sweetened with rich condensed milk and steamed velvet milk.',
    flavors: ['Sweet Caramelized Milk', 'Dark Roast', 'Indulgent']
  },
  {
    id: 'sea-salt-mocha-caramel',
    name: 'Sea Salt Mocha / Caramel',
    category: 'hot-coffee',
    price: 149,
    dietary: 'veg',
    tag: 'Must Try',
    image: 'assets/images/hero_coffee.jpg',
    description: 'Decadent chocolate mocha or caramel infused with flakes of sea salt to elevate sweetness.',
    flavors: ['Sea Salt', 'Cocoa', 'Caramel Glaze']
  },
  {
    id: 'hazelnut-latte',
    name: 'Hazelnut Latte',
    category: 'hot-coffee',
    price: 139,
    dietary: 'veg',
    tag: 'Aromatic',
    image: 'assets/images/hero_coffee.jpg',
    description: 'Silky latte swirled with roasted hazelnut essence and a golden crema finish.',
    flavors: ['Toasted Hazelnut', 'Nutty', 'Smooth']
  },
  {
    id: 'caramel-latte',
    name: 'Caramel Latte',
    category: 'hot-coffee',
    price: 139,
    dietary: 'veg',
    tag: 'Sweet',
    image: 'assets/images/hero_coffee.jpg',
    description: 'Rich espresso folded with slow-cooked buttery caramel syrup and steamed milk.',
    flavors: ['Buttery Caramel', 'Velvety', 'Sweet']
  },
  {
    id: 'smooth-mocha',
    name: 'Smooth Mocha',
    category: 'hot-coffee',
    price: 139,
    dietary: 'veg',
    tag: 'Chocolatey',
    image: 'assets/images/hero_coffee.jpg',
    description: 'Dark roasted espresso blended harmoniously with melted Dutch cocoa and microfoam.',
    flavors: ['Dark Chocolate', 'Espresso', 'Creamy']
  },
  {
    id: 'vanilla-latte',
    name: 'Vanilla Latte',
    category: 'hot-coffee',
    price: 139,
    dietary: 'veg',
    tag: 'Classic',
    image: 'assets/images/hero_coffee.jpg',
    description: 'Pure Madagascar vanilla infusion with double espresso and velvety textured milk.',
    flavors: ['Vanilla Bean', 'Smooth', 'Aromatic']
  },
  {
    id: 'mocha-caramel-latte',
    name: 'Mocha Caramel Latte',
    category: 'hot-coffee',
    price: 139,
    dietary: 'veg',
    tag: 'Dual Flavor',
    image: 'assets/images/hero_coffee.jpg',
    description: 'The best of both worlds: bittersweet dark cocoa and golden caramel drizzle.',
    flavors: ['Cocoa', 'Caramel Drizzle', 'Rich']
  },

  // --- BLACK COFFEE ---
  {
    id: 'ristretto',
    name: 'Ristretto',
    category: 'hot-coffee',
    price: 79,
    dietary: 'vegan',
    tag: 'Intense',
    image: 'assets/images/hero_coffee.jpg',
    description: 'Short, concentrated single extraction pulling sweet fruity origin notes without bitterness.',
    flavors: ['Sweet Acidity', 'Dense Crema', 'Intense']
  },
  {
    id: 'espresso',
    name: 'Espresso Single',
    category: 'hot-coffee',
    price: 89,
    dietary: 'vegan',
    tag: 'Pure',
    image: 'assets/images/hero_coffee.jpg',
    description: 'Single-origin Arabica extracted under 9 bars of pressure with golden hazelnut crema.',
    flavors: ['Rich Body', 'Hazelnut Crema', 'Bold']
  },
  {
    id: 'americano',
    name: 'Americano',
    category: 'hot-coffee',
    price: 99,
    dietary: 'vegan',
    tag: 'Pure Black',
    image: 'assets/images/hero_coffee.jpg',
    description: 'Double shot of bold espresso diluted with hot mineral water for a clean, lingering sip.',
    flavors: ['Clean', 'Roasted Cocoa', 'Warm']
  },

  // --- ICED COFFEE & COLD BREWS ---
  {
    id: 'spanish-ice-latte',
    name: 'Spanish Ice Latte',
    category: 'iced-coldbrew',
    price: 139,
    dietary: 'veg',
    tag: 'Best Seller',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Chilled condensed milk base topped with ice, cold-whipped milk, and double espresso float.',
    flavors: ['Sweet Condensed Milk', 'Chilled', 'Marble Crema']
  },
  {
    id: 'ice-latte',
    name: 'Ice Latte',
    category: 'iced-coldbrew',
    price: 109,
    dietary: 'veg',
    tag: 'Refreshing',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Crisp cold milk poured over ice rocks and crowned with fresh espresso.',
    flavors: ['Crisp', 'Smooth', 'Chilled']
  },
  {
    id: 'ice-americano',
    name: 'Ice Americano',
    category: 'iced-coldbrew',
    price: 99,
    dietary: 'vegan',
    tag: 'K-Drama Style',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Bold double espresso poured over iced crystal water for the ultimate crisp pick-me-up.',
    flavors: ['Crisp', 'Zero Sugar', 'Bold']
  },
  {
    id: 'belgium-chocolate-ice',
    name: 'Belgium Chocolate Ice',
    category: 'iced-coldbrew',
    price: 139,
    dietary: 'veg',
    tag: 'Indulgent',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Iced coffee swirled with rich melted Belgian chocolate and chocolate dusting.',
    flavors: ['Belgian Cocoa', 'Chilled', 'Decadent']
  },
  {
    id: 'affogato-iced-latte',
    name: 'Affogato Iced Latte',
    category: 'iced-coldbrew',
    price: 139,
    dietary: 'veg',
    tag: 'Italian Classic',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Creamy artisanal vanilla bean gelato melting into a bath of piping hot double espresso and iced milk.',
    flavors: ['Vanilla Gelato', 'Melting Espresso', 'Velvet']
  },
  {
    id: 'caffyo-on-the-rocks',
    name: 'Caffyo On The Rocks',
    category: 'iced-coldbrew',
    price: 139,
    dietary: 'vegan',
    tag: 'Signature Cold Brew',
    image: 'assets/images/spanish_latte.jpg',
    description: '18-hour cold steeped single-origin Arabica served over crystal clear ice rock.',
    flavors: ['Naturally Sweet', 'Low Acidity', 'Subtle Fruit']
  },
  {
    id: 'vietnamese-cold-brew',
    name: 'Vietnamese Cold Brew',
    category: 'iced-coldbrew',
    price: 139,
    dietary: 'veg',
    tag: 'Rich & Sweet',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Deep, slow-extracted cold brew poured over thick sweet condensed milk layer.',
    flavors: ['Condensed Milk', 'Dark Roast', 'Caramel']
  },
  {
    id: 'cold-brew-tonic',
    name: 'Tonic Water Cold Brew',
    category: 'iced-coldbrew',
    price: 139,
    dietary: 'vegan',
    tag: 'Sparkling Sensation',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Sparkling botanical tonic water layered with bold cold brew and fresh citrus peel.',
    flavors: ['Fizzy', 'Citrus Peel', 'Crisp']
  },
  {
    id: 'yuzu-cold-brew',
    name: 'Yuzu Cold Brew',
    category: 'iced-coldbrew',
    price: 149,
    dietary: 'vegan',
    tag: 'Exotic Citrus',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Japanese Yuzu citrus botanical reduction infused with our 18-hour signature cold brew.',
    flavors: ['Yuzu Citrus', 'Aromatic', 'Bright']
  },
  {
    id: 'roses-cold-brew',
    name: 'Roses Cold Brew',
    category: 'iced-coldbrew',
    price: 149,
    dietary: 'vegan',
    tag: 'Floral Note',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Organic Damascus rose water essence gently infused with smooth cold brew.',
    flavors: ['Rose Petals', 'Floral', 'Smooth']
  },

  // --- THIK FRAPPES & SHAKES ---
  {
    id: 'kaapi-nirvana-blast',
    name: 'Kaapi Nirvana Blast Frappe',
    category: 'frappes-shakes',
    price: 179,
    dietary: 'veg',
    tag: 'Legendary Special',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Our top signature frappe: concentrated South Indian kaapi decoction blended with cream, chocolate chunks, and cookies.',
    flavors: ['Filter Coffee Punch', 'Creamy Crunch', 'Chilled Nirvana']
  },
  {
    id: 'chocolate-brownie-frappe',
    name: 'Chocolate Brownie Frappe',
    category: 'frappes-shakes',
    price: 179,
    dietary: 'veg',
    tag: 'Fudge Loaded',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Thick espresso shake blended with entire chunks of baked fudge brownie and hot fudge drizzle.',
    flavors: ['Fudge Brownie', 'Double Cocoa', 'Whipped Cream']
  },
  {
    id: 'ferrero-rocher-frappe',
    name: 'Ferrero Rocher Frappe',
    category: 'frappes-shakes',
    price: 169,
    dietary: 'veg',
    tag: 'Nutty Luxury',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Whole Ferrero Rocher crushed with hazelnut cream, espresso, and crispy wafer pearls.',
    flavors: ['Toasted Hazelnut', 'Wafer Crunch', 'Milk Chocolate']
  },
  {
    id: 'nutella-choco-frappe',
    name: 'Nutella Choco Frappe',
    category: 'frappes-shakes',
    price: 159,
    dietary: 'veg',
    tag: 'Nutella Lover',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Generous spoonfuls of Italian Nutella whipped with cold espresso and ice cream.',
    flavors: ['Nutella', 'Hazelnut Cream', 'Chilled']
  },
  {
    id: 'oreo-crunch-shake',
    name: 'Oreo Crunch Thik Shake',
    category: 'frappes-shakes',
    price: 139,
    dietary: 'veg',
    tag: 'Thik Shake',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Super-thick vanilla ice cream shake packed with pulverized Oreo cookies and chocolate drizzle.',
    flavors: ['Oreo Cookie', 'Vanilla Bean', 'Thick']
  },
  {
    id: 'kit-kat-crunch-shake',
    name: 'Kit Kat Crunch Thik Shake',
    category: 'frappes-shakes',
    price: 139,
    dietary: 'veg',
    tag: 'Crispy',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Crispy Kit Kat fingers blended into thick sweet cream with cocoa dust.',
    flavors: ['Kit Kat Wafer', 'Creamy', 'Crisp']
  },
  {
    id: 'alphonso-mango-shake',
    name: 'Alphonso Mango Thik Shake',
    category: 'frappes-shakes',
    price: 139,
    dietary: 'veg',
    tag: 'Fruity',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Pure Ratnagiri Alphonso mango pulp blended with rich dairy ice cream.',
    flavors: ['King Mango', 'Tropical Sweet', 'Velvety']
  },

  // --- HOT CHOCOLATE ---
  {
    id: 'belgium-hot-chocolate',
    name: 'Belgium Hot Chocolate',
    category: 'hot-chocolate',
    price: 139,
    dietary: 'veg',
    tag: 'Pure Luxury',
    image: 'assets/images/hero_coffee.jpg',
    description: 'Silky melted Belgian dark chocolate ganache whisked into warm milk with mini marshmallows.',
    flavors: ['Pure Belgian Cocoa', 'Melted Ganache', 'Cozy Warmth']
  },
  {
    id: 'madagascar-hot-chocolate',
    name: 'Madagascar Hot Chocolate',
    category: 'hot-chocolate',
    price: 149,
    dietary: 'veg',
    tag: 'Chef Choice',
    image: 'assets/images/hero_coffee.jpg',
    description: 'Single-origin Madagascar chocolate with natural berry undertones and aromatic warmth.',
    flavors: ['Red Berry Notes', 'Bittersweet Cocoa', 'Rich Cream']
  },

  // --- TOASTY & PANINIS & BURGERS ---
  {
    id: 'cheese-chilli-toast',
    name: 'Cheese Chilli Toast',
    category: 'toast-sandwiches',
    price: 150,
    dietary: 'veg',
    tag: 'Spicy Favorite',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Artisan country bread heaped with melted mozzarella, cheddar, finely chopped green chillies and herbs.',
    flavors: ['Gooey Cheese', 'Green Chilli Kick', 'Toasted Crunch']
  },
  {
    id: 'creamy-mushroom-toast',
    name: 'Creamy Mushroom Toast',
    category: 'toast-sandwiches',
    price: 150,
    dietary: 'veg',
    tag: 'Gourmet',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Sautéed button and cremini mushrooms in a garlic thyme cream sauce over toasted sourdough.',
    flavors: ['Garlic Butter', 'Wild Mushrooms', 'Herbs']
  },
  {
    id: 'paneer-pastrani-toast',
    name: 'Paneer Pastrani Toast',
    category: 'toast-sandwiches',
    price: 170,
    dietary: 'veg',
    tag: 'Chef Special',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Smoked spiced paneer cubes grilled with pastrami spices, pickled onions, and cheddar on crusty bread.',
    flavors: ['Smoky Spices', 'Grilled Paneer', 'Melty Cheese']
  },
  {
    id: 'chicken-pastrani-toast',
    name: 'Chicken Pastrani Toast',
    category: 'toast-sandwiches',
    price: 170,
    dietary: 'non-veg',
    tag: 'Meaty Favorite',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Slow-cured spiced chicken slices toasted with Dijon mustard, melted cheese, and fresh microgreens.',
    flavors: ['Cured Pastrami Chicken', 'Dijon Mustard', 'Golden Toast']
  },
  {
    id: 'rainbow-sandwich',
    name: 'Rainbow Sandwich',
    category: 'toast-sandwiches',
    price: 160,
    dietary: 'veg',
    tag: 'Triple Layer',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Layered with vibrant beet hummus, cucumber, mint chutney, cheddar cheese, and fresh garden tomatoes.',
    flavors: ['Fresh Mint', 'Crisp Veggies', 'Cheese']
  },
  {
    id: 'three-cheese-sandwich',
    name: 'Three Cheese Sandwich',
    category: 'toast-sandwiches',
    price: 160,
    dietary: 'veg',
    tag: 'Cheese Pull',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Golden grilled sandwich oozing with a blend of English cheddar, mozzarella, and processed cream cheese.',
    flavors: ['Triple Cheese', 'Crispy Butter Crust', 'Comfort']
  },
  {
    id: 'classic-veg-burger',
    name: 'Classic Veg Burger',
    category: 'toast-sandwiches',
    price: 150,
    dietary: 'veg',
    tag: 'Crispy Patty',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Crisp spiced herb potato patty, lettuce, sliced tomatoes, gherkins, and house special sauce in a toasted brioche bun.',
    flavors: ['Crispy Crust', 'Special Sauce', 'Toasted Brioche']
  },
  {
    id: 'space-king-chicken-burger',
    name: 'Space King Chicken Burger',
    category: 'toast-sandwiches',
    price: 180,
    dietary: 'non-veg',
    tag: 'Juicy King',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Crunchy golden fried chicken breast, chipotle mayo, melted cheese slice, and iceberg slaw.',
    flavors: ['Crunchy Chicken', 'Chipotle Heat', 'Sesame Bun']
  },

  // --- PASTA & PIZZA ---
  {
    id: 'caffyo-special-pasta',
    name: 'Caffyo Special Pasta',
    category: 'pasta-pizza',
    price: 220,
    dietary: 'veg',
    tag: "Signature Dish",
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Our head chef signature: penne tossed in a secret roasted garlic sun-dried tomato cream sauce with parmesan.',
    flavors: ['Sun-dried Tomato', 'Creamy Garlic', 'Aged Parmesan']
  },
  {
    id: 'caffyo-special-chicken-pasta',
    name: 'Caffyo Special Chicken Pasta',
    category: 'pasta-pizza',
    price: 260,
    dietary: 'non-veg',
    tag: "Chef's Non-Veg",
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Tender grilled chicken chunks tossed with penne in our signature creamy roasted pepper garlic sauce.',
    flavors: ['Tender Chicken', 'Rich Sauce', 'Italian Herbs']
  },
  {
    id: 'alfredo-pasta',
    name: 'Alfredo White Sauce Pasta',
    category: 'pasta-pizza',
    price: 200,
    dietary: 'veg',
    tag: 'Classic Italian',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Al dente penne bathed in a silky butter cream sauce with cracked black pepper and fresh basil.',
    flavors: ['Butter Cream', 'Garlic', 'Black Pepper']
  },
  {
    id: 'arrabbiata-pasta',
    name: 'Arrabbiata Red Sauce Pasta',
    category: 'pasta-pizza',
    price: 200,
    dietary: 'veg',
    tag: 'Fiery Italian',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Fiery San Marzano plum tomato sauce infused with garlic, chilli flakes, extra virgin olive oil, and herbs.',
    flavors: ['Spicy Tomato', 'Olive Oil', 'Crushed Chilli']
  },
  {
    id: 'pesto-pasta',
    name: 'Gourmet Pesto Pasta',
    category: 'pasta-pizza',
    price: 210,
    dietary: 'veg',
    tag: 'Aromatic Green',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Fragrant sweet basil, crushed pine nuts, garlic, and parmesan emulsified in golden olive oil.',
    flavors: ['Sweet Basil', 'Pine Nut Richness', 'Parmesan']
  },
  {
    id: 'margareta-pizza',
    name: 'Margareta Pizza',
    category: 'pasta-pizza',
    price: 170,
    dietary: 'veg',
    tag: 'Thin Crust',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Crisp hand-stretched dough with Italian tomato passata, fresh mozzarella cheese, and fresh sweet basil.',
    flavors: ['Melty Mozzarella', 'Sweet Tomato', 'Crispy Crust']
  },
  {
    id: 'farm-house-pizza',
    name: 'Farm House Pizza',
    category: 'pasta-pizza',
    price: 230,
    dietary: 'veg',
    tag: 'Loaded Veggies',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Topped generously with bell peppers, sweet corn, mushrooms, red onions, and mozzarella.',
    flavors: ['Garden Vegetables', 'Cheese Blend', 'Herbs']
  },
  {
    id: 'grilled-paneer-pizza',
    name: 'Grilled Paneer Pizza',
    category: 'pasta-pizza',
    price: 250,
    dietary: 'veg',
    tag: 'Desi Italian',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Tandoori-spiced paneer cubes, roasted capsicum, red onions, and gooey mozzarella.',
    flavors: ['Smoky Paneer', 'Crisp Peppers', 'Melted Cheese']
  },
  {
    id: 'chicken-pepperoni-pizza',
    name: 'Chicken Pepperoni Pizza',
    category: 'pasta-pizza',
    price: 260,
    dietary: 'non-veg',
    tag: 'All-Time Favorite',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Authentic cured chicken pepperoni slices crisped to perfection over rich tomato sauce and bubbling cheese.',
    flavors: ['Spiced Pepperoni', 'Crispy Edges', 'Rich Tomato']
  },
  {
    id: 'veg-pesto-pizza',
    name: 'Veg Pesto Pizza',
    category: 'pasta-pizza',
    price: 260,
    dietary: 'veg',
    tag: 'Gourmet Green',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Basil pesto base topped with cherry tomatoes, bocconcini pearls, black olives, and balsamic glaze.',
    flavors: ['Basil Pesto', 'Bocconcini', 'Balsamic Sweetness']
  },

  // --- APPETISERS & SIDES ---
  {
    id: 'peri-peri-fries',
    name: 'Peri Peri Crispy Fries',
    category: 'appetisers',
    price: 150,
    dietary: 'veg',
    tag: 'Best Seller',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Golden skin-on french fries tossed in an aromatic South African peri peri spice rub.',
    flavors: ['Fiery Spice', 'Crispy Golden', 'Tangy Heat']
  },
  {
    id: 'cheese-loaded-fries',
    name: 'Cheese Loaded Fries',
    category: 'appetisers',
    price: 180,
    dietary: 'veg',
    tag: 'Loaded Snack',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Crispy fries smothered in hot warm cheese sauce, jalapeno slices, and salsa drizzle.',
    flavors: ['Liquid Cheese', 'Jalapeno Kick', 'Crisp Potato']
  },
  {
    id: 'cheese-balls',
    name: 'Crispy Cheese Balls',
    category: 'appetisers',
    price: 160,
    dietary: 'veg',
    tag: 'Crunchy Melt',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Panko breadcrumb crusted spheres with molten cheddar and mozzarella center, served with garlic mayo.',
    flavors: ['Crispy Panko', 'Gooey Center', 'Garlic Mayo']
  },
  {
    id: 'honey-chilli-potato',
    name: 'Honey Chilli Potato',
    category: 'appetisers',
    price: 170,
    dietary: 'veg',
    tag: 'Sweet & Spicy',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Crisp wok-tossed potato fingers glazed in wild honey, toasted sesame, and chilli garlic sauce.',
    flavors: ['Sticky Honey', 'Red Chilli', 'Toasted Sesame']
  },
  {
    id: 'chicken-popcorn',
    name: 'Crunchy Chicken Popcorn',
    category: 'appetisers',
    price: 190,
    dietary: 'non-veg',
    tag: 'Bite Size',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Tender chicken breast nuggets coated in crunchy herb batter and fried golden.',
    flavors: ['Crunchy Batter', 'Juicy Chicken', 'Herbs']
  },
  {
    id: 'honey-chilli-wings',
    name: 'Honey Chilli Wings',
    category: 'appetisers',
    price: 240,
    dietary: 'non-veg',
    tag: 'Specialty Wings',
    image: 'assets/images/gourmet_bites.jpg',
    description: 'Crispy chicken wings glazed with honey chilli sauce, spring onions, and toasted sesame.',
    flavors: ['Sticky Sweet', 'Chilli Heat', 'Succulent Wings']
  },

  // --- MOCKTAILS & REFRESHING ICED TEAS ---
  {
    id: 'mind-peace-mojito',
    name: 'Mind Peace Mojito',
    category: 'mocktails-tea',
    price: 139,
    dietary: 'vegan',
    tag: 'Signature Refresh',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Fresh crushed garden mint, citrus wedges, botanical syrup, and sparkling soda over ice.',
    flavors: ['Crisp Mint', 'Zesty Lime', 'Effervescent']
  },
  {
    id: 'blue-lagoon',
    name: 'Blue Lagoon Mocktail',
    category: 'mocktails-tea',
    price: 119,
    dietary: 'vegan',
    tag: 'Vibrant Blue',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Blue Curacao citrus reduction shaken with lemonade and fizzing mineral water.',
    flavors: ['Curacao Orange', 'Zesty Lemon', 'Chilled']
  },
  {
    id: 'peach-ice-tea',
    name: 'Peach Ice Tea',
    category: 'mocktails-tea',
    price: 139,
    dietary: 'vegan',
    tag: 'Summer Sip',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Slow-brewed Assam black tea infused with sweet peach nectar and lemon wheel.',
    flavors: ['Ripe Peach', 'Black Tea Crisp', 'Chilled']
  },
  {
    id: 'lemon-ice-tea',
    name: 'Lemon Ice Tea',
    category: 'mocktails-tea',
    price: 119,
    dietary: 'vegan',
    tag: 'Classic',
    image: 'assets/images/spanish_latte.jpg',
    description: 'Chilled steeped tea sweetened with raw cane sugar and fresh Nagpur lemon juice.',
    flavors: ['Nagpur Lemon', 'Brisk Tea', 'Refreshing']
  }
];

class CaffyoCartManager {
  constructor() {
    this.cart = [];
    this.orderType = 'dinein'; // 'dinein' or 'delivery'
    this.currentCategory = 'all';
    this.searchQuery = '';

    this.init();
  }

  init() {
    this.renderMenu();
    this.bindEvents();
    this.updateCartBadge();
  }

  renderMenu() {
    const grid = document.getElementById('menu-items-grid');
    if (!grid) return;

    let items = CAFFYO_MENU_ITEMS.filter(item => {
      const matchCat = this.currentCategory === 'all' || item.category === this.currentCategory;
      const matchSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          item.flavors.some(f => f.toLowerCase().includes(this.searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted-dark);">
          <div style="font-size: 40px; margin-bottom: 12px;">☕</div>
          <h3 style="color: #fff; margin-bottom: 8px;">No Items Found</h3>
          <p>Try searching for "Spanish Latte", "Fries", "Pasta", or "Frappe".</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => `
      <div class="menu-card" data-id="${item.id}">
        <div class="card-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <div class="card-dietary-badge ${item.dietary === 'veg' ? 'veg' : (item.dietary === 'vegan' ? 'veg' : 'chef')}">
            <span>●</span> ${item.tag || (item.dietary === 'veg' ? 'Pure Veg' : (item.dietary === 'vegan' ? 'Vegan' : 'Non-Veg'))}
          </div>
          <div class="card-price-tag">₹${item.price}</div>
        </div>
        <div class="card-body">
          <h3 class="card-title">${item.name}</h3>
          <p class="card-desc">${item.description}</p>
          <div class="card-footer">
            <div class="flavor-tags">
              ${item.flavors.map(f => `<span class="flavor-tag">${f}</span>`).join('')}
            </div>
            <button class="btn-add-item" data-add-id="${item.id}" title="Add to Order" aria-label="Add ${item.name}">
              +
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Bind item click
    grid.querySelectorAll('[data-add-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-add-id');
        this.addItemById(id);
      });
    });
  }

  addItemById(id) {
    const item = CAFFYO_MENU_ITEMS.find(i => i.id === id);
    if (!item) return;

    const existing = this.cart.find(i => i.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ ...item, qty: 1 });
    }

    if (window.caffyoAudio) {
      window.caffyoAudio.playChime(784, 0.15);
    }

    this.showToast(`Added ${item.name} (₹${item.price}) to tray!`);
    this.updateCartBadge();
    this.renderCartDrawer();
  }

  addCustomBrew(customBrew) {
    this.cart.push(customBrew);
    if (window.caffyoAudio) {
      window.caffyoAudio.playChime(880, 0.2);
    }
    this.showToast(`Assembled Custom Brew added to tray!`);
    this.updateCartBadge();
    this.renderCartDrawer();
    this.openDrawer();
  }

  removeItem(id) {
    const idx = this.cart.findIndex(i => i.id === id);
    if (idx !== -1) {
      if (this.cart[idx].qty > 1) {
        this.cart[idx].qty -= 1;
      } else {
        this.cart.splice(idx, 1);
      }
    }
    this.updateCartBadge();
    this.renderCartDrawer();
  }

  updateCartBadge() {
    const badges = document.querySelectorAll('.cart-count-badge');
    const totalCount = this.cart.reduce((sum, item) => sum + item.qty, 0);
    badges.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? 'inline-block' : 'none';
    });
  }

  renderCartDrawer() {
    const list = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');

    if (!list) return;

    if (this.cart.length === 0) {
      list.innerHTML = `
        <div class="cart-empty-state" style="text-align:center; padding: 40px 10px; color: var(--text-muted-dark);">
          <span style="font-size: 42px; display: block; margin-bottom: 10px;">☕</span>
          <h4 style="color: #fff; margin-bottom: 4px;">Your Tray is Empty</h4>
          <p style="font-size: 0.85rem;">Add some freshly pulled Spanish Lattes, Cheese Chilli Toast, or Pasta!</p>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '₹0';
      if (taxEl) taxEl.textContent = '₹0';
      if (totalEl) totalEl.textContent = '₹0';
      return;
    }

    list.innerHTML = this.cart.map(item => `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <h4 style="font-size: 0.92rem; color: #fff; margin-bottom: 2px;">${item.name}</h4>
          <p style="font-size: 0.8rem; color: var(--gold-accent);">₹${item.price} each</p>
        </div>
        <div class="cart-item-qty">
          <button class="btn-qty" data-dec="${item.id}">-</button>
          <span style="font-weight:700; min-width:20px; text-align:center; color:#fff;">${item.qty}</span>
          <button class="btn-qty" data-inc="${item.id}">+</button>
        </div>
      </div>
    `).join('');

    // +/- listeners
    list.querySelectorAll('[data-dec]').forEach(b => {
      b.addEventListener('click', () => this.removeItem(b.getAttribute('data-dec')));
    });
    list.querySelectorAll('[data-inc]').forEach(b => {
      b.addEventListener('click', () => this.addItemById(b.getAttribute('data-inc')));
    });

    const subtotal = this.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const tax = Math.round(subtotal * 0.05); // 5% GST
    const delivery = this.orderType === 'delivery' ? 30 : 0;
    const total = subtotal + tax + delivery;

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
    if (taxEl) taxEl.textContent = `₹${tax}`;
    if (totalEl) totalEl.textContent = `₹${total}`;
  }

  openDrawer() {
    const overlay = document.getElementById('cart-overlay');
    const drawer = document.getElementById('cart-drawer');
    if (overlay && drawer) {
      overlay.classList.add('open');
      drawer.classList.add('open');
      this.renderCartDrawer();
    }
  }

  closeDrawer() {
    const overlay = document.getElementById('cart-overlay');
    const drawer = document.getElementById('cart-drawer');
    if (overlay && drawer) {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
    }
  }

  bindEvents() {
    // Nav cart trigger
    const navCartBtn = document.getElementById('btn-nav-cart');
    if (navCartBtn) {
      navCartBtn.addEventListener('click', () => this.openDrawer());
    }

    // Dock mobile cart trigger
    const dockTrayBtn = document.getElementById('btn-dock-tray');
    if (dockTrayBtn) {
      dockTrayBtn.addEventListener('click', () => this.openDrawer());
    }

    // Close button
    const closeBtn = document.getElementById('btn-close-cart');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    const overlay = document.getElementById('cart-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeDrawer();
      });
    }

    // Category Tabs in full menu
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.getAttribute('data-category');
        this.renderMenu();
        if (window.caffyoAudio) window.caffyoAudio.playBeanClick();
      });
    });

    // Reference best-seller underline tabs
    document.querySelectorAll('.editorial-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.editorial-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        // Map filter to category and scroll into view or trigger
        if (filter === 'all') this.currentCategory = 'all';
        if (filter === 'brews') this.currentCategory = 'hot-coffee';
        if (filter === 'bites') this.currentCategory = 'toast-sandwiches';
        if (filter === 'desserts') this.currentCategory = 'frappes-shakes';

        document.querySelectorAll('.category-btn').forEach(cb => {
          if (cb.getAttribute('data-category') === this.currentCategory) {
            cb.classList.add('active');
          } else {
            cb.classList.remove('active');
          }
        });

        this.renderMenu();
      });
    });

    // Best-seller card order buttons
    document.querySelectorAll('.ref-order-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-add-id');
        this.addItemById(id);
      });
    });

    // Search Input
    const searchInput = document.getElementById('menu-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderMenu();
      });
    }

    // Order type toggles
    document.querySelectorAll('.btn-order-type').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-order-type').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.orderType = btn.getAttribute('data-type');
        this.renderCartDrawer();
      });
    });

    // Checkout button
    const checkoutBtn = document.getElementById('btn-checkout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (this.cart.length === 0) {
          this.showToast('Please add items to your tray first!');
          return;
        }
        this.completeOrder();
      });
    }
  }

  completeOrder() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = this.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const total = subtotal + Math.round(subtotal * 0.05);

    if (window.caffyoAudio) {
      window.caffyoAudio.playChime(1046.5, 0.3);
    }

    alert(`Order Placed at CAFFYO by Zauq, Nagpur!\n\nOrder Mode: ${this.orderType === 'dinein' ? 'Dine-In Table' : 'Doorstep Delivery'}\nTotal Items: ${totalCount}\nPayable Amount: ₹${total}\n\nOur baristas at Prestige Hospital Chowk have received your ticket! Anushka and our kitchen team are crafting it right now.`);

    this.cart = [];
    this.updateCartBadge();
    this.renderCartDrawer();
    this.closeDrawer();
    this.showToast('Order confirmed by Barista counter');
  }

  showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-15px)';
      toast.style.transition = '0.35s ease';
      setTimeout(() => toast.remove(), 350);
    }, 2800);
  }
}

window.caffyoCart = new CaffyoCartManager();

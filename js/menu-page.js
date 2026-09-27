/* ============================================================
   CAFFYO by Zauq - Dedicated Menu Website Logic
   Full categorization directly from official printed menu
   ============================================================ */

const CAFFYO_SECTIONS_DATA = [
  {
    id: 'hot-coffee',
    title: 'Hot Coffee Cream & Milk',
    icon: '☕',
    items: [
      { id: 'cappuccino', name: 'Cappuccino', price: 109, type: 'veg', desc: 'Espresso balanced with steamed milk and dense velvety foam' },
      { id: 'cafe-latte', name: 'Cafe Latte', price: 119, type: 'veg', desc: 'Smooth espresso poured with silky microfoam swan art' },
      { id: 'caramel-latte', name: 'Caramel Latte', price: 139, type: 'veg', desc: 'Buttery slow-cooked caramel syrup swirled with espresso & milk' },
      { id: 'hazelnut-latte', name: 'Hazelnut Latte', price: 139, type: 'veg', desc: 'Toasted aromatic hazelnut infusion with creamy latte' },
      { id: 'smooth-mocha', name: 'Smooth Mocha', price: 139, type: 'veg', desc: 'Rich espresso folded with molten Dutch chocolate' },
      { id: 'vanilla-latte', name: 'Vanilla Latte', price: 139, type: 'veg', desc: 'Pure Madagascar vanilla essence with smooth steamed milk' },
      { id: 'mocha-caramel-latte', name: 'Mocha Caramel Latte', price: 139, type: 'veg', desc: 'Double indulgence: bittersweet cocoa and golden caramel drizzle' },
      { id: 'spanish-latte', name: 'Spanish Latte', price: 149, type: 'veg', desc: 'Signature espresso pulled over rich condensed milk and velvet microfoam' },
      { id: 'sea-salt-mocha-caramel', name: 'Sea Salt Mocha / Caramel', price: 149, type: 'veg', desc: 'Flakes of sea salt cutting through dark cocoa or caramel sweetness' }
    ]
  },
  {
    id: 'black-coffee',
    title: 'Black Coffee',
    icon: '🫘',
    items: [
      { id: 'ristretto', name: 'Ristretto', price: 79, type: 'veg', desc: 'Short extraction pulling sweet, dense origin notes without bitterness' },
      { id: 'espresso', name: 'Espresso', price: 89, type: 'veg', desc: 'Single-origin Arabica pulled under 9 bars with hazelnut crema' },
      { id: 'americano', name: 'Americano', price: 99, type: 'veg', desc: 'Double espresso pulled over hot mineral water for a clean lingering cup' }
    ]
  },
  {
    id: 'hot-chocolate',
    title: 'Hot Chocolate',
    icon: '🍫',
    items: [
      { id: 'plain-hot-chocolate', name: 'Plain Hot Chocolate', price: 119, type: 'veg', desc: 'Comforting warm cocoa whisked with steamed whole milk' },
      { id: 'belgium-hot-chocolate', name: 'Belgium Hot Chocolate', price: 139, type: 'veg', desc: 'Silky melted Belgian dark chocolate ganache' },
      { id: 'caramel-hot-chocolate', name: 'Caramel Hot Chocolate', price: 139, type: 'veg', desc: 'Hot chocolate infused with buttery caramel sauce' },
      { id: 'hazelnut-hot-chocolate', name: 'Hazelnut Hot Chocolate', price: 139, type: 'veg', desc: 'Warm chocolate blended with roasted hazelnut butter' },
      { id: 'madagascar-hot-chocolate', name: 'Madagascar Hot Chocolate', price: 149, type: 'veg', desc: 'Single-origin Madagascar dark cocoa with fruity berry warmth' }
    ]
  },
  {
    id: 'iced-coffee',
    title: 'Iced Coffee',
    icon: '🧊',
    items: [
      { id: 'ice-americano', name: 'Ice Americano', price: 99, type: 'veg', desc: 'Crisp double espresso poured over sparkling iced water' },
      { id: 'ice-latte', name: 'Ice Latte', price: 109, type: 'veg', desc: 'Chilled milk over ice rocks crowned with freshly pulled espresso' },
      { id: 'caramel-ice-latte', name: 'Caramel Ice Latte', price: 129, type: 'veg', desc: 'Iced latte marbled with rich caramel ribbons' },
      { id: 'hazelnut-ice-mocha', name: 'Hazelnut Ice Mocha', price: 129, type: 'veg', desc: 'Chilled cocoa and hazelnut shaken with ice and espresso' },
      { id: 'belgium-chocolate-ice', name: 'Belgium Chocolate Ice', price: 139, type: 'veg', desc: 'Iced coffee shaken with rich Belgian chocolate ganache' },
      { id: 'affogato-iced-latte', name: 'Affogato Iced Latte', price: 139, type: 'veg', desc: 'Artisanal vanilla bean gelato melting into hot double espresso' },
      { id: 'creamy-ice-latte', name: 'Creamy Ice Latte', price: 139, type: 'veg', desc: 'Dense extra-creamy cold milk with double shot espresso' },
      { id: 'spanish-ice-latte', name: 'Spanish Ice Latte', price: 139, type: 'veg', desc: 'Chilled condensed milk layered with cold milk and espresso' }
    ]
  },
  {
    id: 'cold-brew',
    title: 'Cold Brew (18-Hour Steep)',
    icon: '⏳',
    items: [
      { id: 'caffyo-on-the-rocks', name: 'Caffyo On The Rocks', price: 139, type: 'veg', desc: 'Slow-steeped Arabica cold brew served over a crystal ice rock' },
      { id: 'vietnamese-cold-brew', name: 'Vietnamese Cold Brew', price: 139, type: 'veg', desc: 'Deep bold cold brew over a sweet condensed milk base' },
      { id: 'tonic-water-cold-brew', name: 'Tonic Water Cold Brew', price: 139, type: 'veg', desc: 'Sparkling botanical tonic layered with cold brew and citrus' },
      { id: 'ginger-ale-cold-brew', name: 'Ginger Ale Cold Brew', price: 139, type: 'veg', desc: 'Fizzy spicy ginger ale paired with smooth cold brew' },
      { id: 'cranberry-cold-brew', name: 'Cranberry Cold Brew', price: 139, type: 'veg', desc: 'Tart ruby cranberry juice with cold-extracted coffee' },
      { id: 'basil-cold-brew', name: 'Basil Cold Brew', price: 149, type: 'veg', desc: 'Fresh garden sweet basil leaves infused with cold brew' },
      { id: 'basil-blossom-cold-brew', name: 'Basil Blossom Cold Brew', price: 149, type: 'veg', desc: 'Botanical blossom nectar with basil and smooth cold brew' },
      { id: 'fruit-fusion-cold-brew', name: 'Fruit Fusion Cold Brew', price: 149, type: 'veg', desc: 'Muddled seasonal berry reduction shaken with cold brew' },
      { id: 'roses-cold-brew', name: 'Roses Cold Brew', price: 149, type: 'veg', desc: 'Organic Damascus rose water essence with smooth iced coffee' },
      { id: 'yuzu-cold-brew', name: 'Yuzu Cold Brew', price: 149, type: 'veg', desc: 'Aromatic Japanese citrus yuzu paired with signature cold brew' }
    ]
  },
  {
    id: 'thik-frappe',
    title: 'Cold Coffee / Thik Frappe',
    icon: '🥤',
    items: [
      { id: 'vanilla-frappe', name: 'Vanilla Frappe', price: 139, type: 'veg', desc: 'Chilled blended espresso with vanilla ice cream and cream' },
      { id: 'frozen-moca-frappe', name: 'Frozen Mocha Frappe', price: 149, type: 'veg', desc: 'Thick blended cocoa and espresso with dark chocolate chips' },
      { id: 'caramel-friz-frappe', name: 'Caramel Friz Frappe', price: 149, type: 'veg', desc: 'Blended espresso with rich salted caramel drizzle' },
      { id: 'hazelnut-frappe', name: 'Hazelnut Frappe', price: 149, type: 'veg', desc: 'Thick hazelnut cream blended with double espresso' },
      { id: 'choco-chips-cookies-frappe', name: 'Choco Chips Cookies Frappe', price: 149, type: 'veg', desc: 'Crushed cookies and crunchy chocolate chips in thick frappe' },
      { id: 'oreo-crunch-frappe', name: 'Oreo Crunch Frappe', price: 159, type: 'veg', desc: 'Real Oreo cookies pulverized with chilled coffee and cream' },
      { id: 'dark-chocolate-frappe', name: 'Dark Chocolate Frappe', price: 159, type: 'veg', desc: '70% dark cocoa blended with espresso and chocolate ice cream' },
      { id: 'double-chocolate-frappe', name: 'Double Chocolate Frappe', price: 159, type: 'veg', desc: 'Double shot of chocolate fudge with dark chocolate pearls' },
      { id: 'nutella-choco-frappe', name: 'Nutella Choco Frappe', price: 159, type: 'veg', desc: 'Generous spoonfuls of Italian Nutella whipped with coffee' },
      { id: 'nutty-vanilla-frappe', name: 'Nutty Vanilla Frappe', price: 169, type: 'veg', desc: 'Roasted almonds and cashews blended with vanilla bean frappe' },
      { id: 'ferrero-rocher-frappe', name: 'Ferrero Rocher Frappe', price: 169, type: 'veg', desc: 'Whole Ferrero Rocher crushed with hazelnut chocolate cream' },
      { id: 'chocolate-brownie-frappe', name: 'Chocolate Brownie Frappe', price: 179, type: 'veg', desc: 'Dense baked fudge brownie blended into thick coffee frappe' },
      { id: 'kaapi-nirvana-blast', name: 'Kaapi Nirvana Blast', price: 179, type: 'veg', desc: 'Top signature: South Indian kaapi decoction blast with cookies & cream' },
      { id: 'caramel-cookies-frappe', name: 'Caramel Cookies Frappe', price: 179, type: 'veg', desc: 'Crunchy caramel biscoff biscuits blended with thick cream' }
    ]
  },
  {
    id: 'thik-shakes',
    title: 'Thik Shakes',
    icon: '🥛',
    items: [
      { id: 'alphonso-mango', name: 'Alphonso Mango Shake', price: 139, type: 'veg', desc: 'Pure Ratnagiri Alphonso mango pulp blended with rich cream' },
      { id: 'kit-kat-crunch', name: 'Kit Kat Crunch Shake', price: 139, type: 'veg', desc: 'Crispy Kit Kat wafers pulverized into thick vanilla shake' },
      { id: 'oreo-crunch-shake', name: 'Oreo Crunch Shake', price: 139, type: 'veg', desc: 'Classic thick shake loaded with crunchy Oreo cookie bits' },
      { id: 'butterscotch-crunch', name: 'Butterscotch Crunch Shake', price: 149, type: 'veg', desc: 'Golden butterscotch praline crunch in creamy ice cream shake' },
      { id: 'very-berry', name: 'Very Berry Shake', price: 149, type: 'veg', desc: 'Muddled blueberries, strawberries, and raspberries in pink shake' },
      { id: 'peanut-punch', name: 'Peanut Punch Shake', price: 149, type: 'veg', desc: 'Roasted peanut butter whipped with vanilla ice cream and honey' },
      { id: 'dark-chocolate-shake', name: 'Dark Chocolate Shake', price: 149, type: 'veg', desc: 'Intense bittersweet dark chocolate thick shake' },
      { id: 'belgium-chocolate-shake', name: 'Belgium Chocolate Shake', price: 159, type: 'veg', desc: 'Thick shake made with authentic melted Belgian chocolate' },
      { id: 'caramel-crunch-shake', name: 'Caramel Crunch Shake', price: 159, type: 'veg', desc: 'Buttery caramel swirl with crunchy caramel brittle pearls' },
      { id: 'nutella-choco-shake', name: 'Nutella Choco Shake', price: 169, type: 'veg', desc: 'Loaded with real Nutella hazelnut cocoa spread' },
      { id: 'nutella-peanut-shake', name: 'Nutella Peanut Shake', price: 169, type: 'veg', desc: 'Decadent duo of creamy peanut butter and Italian Nutella' },
      { id: 'ferrero-rocher-shake', name: 'Ferrero Rocher Shake', price: 169, type: 'veg', desc: 'Crushed Ferrero Rocher pralines in rich hazelnut shake' },
      { id: 'choco-seduction', name: 'Choco Seduction Shake', price: 169, type: 'veg', desc: 'Triple chocolate overload with fudge, chips, and brownie bits' },
      { id: 'nutella-dipped-oreo', name: 'Nutella Dipped Oreo Shake', price: 169, type: 'veg', desc: 'Oreo cookies submerged in warm Nutella and blended thick' }
    ]
  },
  {
    id: 'toasty',
    title: 'Toasty',
    icon: '🍞',
    items: [
      { id: 'cheese-chilli-toast', name: 'Cheese Chilli Toast', price: 150, type: 'veg', desc: 'Toasted sourdough loaded with melted mozzarella, cheddar & fiery green chillies' },
      { id: 'creamy-mushroom-toast', name: 'Creamy Mushroom Toast', price: 150, type: 'veg', desc: 'Sautéed mushrooms in garlic thyme cream over crusty toast' },
      { id: 'chicken-pastrani-toast', name: 'Chicken Pastrani Toast', price: 170, type: 'nonveg', desc: 'Spiced chicken slices with Dijon mustard and melted cheddar' },
      { id: 'paneer-pastrani-toast', name: 'Paneer Pastrani Toast', price: 170, type: 'veg', desc: 'Smoked paneer cubes with pastrami spices, pickled onions & cheese' }
    ]
  },
  {
    id: 'appetisers',
    title: 'Appetisers & Starters',
    icon: '🍟',
    items: [
      { id: 'salted-fries', name: 'Salted French Fries', price: 140, type: 'veg', desc: 'Crispy golden potato fries seasoned with sea salt' },
      { id: 'peri-peri-fries', name: 'Peri Peri Fries', price: 150, type: 'veg', desc: 'Tossed in bold, fiery African peri peri spice rub' },
      { id: 'cheese-balls', name: 'Cheese Balls', price: 160, type: 'veg', desc: 'Crispy panko spheres with gooey molten cheese center' },
      { id: 'honey-chilli-potato', name: 'Honey Chilli Potato', price: 170, type: 'veg', desc: 'Crisp potato fingers glazed in wild honey and sesame chilli sauce' },
      { id: 'cheese-loaded-fries', name: 'Cheese Loaded Fries', price: 180, type: 'veg', desc: 'Smothered in hot cheddar sauce, jalapenos and salsa' },
      { id: 'cheese-veg-nachos', name: 'Cheese Veg Nachos', price: 190, type: 'veg', desc: 'Crisp corn tortilla chips with warm cheese sauce, beans & salsa' },
      { id: 'chicken-popcorn', name: 'Chicken Popcorn', price: 190, type: 'nonveg', desc: 'Bite-sized crunchy herb battered chicken breast nuggets' },
      { id: 'honey-chilli-wings', name: 'Honey Chilli Wings', price: 240, type: 'nonveg', desc: 'Crispy chicken wings tossed in sweet and sticky chilli glaze' }
    ]
  },
  {
    id: 'burgers',
    title: 'Burgers (Veg & Chicken)',
    icon: '🍔',
    items: [
      { id: 'classic-veg-burger', name: 'Classic Veg Burger', price: 150, type: 'veg', desc: 'Crispy herb potato patty, iceberg lettuce, tomatoes & special sauce' },
      { id: 'space-king-chicken-burger', name: 'Space King Chicken Burger', price: 180, type: 'nonveg', desc: 'Crunchy golden fried chicken breast with chipotle mayo & slaw' },
      { id: 'insane-chicken-burger', name: 'Insane Chicken Burger', price: 180, type: 'nonveg', desc: 'Double battered spicy chicken patty with molten cheese slice' }
    ]
  },
  {
    id: 'sandwiches',
    title: 'Sandwiches & Panini',
    icon: '🥪',
    items: [
      { id: 'rainbow-sandwich', name: 'Rainbow Sandwich', price: 160, type: 'veg', desc: 'Triple layer of beet hummus, mint chutney, cucumber, cheddar & tomatoes' },
      { id: 'three-cheese-sandwich', name: 'Three Cheese Sandwich', price: 160, type: 'veg', desc: 'Gooey blend of English cheddar, mozzarella and cream cheese' },
      { id: 'bombay-sandwich', name: 'Bombay Sandwich', price: 170, type: 'veg', desc: 'Street-style spiced potato masala, beetroot, cucumber & spicy green chutney' },
      { id: 'veg-patty-sandwich', name: 'Veg Patty Sandwich', price: 170, type: 'veg', desc: 'Grilled spiced vegetable patty, melted cheese, and garlic mayo' },
      { id: 'creamy-mushroom-sandwich', name: 'Creamy Mushroom Sandwich', price: 170, type: 'veg', desc: 'Pan-seared button mushrooms in herb garlic cream sauce' },
      { id: 'creamy-chicken-sandwich', name: 'Creamy Chicken Sandwich', price: 180, type: 'nonveg', desc: 'Juicy shredded chicken tossed in herb cream mayo on toasted bread' }
    ]
  },
  {
    id: 'pasta',
    title: 'Pasta (Veg & Non-Veg)',
    icon: '🍝',
    items: [
      { id: 'alfredo-pasta-veg', name: 'Alfredo Pasta (Veg)', price: 200, type: 'veg', desc: 'Al dente penne in silky parmesan butter cream sauce' },
      { id: 'alfredo-pasta-nonveg', name: 'Alfredo Pasta (Chicken)', price: 230, type: 'nonveg', desc: 'Silky white cream pasta with tender grilled chicken chunks' },
      { id: 'arrabbiata-pasta-veg', name: 'Arrabbiata Pasta (Veg)', price: 200, type: 'veg', desc: 'Spicy Italian San Marzano red sauce with garlic, chilli & basil' },
      { id: 'arrabbiata-pasta-nonveg', name: 'Arrabbiata Pasta (Chicken)', price: 230, type: 'nonveg', desc: 'Fiery red sauce pasta tossed with spiced chicken' },
      { id: 'pink-sauce-pasta-veg', name: 'Pink Sauce Pasta (Veg)', price: 200, type: 'veg', desc: 'Creamy blend of rich tomato sauce and velvety alfredo cream' },
      { id: 'pink-sauce-pasta-nonveg', name: 'Pink Sauce Pasta (Chicken)', price: 230, type: 'nonveg', desc: 'Pink mixed sauce penne with succulent grilled chicken' },
      { id: 'pesto-pasta-veg', name: 'Pesto Pasta (Veg)', price: 210, type: 'veg', desc: 'Fragrant sweet basil, pine nuts, garlic & olive oil' },
      { id: 'pesto-pasta-nonveg', name: 'Pesto Pasta (Chicken)', price: 240, type: 'nonveg', desc: 'Aromatic basil pesto pasta topped with grilled chicken' },
      { id: 'caffyo-special-pasta-veg', name: 'Caffyo Special Pasta (Veg)', price: 220, type: 'veg', desc: 'Chef signature roasted pepper sun-dried tomato cream sauce' },
      { id: 'caffyo-special-pasta-nonveg', name: 'Caffyo Special Pasta (Chicken)', price: 260, type: 'nonveg', desc: 'Chef signature special sauce pasta with marinated chicken breast' }
    ]
  },
  {
    id: 'pizza',
    title: 'Pizza (Veg & Non-Veg)',
    icon: '🍕',
    items: [
      { id: 'margareta-pizza', name: 'Margareta Pizza', price: 170, type: 'veg', desc: 'Thin crust with tomato passata, mozzarella cheese & sweet basil' },
      { id: 'farm-house-pizza', name: 'Farm House Pizza', price: 230, type: 'veg', desc: 'Loaded with bell peppers, sweet corn, mushrooms & red onions' },
      { id: 'grilled-paneer-pizza', name: 'Grilled Paneer Pizza', price: 250, type: 'veg', desc: 'Smoky tandoori paneer cubes, capsicum, onions & bubbling cheese' },
      { id: 'grilled-chicken-pizza', name: 'Grilled Chicken Pizza', price: 260, type: 'nonveg', desc: 'Herb grilled chicken chunks with barbecue drizzle and mozzarella' },
      { id: 'chicken-peproni-pizza', name: 'Chicken Pepperoni Pizza', price: 260, type: 'nonveg', desc: 'Crispy cured chicken pepperoni slices over rich tomato base' },
      { id: 'veg-pesto-pizza', name: 'Veg Pesto Pizza', price: 260, type: 'veg', desc: 'Basil pesto base, cherry tomatoes, bocconcini & balsamic glaze' }
    ]
  },
  {
    id: 'mocktails',
    title: 'Mocktails & Ice Tea',
    icon: '🍹',
    items: [
      { id: 'sweet-salted-lemonade', name: 'Sweet & Salted Lemonade', price: 119, type: 'veg', desc: 'Classic freshly squeezed Nagpur lemon with mint and rock salt' },
      { id: 'mojito-mint', name: 'Mojito Mint', price: 119, type: 'veg', desc: 'Crushed garden mint, fresh lime, raw sugar and sparkling soda' },
      { id: 'blue-lagoon', name: 'Blue Lagoon', price: 119, type: 'veg', desc: 'Blue Curacao reduction shaken with lemonade and fizz' },
      { id: 'pineapple-blue-lagoon', name: 'Pineapple Blue Lagoon', price: 129, type: 'veg', desc: 'Tropical pineapple juice blended with blue curacao fizz' },
      { id: 'margarita-mocktail', name: 'Margarita Mocktail', price: 139, type: 'veg', desc: 'Salt-rimmed glass with lime juice, orange essence and crushed ice' },
      { id: 'berry-beach-mojito', name: 'Berry Beach Mojito', price: 139, type: 'veg', desc: 'Mixed wild berries muddled with mint leaves and club soda' },
      { id: 'mind-peace-mojito', name: 'Mind Peace Mojito', price: 139, type: 'veg', desc: 'Botanical cooling herbs, cucumber and mint over crushed ice' },
      { id: 'the-beach-vibe', name: 'The Beach Vibe', price: 139, type: 'veg', desc: 'Tropical passionfruit, mango and sparkling citrus cooler' },
      { id: 'pina-colada', name: 'Pina Colada Mocktail', price: 139, type: 'veg', desc: 'Creamy coconut cream and sweet pineapple juice blended with ice' },
      { id: 'lemon-ice-tea', name: 'Lemon Ice Tea', price: 119, type: 'veg', desc: 'Slow-steeped black tea sweetened with lemon and ice' },
      { id: 'peach-ice-tea', name: 'Peach Ice Tea', price: 139, type: 'veg', desc: 'Ripe peach nectar infused with crisp iced Assam tea' },
      { id: 'mojito-mint-ice-tea', name: 'Mojito Mint Ice Tea', price: 139, type: 'veg', desc: 'Iced tea shaken with fresh bruised garden mint leaves' },
      { id: 'virgin-long-island-ice-tea', name: 'Virgin Long Island Ice Tea', price: 139, type: 'veg', desc: 'Non-alcoholic botanical blend of cola, citrus and iced tea' }
    ]
  },
  {
    id: 'addons',
    title: 'Add Ons',
    icon: '✨',
    items: [
      { id: 'addon-espresso-shot', name: 'Extra Espresso Shot', price: 79, type: 'veg', desc: 'Single-origin extra espresso extraction' },
      { id: 'addon-vanilla-ice-cream', name: 'Vanilla Ice Cream Scoop', price: 39, type: 'veg', desc: 'Creamy vanilla bean scoop' },
      { id: 'addon-chocolate-ice-cream', name: 'Chocolate Ice Cream Scoop', price: 49, type: 'veg', desc: 'Rich chocolate scoop' },
      { id: 'addon-chocolate-sauce', name: 'Chocolate Sauce Drizzle', price: 39, type: 'veg', desc: 'Warm Dutch chocolate fudge drizzle' }
    ]
  }
];

class DedicatedMenuController {
  constructor() {
    this.cart = [];
    this.orderType = 'dinein';
    this.dietFilter = 'all'; // 'all', 'veg', 'nonveg'
    this.searchQuery = '';

    this.init();
  }

  init() {
    this.renderSections();
    this.bindEvents();
    this.setupScrollSpy();
    this.updateCartUI();
  }

  renderSections() {
    const container = document.getElementById('menu-sections-container');
    if (!container) return;

    let html = '';

    CAFFYO_SECTIONS_DATA.forEach(section => {
      // Filter items in section
      const filteredItems = section.items.filter(item => {
        const matchesDiet = this.dietFilter === 'all' || item.type === this.dietFilter;
        const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                              item.desc.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesDiet && matchesSearch;
      });

      if (filteredItems.length === 0) return;

      html += `
        <section id="${section.id}" class="menu-section-block">
          <div class="section-banner-title">
            <div class="section-icon-badge">${section.icon}</div>
            <h2>${section.title}</h2>
          </div>
          <div class="section-items-grid">
            ${filteredItems.map(item => `
              <div class="menu-item-row-card" data-item-id="${item.id}">
                <div class="item-left-info">
                  <div class="item-name-row">
                    <span class="diet-symbol ${item.type === 'veg' ? 'veg' : 'nonveg'}" title="${item.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                    <h3 class="item-name-text">${item.name}</h3>
                  </div>
                  <p class="item-desc-text">${item.desc}</p>
                  <div class="item-price-tag">₹${item.price}</div>
                </div>
                <button class="btn-add-menu-item" data-add="${item.id}" aria-label="Add ${item.name} to tray">
                  <span>+</span> Add
                </button>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    });

    if (html === '') {
      container.innerHTML = `
        <div style="text-align:center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 40px; margin-bottom: 12px;">☕</div>
          <h3 style="color:#e5d7c4; margin-bottom: 8px;">No matching items found</h3>
          <p>Try searching for "Latte", "Pizza", "Fries", or "Burger".</p>
        </div>
      `;
    } else {
      container.innerHTML = html;
    }

    // Bind Add Buttons
    container.querySelectorAll('[data-add]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-add');
        this.addItemById(id);
      });
    });
  }

  findItemById(id) {
    for (const sec of CAFFYO_SECTIONS_DATA) {
      const found = sec.items.find(i => i.id === id);
      if (found) return found;
    }
    return null;
  }

  addItemById(id) {
    const item = this.findItemById(id);
    if (!item) return;

    const existing = this.cart.find(i => i.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ ...item, qty: 1 });
    }

    this.showToast(`Added ${item.name} (₹${item.price}) to tray!`);
    this.updateCartUI();
    this.renderCartDrawer();
  }

  removeItemById(id) {
    const idx = this.cart.findIndex(i => i.id === id);
    if (idx !== -1) {
      if (this.cart[idx].qty > 1) {
        this.cart[idx].qty -= 1;
      } else {
        this.cart.splice(idx, 1);
      }
    }
    this.updateCartUI();
    this.renderCartDrawer();
  }

  updateCartUI() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Navbar cart count
    document.querySelectorAll('.menu-cart-count').forEach(el => {
      el.textContent = totalCount;
      el.style.display = totalCount > 0 ? 'inline-block' : 'none';
    });

    // Mobile floating tray bar
    const mobileCount = document.getElementById('mobile-tray-count-text');
    const mobileAmount = document.getElementById('mobile-tray-amount-text');
    if (mobileCount) mobileCount.textContent = `${totalCount} ${totalCount === 1 ? 'Item' : 'Items'}`;
    if (mobileAmount) mobileAmount.textContent = `₹${subtotal}`;
  }

  renderCartDrawer() {
    const list = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');

    if (!list) return;

    if (this.cart.length === 0) {
      list.innerHTML = `
        <div style="text-align:center; padding: 40px 10px; color: var(--text-muted);">
          <span style="font-size: 40px; display: block; margin-bottom: 8px;">☕</span>
          <h4 style="color:#e5d7c4; margin-bottom: 4px;">Tray is Empty</h4>
          <p style="font-size: 0.82rem;">Select items from our sections above to build your order.</p>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '₹0';
      if (taxEl) taxEl.textContent = '₹0';
      if (totalEl) totalEl.textContent = '₹0';
      return;
    }

    list.innerHTML = this.cart.map(item => `
      <div class="cart-item-row">
        <div>
          <h4 style="font-size: 0.92rem; color: #e5d7c4;">${item.name}</h4>
          <span style="font-size: 0.78rem; color: var(--moss-accent);">₹${item.price} each</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="btn-qty" data-dec="${item.id}">-</button>
          <span style="font-weight:700; color:#e5d7c4; min-width:20px; text-align:center;">${item.qty}</span>
          <button class="btn-qty" data-inc="${item.id}">+</button>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('[data-dec]').forEach(b => {
      b.addEventListener('click', () => this.removeItemById(b.getAttribute('data-dec')));
    });
    list.querySelectorAll('[data-inc]').forEach(b => {
      b.addEventListener('click', () => this.addItemById(b.getAttribute('data-inc')));
    });

    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
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

  setupScrollSpy() {
    const pills = document.querySelectorAll('.cat-pill');
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      CAFFYO_SECTIONS_DATA.forEach(sec => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 120) {
            currentSectionId = sec.id;
          }
        }
      });

      if (currentSectionId) {
        pills.forEach(p => {
          if (p.getAttribute('href') === `#${currentSectionId}`) {
            p.classList.add('active');
            p.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          } else {
            p.classList.remove('active');
          }
        });
      }
    });
  }

  bindEvents() {
    // Diet Filters
    document.querySelectorAll('.btn-diet-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-diet-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.dietFilter = btn.getAttribute('data-diet');
        this.renderSections();
      });
    });

    // Search Box
    const searchInput = document.getElementById('menu-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderSections();
      });
    }

    // Cart Triggers
    const navCartBtn = document.getElementById('btn-menu-nav-cart');
    if (navCartBtn) navCartBtn.addEventListener('click', () => this.openDrawer());

    const mobileTrayBtn = document.getElementById('btn-open-mobile-tray');
    if (mobileTrayBtn) mobileTrayBtn.addEventListener('click', () => this.openDrawer());

    const closeDrawerBtn = document.getElementById('btn-close-cart-drawer');
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => this.closeDrawer());

    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.closeDrawer();
    });

    // Order type toggles
    document.querySelectorAll('.btn-order-type').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-order-type').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.orderType = btn.getAttribute('data-type');
        const tableGroup = document.getElementById('pos-table-group');
        if (tableGroup) {
          tableGroup.style.display = this.orderType === 'dinein' ? 'block' : 'none';
        }
        this.renderCartDrawer();
      });
    });

    // Checkout Submit -> Triggers Live Order Tracker Modal
    const checkoutSubmit = document.getElementById('btn-checkout-submit');
    if (checkoutSubmit) {
      checkoutSubmit.addEventListener('click', () => {
        if (this.cart.length === 0) {
          this.showToast('Please add items to your tray first!');
          return;
        }

        const count = this.cart.reduce((s, i) => s + i.qty, 0);
        const subtotal = this.cart.reduce((s, i) => s + (i.price * i.qty), 0);
        const total = subtotal + Math.round(subtotal * 0.05);

        const guestName = document.getElementById('pos-guest-name')?.value.trim() || 'Guest';
        const tableSelect = document.getElementById('pos-table-select');
        const tableText = this.orderType === 'dinein' ? (tableSelect?.value || 'Table 04 - Indoor Garden') : (this.orderType === 'takeaway' ? '🥡 Takeaway Counter' : '🛵 Doorstep Delivery');

        // Populate Tracker Summary
        const trackerTableText = document.getElementById('tracker-table-text');
        if (trackerTableText) {
          trackerTableText.textContent = `${guestName} • ${tableText}`;
        }

        const trackerSummary = document.getElementById('tracker-items-summary');
        if (trackerSummary) {
          trackerSummary.innerHTML = this.cart.map(item => `
            <div class="tracker-item-line">
              <span>${item.qty}x ${item.name}</span>
              <strong>₹${item.price * item.qty}</strong>
            </div>
          `).join('') + `
            <div class="tracker-item-line" style="border-top: 1px dashed rgba(229, 215, 196,0.2); padding-top: 6px; font-weight: 700; color: #cfbb99;">
              <span>Total Bill (Incl. 5% GST)</span>
              <span>₹${total}</span>
            </div>
          `;
        }

        // Close Drawer and Open Live Order Tracker Modal
        this.closeDrawer();
        const trackerModal = document.getElementById('order-tracker-overlay');
        if (trackerModal) {
          trackerModal.classList.add('open');
        }

        this.showToast('Order #CZ-27362 sent to Barista!');

        // Reset Cart
        this.cart = [];
        this.updateCartUI();
        this.renderCartDrawer();
      });
    }

    // Close Tracker Handlers
    const closeTrackerBtn = document.getElementById('btn-close-tracker');
    const keepBrowsingBtn = document.getElementById('btn-tracker-keep-browsing');
    const trackerOverlay = document.getElementById('order-tracker-overlay');

    const closeTracker = () => {
      if (trackerOverlay) trackerOverlay.classList.remove('open');
    };

    if (closeTrackerBtn) closeTrackerBtn.addEventListener('click', closeTracker);
    if (keepBrowsingBtn) keepBrowsingBtn.addEventListener('click', closeTracker);
    if (trackerOverlay) {
      trackerOverlay.addEventListener('click', (e) => {
        if (e.target === trackerOverlay) closeTracker();
      });
    }
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
    }, 2600);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.menuController = new DedicatedMenuController();
});

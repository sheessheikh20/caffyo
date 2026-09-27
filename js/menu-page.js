/* ============================================================
   CAFFYO - Dedicated Menu Logic
   Official menu data & pricing (Opposite Haldirams, Sadar, Nagpur)
   ============================================================ */

const CAFFYO_SECTIONS_DATA = [
  {
    id: 'hot-coffee',
    title: 'Hot Coffee',
    icon: '☕',
    items: [
      { id: 'espresso', name: 'Espresso', price: 100, type: 'veg', desc: 'Single-origin Arabica pulled under 9 bars with hazelnut crema' },
      { id: 'doppio', name: 'Doppio', price: 120, type: 'veg', desc: 'Double shot espresso extracting sweet origin notes without bitterness' },
      { id: 'americano', name: 'Americano', price: 150, type: 'veg', desc: 'Double espresso pulled over hot mineral water for a clean lingering cup' },
      { id: 'cappuccino', name: 'Cappuccino', price: 160, type: 'veg', customisable: true, desc: 'Espresso balanced with steamed milk and dense velvety foam' },
      { id: 'hot-latte', name: 'Hot Latte', price: 160, type: 'veg', customisable: true, desc: 'Smooth espresso poured with silky microfoam swan art' },
      { id: 'flat-white', name: 'Flat White', price: 160, type: 'veg', desc: 'Double ristretto blended with textured steamed milk' },
      { id: 'hot-moca', name: 'Hot Moca', price: 180, type: 'veg', customisable: true, desc: 'Rich espresso folded with molten Dutch dark chocolate ganache' },
      { id: 'spanish-latte', name: 'Spanish Latte', price: 190, type: 'veg', desc: 'Signature espresso pulled over rich condensed milk and velvet microfoam' },
      { id: 'tiramisu-latte', name: 'Tiramisu Latte', price: 190, type: 'veg', desc: 'Italian savoiardi essence, mascarpone cream notes and espresso' },
      { id: 'saffron-bloom', name: 'Saffron Bloom', price: 200, type: 'veg', desc: 'Kashmiri saffron threads infused with steamed milk and golden espresso' },
      { id: 'cristal-cappuccino', name: 'Cristal Cappuccino', price: 200, type: 'veg', desc: 'Signature clear espresso extraction crowned with silky micro-foam' },
      { id: 'coconut-island-cap', name: 'Coconut Island Cap', price: 200, type: 'veg', desc: 'Creamy coconut cream froth layered over specialty espresso' }
    ]
  },
  {
    id: 'iced-coffee',
    title: 'Iced Coffee',
    icon: '🧊',
    items: [
      { id: 'iced-doppio', name: 'Iced Doppio', price: 130, type: 'veg', customisable: true, desc: 'Chilled double espresso served over crystal ice rocks' },
      { id: 'ice-latte', name: 'Ice Latte', price: 150, type: 'veg', customisable: true, desc: 'Chilled milk over ice cubes crowned with freshly pulled espresso' },
      { id: 'ice-americano', name: 'Ice Americano', price: 170, type: 'veg', desc: 'Crisp double espresso poured over sparkling iced water' },
      { id: 'cristal-velvet', name: 'Cristal Velvet', price: 170, type: 'veg', desc: 'Silky smooth cold layered coffee with velvety froth' },
      { id: 'ice-mocha', name: 'Ice Mocha', price: 190, type: 'veg', customisable: true, desc: 'Chilled dark chocolate ganache shaken with ice, milk and espresso' },
      { id: 'iced-spanish-latte', name: 'Iced Spanish Latte', price: 190, type: 'veg', desc: 'Chilled condensed milk layered with cold milk and slow espresso' },
      { id: 'belgium-bliss-ice', name: 'Belgium Bliss Ice', price: 190, type: 'veg', desc: 'Cold espresso shaken with melted Belgian chocolate' },
      { id: 'coconut-breeze-iced', name: 'Coconut Breeze Iced', price: 190, type: 'veg', desc: 'Refreshing coconut water and milk infused with iced espresso' }
    ]
  },
  {
    id: 'cold-brew',
    title: 'Cold Brew (18-Hour Steep)',
    icon: '⏳',
    items: [
      { id: 'straight-up-cold-brew', name: 'Straight Up', price: 150, type: 'veg', desc: 'Classic 18-hour slow-steeped Arabica cold brew, pure and smooth' },
      { id: 'ginger-ale-tonic-cold-brew', name: 'Ginger Ale / Tonic Cold Brew', price: 160, type: 'veg', desc: 'Fizzy botanical tonic or spicy ginger ale layered with cold brew' },
      { id: 'basil-breeze-cold-brew', name: 'Basil Breeze', price: 190, type: 'veg', desc: 'Fresh garden sweet basil leaves infused with cold brew' },
      { id: 'sparkling-cold-brew', name: 'Sparkling Cold Brew', price: 190, type: 'veg', desc: 'Effervescent sparkling mineral water paired with cold brew' },
      { id: 'vampire-blood-cold-brew', name: 'Vampire Blood', price: 190, type: 'veg', desc: 'Deep crimson berry reduction layered with cold brew' },
      { id: 'c2-cold-brew', name: 'C² Cold Brew', price: 190, type: 'veg', desc: 'Double concentrated cold extraction for an intense aromatic kick' },
      { id: 'rubby-bloom-cold-brew', name: 'Rubby Bloom', price: 190, type: 'veg', desc: 'Floral hibiscus and ruby pomegranate cordial with cold brew' },
      { id: 'yuzu-cold-brew', name: 'Yuzu Cold Brew', price: 190, type: 'veg', desc: 'Aromatic Japanese citrus yuzu paired with signature cold brew' },
      { id: 'basil-bloom-cold-brew', name: 'Basil Bloom', price: 190, type: 'veg', desc: 'Botanical blossom nectar with basil and smooth cold brew' },
      { id: 'sunset-zest-cold-brew', name: 'Sunset Zest', price: 190, type: 'veg', desc: 'Sun-ripened orange citrus notes shaken with chilled coffee' },
      { id: 'freezy-green-apple-cold-brew', name: 'Freezy Green Apple', price: 190, type: 'veg', desc: 'Crisp tart green apple cooler infused with cold brew' },
      { id: 'sparkling-alphonso-cold-brew', name: 'Sparkling Alphonso', price: 190, type: 'veg', desc: 'Ratnagiri Alphonso mango nectar layered with sparkling cold brew' },
      { id: 'astro-cold-brew', name: 'Astro Cold Brew', price: 190, type: 'veg', desc: 'Mystic blend of exotic floral notes and rich dark steep' },
      { id: 'canberry-cold-brew', name: 'Canberry Cold Brew', price: 190, type: 'veg', desc: 'Tart ruby cranberry juice shaken with cold-extracted coffee' },
      { id: 'vietnamese-cold-brew', name: 'Vietnamese Cold Brew', price: 190, type: 'veg', desc: 'Deep bold cold brew over a sweet condensed milk base' },
      { id: 'caffyo-on-the-rocks', name: 'Caffyo On The Rocks', price: 200, type: 'veg', desc: 'Slow-steeped Arabica cold brew served over a crystal ice rock' }
    ]
  },
  {
    id: 'thik-frappe',
    title: 'Thik Frappes & Cold Coffee',
    icon: '🥤',
    items: [
      { id: 'classic-frappe', name: 'Classic Frappe', price: 180, type: 'veg', customisable: true, desc: 'Classic thick blended espresso with vanilla ice cream and cream' },
      { id: 'moca-frappe', name: 'Moca Frappe', price: 190, type: 'veg', customisable: true, desc: 'Thick blended cocoa and espresso with dark chocolate chips' },
      { id: 'hazelnut-frappe', name: 'Hazelnut Frappe', price: 190, type: 'veg', customisable: true, desc: 'Thick roasted hazelnut cream blended with double espresso' },
      { id: 'caramel-frappe', name: 'Caramel Frappe', price: 190, type: 'veg', customisable: true, desc: 'Blended espresso with rich buttery caramel drizzle' },
      { id: 'belgium-frappe', name: 'Belgium Frappe', price: 200, type: 'veg', customisable: true, desc: 'Rich Belgian chocolate ganache whipped with coffee and cream' },
      { id: 'nutella-frappe', name: 'Nutella Frappe', price: 200, type: 'veg', customisable: true, desc: 'Generous spoonfuls of Italian Nutella whipped with cold coffee' },
      { id: 'oreo-frappe', name: 'Oreo Frappe', price: 200, type: 'veg', customisable: true, desc: 'Real Oreo cookies pulverized with chilled coffee and cream' },
      { id: 'affogato', name: 'Affogato', price: 200, type: 'veg', desc: 'Artisanal vanilla bean gelato melting into hot double espresso' },
      { id: 'brownie-frappe', name: 'Brownie Frappe', price: 210, type: 'veg', customisable: true, desc: 'Dense baked fudge brownie blended into thick coffee frappe' },
      { id: 'tiramisu-frappe', name: 'Tiramisu', price: 220, type: 'veg', customisable: true, desc: 'Rich dessert frappe with Italian mascarpone and coffee cocoa dusting' },
      { id: 'nutella-supreme-frappe', name: 'Nutella', price: 230, type: 'veg', customisable: true, desc: 'Double Nutella loaded thick frappe with roasted hazelnut crunch' },
      { id: 'biscoff-frappe', name: 'Biscoff', price: 230, type: 'veg', customisable: true, desc: 'Lotus Biscoff spread and crushed caramelized biscuits frappe' }
    ]
  },
  {
    id: 'hot-chocolate',
    title: 'Hot Chocolate',
    icon: '🍫',
    items: [
      { id: 'classic-hot-chocolate', name: 'Classic Hot Chocolate', price: 150, type: 'veg', desc: 'Comforting warm cocoa whisked with steamed whole milk' },
      { id: 'belgium-hot-chocolate', name: 'Belgium Hot Chocolate', price: 180, type: 'veg', desc: 'Silky melted Belgian dark chocolate ganache' },
      { id: 'nutella-hot-chocolate', name: 'Nutella Hot Chocolate', price: 180, type: 'veg', desc: 'Warm whole milk whipped with rich Nutella and cocoa' }
    ]
  },
  {
    id: 'thik-shakes',
    title: 'Thik Shakes',
    icon: '🍨',
    items: [
      { id: 'alphanso-mango-shake', name: 'Alphanso Mango', price: 180, type: 'veg', desc: 'Thick shake made with rich Ratnagiri Alphonso mango pulp' },
      { id: 'kit-kat-crunch-shake', name: 'Kit Kat Crunch', price: 180, type: 'veg', desc: 'Crispy Kit Kat wafers crushed into thick chocolate shake' },
      { id: 'oreo-crunch-shake', name: 'Oreo Crunch', price: 180, type: 'veg', desc: 'Real Oreo cookies pulverized with vanilla cream shake' },
      { id: 'mix-berry-shake', name: 'Mix Berry', price: 190, type: 'veg', desc: 'Blueberry, strawberry, and raspberry compote thick shake' },
      { id: 'peanut-punch-shake', name: 'Peanut Punch', price: 190, type: 'veg', desc: 'Roasted peanut butter whipped with vanilla dairy cream' },
      { id: 'belgium-chocolate-shake', name: 'Belgium Chocolate', price: 200, type: 'veg', desc: 'Melted Belgian dark chocolate blended into rich dessert shake' },
      { id: 'choco-chips-cookies-shake', name: 'Choco Chips Cookies', price: 200, type: 'veg', desc: 'Crunchy chocolate chip cookies folded into thick cream shake' },
      { id: 'nutella-choco-shake', name: 'Nutella Choco', price: 220, type: 'veg', desc: 'Heaped Nutella swirl blended with chocolate cream' }
    ]
  },
  {
    id: 'toasts-breakfast',
    title: 'Toasts & All-Day Breakfast',
    icon: '🍞',
    items: [
      { id: 'cheese-chilli-toast', name: 'Cheese Chilli Toast', price: 190, type: 'veg', desc: 'Toasted artisanal bread topped with melted cheddar, mozzarella & green chillies' },
      { id: 'creamy-mushroom-toast', name: 'Creamy Mushroom Toast', price: 200, type: 'veg', desc: 'Sautéed garlic button mushrooms folded in parmesan cream on sourdough' },
      { id: 'paneer-pastrani-toast', name: 'Paneer Pastrani Toast', price: 220, type: 'veg', desc: 'Spiced cottage cheese pastrani slice with herb seasoning' },
      { id: 'chicken-pastrani-toast', name: 'Chicken Pastrani Toast', price: 220, type: 'nonveg', desc: 'Smoked chicken pastrani slices with garlic herb dressing' },
      { id: 'plain-omelette', name: 'Plain Omelette', price: 160, type: 'nonveg', desc: 'Fluffy double-egg classic omelette served with toast' },
      { id: 'masala-omelette', name: 'Masala Omelette', price: 170, type: 'nonveg', desc: 'Farm-fresh eggs beaten with onions, tomatoes, coriander and spices' },
      { id: 'mushrooms-pesto-cheese-omelette', name: 'Mushrooms And Pesto Cheese Omelette', price: 180, type: 'nonveg', desc: 'Pan-folded omelette with sautéed mushrooms, basil pesto and cheese' },
      { id: 'garlic-chicken-omelette', name: 'Garlic Chicken Omelette', price: 180, type: 'nonveg', desc: 'Tender garlic chicken chunks folded in fluffy egg wrap' },
      { id: 'french-omelette', name: 'French Omelette', price: 190, type: 'nonveg', desc: 'Velvety smooth butter-basted classic French rolled omelette' },
      { id: 'customized-omlette', name: 'Customized Omlette', price: 210, type: 'nonveg', desc: 'Choose your toppings, cheeses and fillings' },
      { id: 'veg-breakfast-platter', name: 'Veg Breakfast Platter', price: 300, type: 'veg', desc: 'Grilled tomatoes, baked beans, toast, hash browns and beverage' },
      { id: 'non-veg-breakfast-platter', name: 'Non Veg Breakfast Platter', price: 350, type: 'nonveg', desc: 'Eggs your way, chicken sausages, baked beans, toast and hash brown' },
      { id: 'platter-customize', name: 'Platter Customize', price: 360, type: 'veg', desc: 'Full custom chef platter crafted to your choice' }
    ]
  },
  {
    id: 'appetisers',
    title: 'Appetisers & Starters',
    icon: '🍟',
    items: [
      { id: 'salted-fries', name: 'Salted Fries', price: 160, type: 'veg', desc: 'Crispy golden potato fries seasoned with sea salt' },
      { id: 'peri-peri-fries', name: 'Peri Peri Fries', price: 180, type: 'veg', customisable: true, desc: 'Crisp fries tossed in piquant African peri peri spice mix' },
      { id: 'cheese-loaded-fries', name: 'Cheese Loaded Fries', price: 190, type: 'veg', customisable: true, desc: 'Crispy fries smothered in house warm cheese sauce and jalapeños' },
      { id: 'honey-chilli-potato', name: 'Honey Chilli Potato', price: 200, type: 'veg', desc: 'Crispy potato fingers wok-tossed in sweet honey chilli glaze' },
      { id: 'cheese-balls', name: 'Cheese Balls', price: 220, type: 'veg', desc: 'Golden crumbed crispy balls filled with gooey molten cheese' },
      { id: 'cheese-nachos', name: 'Cheese Nachos', price: 240, type: 'veg', desc: 'Crunchy corn tortilla chips layered with salsa, sour cream & cheese sauce' },
      { id: 'chicken-popcorn', name: 'Chicken Popcorn', price: 260, type: 'nonveg', desc: 'Bite-sized seasoned tender chicken nuggets fried golden' },
      { id: 'honey-chilli-wings', name: 'Honey Chilli Wings', price: 299, type: 'nonveg', desc: 'Juicy chicken wings coated in sticky honey chilli garlic sauce' },
      { id: 'tempura-prawns', name: 'Tempura Prawns', price: 320, type: 'nonveg', desc: 'Light, crisp Japanese tempura battered prawns with dip' },
      { id: 'bird-eye-chilli-prawns', name: 'Bird Eye Chilli Prawns', price: 320, type: 'nonveg', desc: 'Succulent prawns tossed with spicy fiery bird eye chillies' },
      { id: 'chilli-garlic-prawns', name: 'Chilli Garlic Prawns', price: 320, type: 'nonveg', desc: 'Pan-seared prawns tossed in fragrant garlic butter and red chilli flakes' }
    ]
  },
  {
    id: 'burgers',
    title: 'Gourmet Burgers',
    icon: '🍔',
    items: [
      { id: 'classic-veg-burger', name: 'Classic Veg Burger', price: 190, type: 'veg', customisable: true, desc: 'Crispy herb vegetable patty, lettuce, tomato, cheese slice and house dressing' },
      { id: 'space-king-chicken-burger', name: 'Space King Chicken Burger', price: 230, type: 'nonveg', customisable: true, desc: 'Juicy spiced chicken fillet, crispy lettuce, caramelized onions and spicy mayo' },
      { id: 'insane-chicken-burger', name: 'Insane Chicken Burger', price: 230, type: 'nonveg', customisable: true, desc: 'Double-breaded crunchy chicken patty loaded with cheese and chef secret relish' }
    ]
  },
  {
    id: 'sandwiches-wraps',
    title: 'Sandwiches & Wraps',
    icon: '🥪',
    items: [
      { id: 'rainbow-sandwich', name: 'Rainbow Sandwich', price: 200, type: 'veg', customisable: true, desc: 'Layered multi-veggie sandwich with vibrant beetroot, mint chutney and cheese' },
      { id: 'three-cheese-sandwich', name: 'Three Cheese Sandwich', price: 200, type: 'veg', customisable: true, desc: 'Melted cheddar, mozzarella, and processed cheese grilled to crisp perfection' },
      { id: 'veg-patty-sandwich', name: 'Veg Patty Sandwich', price: 210, type: 'veg', customisable: true, desc: 'Golden veggie cutlet, sliced cucumber, tomatoes and tangy mustard sauce' },
      { id: 'bombay-sandwich', name: 'Bombay Sandwich', price: 220, type: 'veg', customisable: true, desc: 'Spiced boiled potatoes, beetroot, cucumber, green chutney and sandwich masala' },
      { id: 'creamy-mushroom-sandwich', name: 'Creamy Mushroom Sandwich', price: 220, type: 'veg', customisable: true, desc: 'Garlic butter sautéed mushrooms folded in herb cheese spread' },
      { id: 'creamy-chicken-sandwich', name: 'Creamy Chicken Sandwich', price: 230, type: 'nonveg', customisable: true, desc: 'Shredded roasted chicken tossed in creamy herb mayonnaise' },
      { id: 'veg-mexican-wrap', name: 'Veg Mexican Wrap', price: 199, type: 'veg', desc: 'Tortilla wrap stuffed with corn, beans, spicy peppers, cheese and salsa' },
      { id: 'paneer-tikka-wrap', name: 'Paneer Tikka Wrap', price: 199, type: 'veg', desc: 'Tandoori marinated cottage cheese, sliced onions and mint yogurt wrap' },
      { id: 'chicken-tikka-wrap', name: 'Chicken Tikka Wrap', price: 199, type: 'nonveg', desc: 'Charcoal grilled chicken tikka cubes, crunchy onions and spicy mint mayo' },
      { id: 'non-veg-mexican-wrap', name: 'Non Veg Mexican Wrap', price: 219, type: 'nonveg', desc: 'Spiced chicken chunks, salsa, jalapenos, cheese and sour cream' },
      { id: 'indian-chicken-wrap', name: 'Indian Chicken Wrap', price: 219, type: 'nonveg', desc: 'Desi spiced shredded chicken with pickled onions in toasted wrap' },
      { id: 'lemon-chicken-wrap', name: 'Lemon Chicken Wrap', price: 229, type: 'nonveg', desc: 'Zesty lemon herb grilled chicken strips with crisp greens' }
    ]
  },
  {
    id: 'salads',
    title: 'Fresh Gourmet Salads',
    icon: '🥗',
    items: [
      { id: 'veg-mexican-salad', name: 'Veg Mexican Salad', price: 200, type: 'veg', desc: 'Sweet corn, black beans, bell peppers, crispy tortilla strips & lime cilantro dressing' },
      { id: 'veg-salad-customize', name: 'Veg Salad Customize', price: 200, type: 'veg', desc: 'Design your own fresh green salad bowl' },
      { id: 'veg-greek-salad', name: 'Veg Greek Salad', price: 220, type: 'veg', desc: 'Crisp cucumbers, vine tomatoes, kalamata olives, red onions and oregano vinaigrette' },
      { id: 'veg-ceasar-salad', name: 'Veg Ceasar Salad', price: 220, type: 'veg', desc: 'Romaine lettuce tossed in creamy Caesar dressing with garlic croutons and parmesan' },
      { id: 'veg-feta-salad', name: 'Veg Feta Salad', price: 220, type: 'veg', desc: 'Crumbled Mediterranean feta cheese, mixed greens, cherry tomatoes and olive oil' },
      { id: 'chicken-mexican-salad', name: 'Chicken Mexican Salad', price: 240, type: 'nonveg', desc: 'Grilled spiced chicken, sweet corn, black beans, peppers and jalapeño dressing' },
      { id: 'chicken-salad-customize', name: 'Chicken Salad Customize', price: 240, type: 'nonveg', desc: 'Custom protein-packed fresh salad bowl' },
      { id: 'chicken-greek-salad', name: 'Chicken Greek Salad', price: 260, type: 'nonveg', desc: 'Tender herb chicken breast, feta cheese, olives, cucumbers and vinaigrette' },
      { id: 'chicken-ceasar-salad', name: 'Chicken Ceasar Salad', price: 260, type: 'nonveg', desc: 'Grilled chicken strips, crisp romaine, shaved parmesan and creamy Caesar dressing' },
      { id: 'chicken-feta-salad', name: 'Chicken Feta Salad', price: 260, type: 'nonveg', desc: 'Diced grilled chicken, crumbled feta cheese, crisp greens and herb vinaigrette' }
    ]
  },
  {
    id: 'pizza',
    title: 'Artisanal Thin Crust Pizza',
    icon: '🍕',
    items: [
      { id: 'margareta-pizza', name: 'Margareta Pizza', price: 220, type: 'veg', desc: 'San Marzano tomato concassé, fresh mozzarella, extra virgin olive oil and basil' },
      { id: 'farm-house-pizza', name: 'Farm House Pizza', price: 290, type: 'veg', desc: 'Bell peppers, red onions, mushrooms, sweet corn, black olives & mozzarella' },
      { id: 'veg-pesto-pizza', name: 'Veg Pesto Pizza', price: 310, type: 'veg', desc: 'Genovese basil pesto base, cherry tomatoes, bocconcini and mozzarella' },
      { id: 'grilled-paneer-pizza', name: 'Grilled Paneer Pizza', price: 320, type: 'veg', desc: 'Tandoori herb marinated cottage cheese, spiced peppers and melted cheese' },
      { id: 'chicken-peproni-pizza', name: 'Chicken Peproni Pizza', price: 330, type: 'nonveg', desc: 'Smoked chicken pepperoni rounds, rich tomato sauce and bubbling mozzarella' },
      { id: 'grilled-chicken-pizza', name: 'Grilled Chicken Pizza', price: 340, type: 'nonveg', desc: 'BBQ and herb grilled chicken chunks, sliced onions, capsicum and cheese' }
    ]
  },
  {
    id: 'pasta',
    title: 'Handmade Gourmet Pasta',
    icon: '🍝',
    items: [
      { id: 'veg-alfredo-pasta', name: 'Veg Alfredo Pasta', price: 250, type: 'veg', customisable: true, desc: 'Penne in rich, velvety butter and parmesan cheese cream sauce with broccoli' },
      { id: 'veg-arrabbiata-pasta', name: 'Veg Arrabbiata Pasta', price: 250, type: 'veg', customisable: true, desc: 'Spicy garlic, red chilli and Italian peeled tomato sauce' },
      { id: 'veg-pink-sauce-pasta', name: 'Veg Pink Sauce Pasta', price: 250, type: 'veg', customisable: true, desc: 'Harmonious blend of zesty tomato pomodoro and rich cream' },
      { id: 'veg-pesto-pasta', name: 'Veg Pesto Pasta', price: 270, type: 'veg', customisable: true, desc: 'Fragrant fresh basil, pine nuts, garlic, olive oil and parmesan' },
      { id: 'caffyo-special-veg-pasta', name: 'Caffyo Special Veg Pasta', price: 280, type: 'veg', customisable: true, desc: 'Chef signature baked pasta with exotic vegetables, olives and triple cheese crust' },
      { id: 'chicken-alfredo-pasta', name: 'Chicken Alfredo Pasta', price: 290, type: 'nonveg', customisable: true, desc: 'Juicy grilled chicken breast slices folded in creamy garlic parmesan alfredo' },
      { id: 'chicken-arrabbiata-pasta', name: 'Chicken Arrabbiata Pasta', price: 290, type: 'nonveg', customisable: true, desc: 'Fiery Italian arrabbiata sauce tossed with chicken and fresh basil' },
      { id: 'chicken-pink-sauce-pasta', name: 'Chicken Pink Sauce Pasta', price: 290, type: 'nonveg', customisable: true, desc: 'Tender chicken in a luscious pink sauce of tomato and cream' },
      { id: 'chicken-pesto-pasta', name: 'Chicken Pesto Pasta', price: 300, type: 'nonveg', customisable: true, desc: 'Herb chicken strips tossed with green basil pesto and pine nuts' },
      { id: 'caffyo-special-chicken-pasta', name: 'Caffyo Special Chicken Pasta', price: 330, type: 'nonveg', customisable: true, desc: 'House signature oven-baked chicken pasta with rich sauce and golden cheese layer' }
    ]
  },
  {
    id: 'mains',
    title: 'Steaks & Mains',
    icon: '🥩',
    items: [
      { id: 'mexican-steak', name: 'Mexican Steak', price: 300, type: 'veg', desc: 'Grilled spiced vegetable steak served with Mexican rice, beans and salsa' },
      { id: 'pesto-chicken-steak', name: 'Pesto Chicken Steak', price: 320, type: 'nonveg', desc: 'Tender chicken breast seared with aromatic basil pesto sauce, sautéed veggies & mash' },
      { id: 'melting-chicken-steak', name: 'Melting Chicken Steak', price: 340, type: 'nonveg', desc: 'Juicy chicken steak blanketed in molten cheese, served with pepper sauce and fries' },
      { id: 'fish-and-chips', name: 'Fish & Chips', price: 350, type: 'nonveg', desc: 'Crisp golden battered fish fillet served with tartar dip and seasoned fries' }
    ]
  },
  {
    id: 'mocktails',
    title: 'Mocktails, Coolers & Beverages',
    icon: '🍹',
    items: [
      { id: 'sweet-and-salted-lemonade', name: 'Sweet And Salted Lemonade', price: 150, type: 'veg', desc: 'Classic freshly squeezed Nagpur lemon cooler with mint and rock salt' },
      { id: 'mint-mojito', name: 'Mint Mojito', price: 150, type: 'veg', desc: 'Muddled fresh garden mint, lime wedges, sugar syrup and sparkling soda' },
      { id: 'lemon-ice-tea', name: 'Lemon Ice Tea', price: 150, type: 'veg', desc: 'Slow-steeped Assam black tea sweetened with lemon and ice' },
      { id: 'pinapple-blue-green', name: 'Pinapple Blue Green', price: 170, type: 'veg', desc: 'Exotic blue curacao, tropical pineapple and mint cooler' },
      { id: 'berry-beach-mojito', name: 'Berry Beach Mojito', price: 180, type: 'veg', desc: 'Mixed wild berries muddled with mint leaves and club soda' },
      { id: 'chilli-guava', name: 'Chilli Guava', price: 180, type: 'veg', desc: 'Sweet pink guava juice with a fiery red chilli salt-rimmed kick' },
      { id: 'pink-lady', name: 'Pink Lady', price: 180, type: 'veg', desc: 'Subtle blend of rose cordial, pomegranate and creamy citrus' },
      { id: 'pina-colada', name: 'Pina Colada', price: 180, type: 'veg', desc: 'Creamy coconut cream and sweet pineapple juice blended with crushed ice' },
      { id: 'peach-ice-tea', name: 'Peach Ice Tea', price: 180, type: 'veg', desc: 'Juicy peach nectar infused with crisp chilled iced tea' },
      { id: 'passion-fruit-ice-tea', name: 'Passion Fruit Ice Tea', price: 190, type: 'veg', desc: 'Tangy tropical passionfruit syrup shaken with iced tea' },
      { id: 'jamun-ice-tea', name: 'Jamun Ice Tea', price: 190, type: 'veg', desc: 'Rich local Indian black plum (jamun) reduction infused with iced tea' },
      { id: 'hell-energy-drink', name: 'Hell', price: 130, type: 'veg', desc: 'Chilled Hell Energy Drink can' },
      { id: 'red-bull', name: 'Red Bull', price: 180, type: 'veg', desc: 'Chilled Red Bull Energy Drink can' },
      { id: 'water-bottle', name: 'Water Bottle', price: 10, type: 'veg', desc: 'Packaged mineral water bottle' }
    ]
  },
  {
    id: 'desserts',
    title: 'Pancakes, Kulfi & Desserts',
    icon: '🥞',
    items: [
      { id: 'tiranga-kulfi', name: 'Tiranga Kulfi', price: 79, type: 'veg', desc: 'Traditional tri-flavored Indian frozen dessert on stick' },
      { id: 'brownie', name: 'Brownie', price: 170, type: 'veg', desc: 'Warm fudgy Belgian dark chocolate brownie' },
      { id: 'pastry', name: 'Pastry', price: 200, type: 'veg', desc: 'Fresh daily pastry slice from our bakery counter' },
      { id: 'pancakes-with-maple-syrup', name: 'Pancakes With Maple Syrup', price: 220, type: 'veg', desc: 'Stack of fluffy golden pancakes drizzled with warm maple syrup and butter' },
      { id: 'nutella-pancakes-with-almond', name: 'Nutella Pancakes With Almond', price: 240, type: 'veg', desc: 'Golden pancakes smothered with warm Nutella and toasted almond flakes' },
      { id: 'biscoff-pancakes', name: 'Biscoff Pancakes', price: 240, type: 'veg', desc: 'Fluffy pancake stack layered with Lotus Biscoff spread and biscuit crumble' }
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
    this.setupCategoryModal();
    this.setupCategoryStripControls();
    this.setupScrollSpy();
    this.updateCartUI();
    this.updateFilterUI();
    this.adjustHeaderSpacing();

    const header = document.getElementById('menu-fixed-header');
    if (header && window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        this.adjustHeaderSpacing();
      });
      ro.observe(header);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        this.adjustHeaderSpacing();
      });
    }

    window.addEventListener('load', () => {
      this.adjustHeaderSpacing();
    });

    window.addEventListener('resize', () => {
      this.adjustHeaderSpacing();
    });

    if (window.location.hash) {
      const hashId = window.location.hash.substring(1);
      setTimeout(() => {
        this.scrollToSection(hashId);
      }, 150);
    }
  }

  adjustHeaderSpacing() {
    const header = document.getElementById('menu-fixed-header');
    if (!header) return;
    const h = Math.ceil(header.getBoundingClientRect().height);
    const isMobile = window.innerWidth <= 768;
    const extra = isMobile ? 16 : 24;
    const totalSpacing = h + extra;

    document.documentElement.style.setProperty('--menu-header-height', `${h}px`);
    document.body.style.paddingTop = `${totalSpacing}px`;
    document.documentElement.style.scrollPaddingTop = `${totalSpacing}px`;
  }

  getItemQty(id) {
    const item = this.cart.find(i => i.id === id);
    return item ? item.qty : 0;
  }

  getItemImage(sectionId, item) {
    if (['hot-coffee', 'hot-chocolate'].includes(sectionId)) {
      return 'assets/images/hero_coffee.jpg';
    }
    if (['iced-coffee', 'cold-brew', 'mocktails'].includes(sectionId)) {
      return 'assets/images/spanish_latte.jpg';
    }
    if (['thik-frappe', 'thik-shakes', 'desserts'].includes(sectionId)) {
      return 'assets/images/cheesecake.jpg';
    }
    return 'assets/images/gourmet_bites.jpg';
  }

  renderItemActionHtml(item) {
    const qty = this.getItemQty(item.id);
    if (qty > 0) {
      return `
        <div class="item-qty-stepper" data-stepper="${item.id}">
          <button class="btn-qty-minus" data-qty-minus="${item.id}" aria-label="Decrease quantity of ${item.name}">&minus;</button>
          <span class="qty-count-text" data-qty-count="${item.id}">${qty}</span>
          <button class="btn-qty-plus" data-qty-plus="${item.id}" aria-label="Increase quantity of ${item.name}">&plus;</button>
        </div>
      `;
    }
    return `
      <button class="btn-add-menu-item" data-add="${item.id}" aria-label="Add ${item.name} to tray">
        <span>+</span> Add
      </button>
    `;
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
            ${filteredItems.map(item => {
              const imgSrc = this.getItemImage(section.id, item);
              return `
              <div class="menu-item-row-card" data-item-id="${item.id}">
                <div class="item-left-info">
                  <div class="item-name-row">
                    <span class="diet-symbol ${item.type === 'veg' ? 'veg' : 'nonveg'}" title="${item.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                    <h3 class="item-name-text">${item.name}</h3>
                    <div class="item-badges-wrap">
                      ${item.customisable ? '<span class="badge-customisable">Customisable</span>' : ''}
                    </div>
                  </div>
                  <p class="item-desc-text">${item.desc}</p>
                  <div class="item-price-tag">₹${item.price}</div>
                </div>
                <div class="item-card-action-side">
                  <div class="item-card-thumb">
                    <img src="${imgSrc}" alt="${item.name}" loading="lazy" />
                  </div>
                  ${this.renderItemActionHtml(item)}
                </div>
              </div>
              `;
            }).join('')}
          </div>
        </section>
      `;
    });

    if (html === '') {
      container.innerHTML = `
        <div style="text-align:center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 40px; margin-bottom: 12px;">☕</div>
          <h3 style="color:#fff; margin-bottom: 8px;">No matching items found</h3>
          <p>Try searching for "Latte", "Pizza", "Fries", or "Burger".</p>
          <button id="btn-empty-reset" class="btn-reset-filters" style="margin-top: 16px; padding: 8px 18px; font-size: 0.9rem;">Clear Search &amp; Filters</button>
        </div>
      `;
      container.querySelector('#btn-empty-reset')?.addEventListener('click', () => this.resetFilters());
    } else {
      container.innerHTML = html;
    }

    // Bind Add Buttons
    container.querySelectorAll('[data-add]:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-add');
        this.addItemById(id);
      });
    });

    // Bind In-card Stepper Buttons
    container.querySelectorAll('[data-qty-plus]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-qty-plus');
        this.addItemById(id);
      });
    });

    container.querySelectorAll('[data-qty-minus]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-qty-minus');
        this.removeItemById(id);
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

  syncCardQty(id) {
    const cardSide = document.querySelector(`.menu-item-row-card[data-item-id="${id}"] .item-card-action-side`);
    if (!cardSide) return;

    const item = this.findItemById(id);
    if (!item) return;

    const qty = this.getItemQty(id);
    const existingStepper = cardSide.querySelector(`[data-stepper="${id}"]`);
    const existingAddBtn = cardSide.querySelector(`[data-add="${id}"]`);

    if (qty > 0) {
      if (existingStepper) {
        const countEl = existingStepper.querySelector(`[data-qty-count="${id}"]`);
        if (countEl) countEl.textContent = qty;
      } else if (existingAddBtn) {
        existingAddBtn.outerHTML = `
          <div class="item-qty-stepper" data-stepper="${id}">
            <button class="btn-qty-minus" data-qty-minus="${id}" aria-label="Decrease quantity of ${item.name}">&minus;</button>
            <span class="qty-count-text" data-qty-count="${id}">${qty}</span>
            <button class="btn-qty-plus" data-qty-plus="${id}" aria-label="Increase quantity of ${item.name}">&plus;</button>
          </div>
        `;
        const newStepper = cardSide.querySelector(`[data-stepper="${id}"]`);
        if (newStepper) {
          newStepper.querySelector(`[data-qty-minus="${id}"]`)?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeItemById(id);
          });
          newStepper.querySelector(`[data-qty-plus="${id}"]`)?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.addItemById(id);
          });
        }
      }
    } else {
      if (existingStepper) {
        existingStepper.outerHTML = `
          <button class="btn-add-menu-item" data-add="${id}" aria-label="Add ${item.name} to tray">
            <span>+</span> Add
          </button>
        `;
        const newAddBtn = cardSide.querySelector(`[data-add="${id}"]`);
        if (newAddBtn) {
          newAddBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.addItemById(id);
          });
        }
      }
    }
  }

  resetAllCardSteppers() {
    document.querySelectorAll('.item-qty-stepper').forEach(stepper => {
      const id = stepper.getAttribute('data-stepper');
      const item = this.findItemById(id);
      if (!item) return;
      stepper.outerHTML = `
        <button class="btn-add-menu-item" data-add="${id}" aria-label="Add ${item.name} to tray">
          <span>+</span> Add
        </button>
      `;
    });
    document.querySelectorAll('.menu-item-row-card .btn-add-menu-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-add');
        this.addItemById(id);
      });
    });
  }

  addItemById(id) {
    const item = this.findItemById(id);
    if (!item || item.outOfStock) return;

    const existing = this.cart.find(i => i.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ ...item, qty: 1 });
    }

    this.showToast(`Added ${item.name} (₹${item.price}) to tray!`);
    this.updateCartUI();
    this.renderCartDrawer();
    this.syncCardQty(id);
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
    this.syncCardQty(id);
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
    const countEl = document.getElementById('cart-item-count');
    const totalEl = document.getElementById('cart-total');

    if (!list) return;

    if (this.cart.length === 0) {
      list.innerHTML = `
        <div style="text-align:center; padding: 48px 12px; color: var(--text-muted);">
          <span style="font-size: 40px; display: block; margin-bottom: 8px;">☕</span>
          <h4 style="color:#fff; margin-bottom: 4px;">Your Tray is Empty</h4>
          <p style="font-size: 0.82rem;">Select items from the menu to review your order selection.</p>
        </div>
      `;
      if (countEl) countEl.textContent = '0 Items';
      if (totalEl) totalEl.textContent = '₹0';
      return;
    }

    list.innerHTML = this.cart.map(item => `
      <div class="cart-item-row">
        <div>
          <h4 style="font-size: 0.95rem; color: #fff;">${item.name}</h4>
          <span style="font-size: 0.80rem; color: var(--gold-accent);">₹${item.price} each &bull; ₹${item.price * item.qty}</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="btn-qty" data-dec="${item.id}" aria-label="Decrease quantity">-</button>
          <span style="font-weight:700; color:#fff; min-width:20px; text-align:center;">${item.qty}</span>
          <button class="btn-qty" data-inc="${item.id}" aria-label="Increase quantity">+</button>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('[data-dec]').forEach(b => {
      b.addEventListener('click', () => this.removeItemById(b.getAttribute('data-dec')));
    });
    list.querySelectorAll('[data-inc]').forEach(b => {
      b.addEventListener('click', () => this.addItemById(b.getAttribute('data-inc')));
    });

    const totalCount = this.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (countEl) countEl.textContent = `${totalCount} ${totalCount === 1 ? 'Item' : 'Items'}`;
    if (totalEl) totalEl.textContent = `₹${subtotal}`;
  }

  openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
  }

  closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  setupScrollSpy() {
    const pills = document.querySelectorAll('.cat-pill');
    const wrapper = document.querySelector('.category-scroll-wrapper');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (this.isNavigating) return; // Prevent fight with smooth navigation clicks

      if (!ticking) {
        window.requestAnimationFrame(() => {
          let currentSectionId = '';
          const header = document.getElementById('menu-fixed-header');
          const headerHeight = header ? header.offsetHeight : 140;
          const scrollPos = window.scrollY + headerHeight + 20;

          CAFFYO_SECTIONS_DATA.forEach(sec => {
            const el = document.getElementById(sec.id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                currentSectionId = sec.id;
              }
            }
          });

          if (currentSectionId && currentSectionId !== this.activeSectionId) {
            this.activeSectionId = currentSectionId;

            pills.forEach(p => {
              const matches = p.getAttribute('href') === `#${currentSectionId}`;
              p.classList.toggle('active', matches);

              if (matches && wrapper) {
                // Scroll ONLY the horizontal pill strip, NEVER trigger window scrolling!
                const targetLeft = p.offsetLeft - (wrapper.clientWidth / 2) + (p.offsetWidth / 2);
                wrapper.scrollTo({
                  left: targetLeft,
                  behavior: 'smooth'
                });
              }
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  scrollToSection(targetId) {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    this.isNavigating = true;
    this.activeSectionId = targetId;

    const pills = document.querySelectorAll('.cat-pill');
    const wrapper = document.querySelector('.category-scroll-wrapper');
    pills.forEach(p => {
      const matches = p.getAttribute('href') === `#${targetId}`;
      p.classList.toggle('active', matches);
      if (matches && wrapper) {
        wrapper.scrollTo({
          left: p.offsetLeft - (wrapper.clientWidth / 2) + (p.offsetWidth / 2),
          behavior: 'smooth'
        });
      }
    });

    const header = document.getElementById('menu-fixed-header');
    const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 155;
    const isMobile = window.innerWidth <= 768;
    const extraOffset = isMobile ? 16 : 24;
    const navOffset = headerHeight + extraOffset;

    let targetY = 0;
    if (targetId === 'hot-coffee') {
      targetY = 0;
    } else {
      targetY = Math.max(0, targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset);
    }

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });

    if (history.pushState) {
      history.pushState(null, '', `#${targetId}`);
    }

    setTimeout(() => {
      this.isNavigating = false;
    }, 650);
  }

  setupCategoryModal() {
    const listEl = document.getElementById('categories-sheet-list');
    const modal = document.getElementById('categories-sheet-modal');
    const overlay = document.getElementById('categories-modal-overlay');
    const btnOpen = document.getElementById('btn-floating-categories');
    const btnClose = document.getElementById('btn-close-categories-modal');

    if (listEl) {
      listEl.innerHTML = CAFFYO_SECTIONS_DATA.map(sec => `
        <a href="#${sec.id}" class="cat-sheet-item" data-sheet-target="${sec.id}">
          <div class="cat-sheet-left">
            <span class="cat-sheet-icon">${sec.icon}</span>
            <div>
              <div class="cat-sheet-title">${sec.title}</div>
              <div class="cat-sheet-count">${sec.items.length} items</div>
            </div>
          </div>
          <span class="cat-sheet-arrow">&rarr;</span>
        </a>
      `).join('');

      listEl.querySelectorAll('.cat-sheet-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = item.getAttribute('data-sheet-target');
          this.closeCategoryModal();
          this.scrollToSection(targetId);
        });
      });
    }

    if (btnOpen) {
      btnOpen.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openCategoryModal();
      });
    }
    if (btnClose) {
      btnClose.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeCategoryModal();
      });
    }
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeCategoryModal();
      });
    }
  }

  setupCategoryStripControls() {
    const wrapper = document.querySelector('.category-scroll-wrapper');
    const prevBtn = document.getElementById('btn-cat-prev');
    const nextBtn = document.getElementById('btn-cat-next');

    if (!wrapper) return;

    const updateArrows = () => {
      const atStart = wrapper.scrollLeft <= 6;
      const atEnd = wrapper.scrollLeft >= (wrapper.scrollWidth - wrapper.clientWidth - 6);

      if (prevBtn) {
        prevBtn.disabled = atStart;
      }
      if (nextBtn) {
        nextBtn.disabled = atEnd;
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: -260, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: 260, behavior: 'smooth' });
      });
    }

    wrapper.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows, { passive: true });
    setTimeout(updateArrows, 150);

    // Mouse drag-to-scroll support for desktop
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasDragged = false;

    wrapper.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDown = true;
      hasDragged = false;
      wrapper.classList.add('is-dragging');
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      wrapper.classList.remove('is-dragging');
      setTimeout(() => {
        hasDragged = false;
      }, 50);
    });

    wrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(walk) > 5) {
        hasDragged = true;
      }
      wrapper.scrollLeft = scrollLeft - walk;
    });

    // Intercept clicks on category pills
    wrapper.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        if (hasDragged) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }
        const href = pill.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          this.scrollToSection(targetId);
        }
      });
    });

    // Intercept clicks on spotlight category cards
    document.querySelectorAll('.spotlight-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const href = card.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          this.scrollToSection(targetId);
        }
      });
    });
  }

  openCategoryModal() {
    const modal = document.getElementById('categories-sheet-modal');
    const overlay = document.getElementById('categories-modal-overlay');
    if (modal) modal.classList.add('open');
    if (overlay) overlay.classList.add('open');
  }

  closeCategoryModal() {
    const modal = document.getElementById('categories-sheet-modal');
    const overlay = document.getElementById('categories-modal-overlay');
    if (modal) modal.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  updateFilterUI() {
    const feedbackBar = document.getElementById('filter-feedback-bar');
    const feedbackText = document.getElementById('filter-feedback-text');
    const btnClearSearch = document.getElementById('btn-clear-search');

    if (btnClearSearch) {
      btnClearSearch.style.display = (this.searchQuery && this.searchQuery.trim().length > 0) ? 'flex' : 'none';
    }

    let activeFilterParts = [];
    if (this.searchQuery && this.searchQuery.trim().length > 0) {
      activeFilterParts.push(`matching "${this.searchQuery.trim()}"`);
    }
    if (this.dietFilter === 'veg') {
      activeFilterParts.push('Pure Veg only');
    } else if (this.dietFilter === 'nonveg') {
      activeFilterParts.push('Non-Veg only');
    }

    if (feedbackBar && feedbackText) {
      if (activeFilterParts.length > 0) {
        feedbackBar.style.display = 'flex';
        feedbackText.textContent = `Showing items ${activeFilterParts.join(' • ')}`;
      } else {
        feedbackBar.style.display = 'none';
      }
    }

    this.adjustHeaderSpacing();
  }

  resetFilters() {
    this.searchQuery = '';
    this.dietFilter = 'all';

    const searchInput = document.getElementById('menu-search-input');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('.btn-diet-filter').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-diet') === 'all');
    });

    this.renderSections();
    this.updateFilterUI();
  }

  bindEvents() {
    // Smooth Category Navigation
    document.querySelectorAll('.cat-pill, .spotlight-card').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const targetId = href.substring(1);
        e.preventDefault();
        this.scrollToSection(targetId);
      });
    });

    // Diet Filters
    document.querySelectorAll('.btn-diet-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-diet-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.dietFilter = btn.getAttribute('data-diet');
        this.renderSections();
        this.updateFilterUI();
      });
    });

    // Search Box & Clear Button
    const searchInput = document.getElementById('menu-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderSections();
        this.updateFilterUI();
      });
    }

    const clearSearchBtn = document.getElementById('btn-clear-search');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        this.searchQuery = '';
        this.renderSections();
        this.updateFilterUI();
      });
    }

    // Reset Filters from feedback bar
    const resetFiltersBtn = document.getElementById('btn-reset-filters');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => this.resetFilters());
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

    // Clear Tray Button
    const clearTrayBtn = document.getElementById('btn-clear-tray');
    if (clearTrayBtn) {
      clearTrayBtn.addEventListener('click', () => {
        if (this.cart.length === 0) return;
        this.cart = [];
        this.updateCartUI();
        this.renderCartDrawer();
        this.resetAllCardSteppers();
        this.showToast('Tray cleared');
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

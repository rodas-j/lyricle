// Sample data to demonstrate payload-based seeding
// This data can be imported and used with the seedInitial mutation

export const SAMPLE_INGREDIENTS = [
  // Herbs & Aromatics
  { name: 'BASIL', category: 'Herb' },
  { name: 'PARSLEY', category: 'Herb' },
  { name: 'OREGANO', category: 'Herb' },
  { name: 'THYME', category: 'Herb' },
  { name: 'ROSEMARY', category: 'Herb' },
  { name: 'GARLIC', category: 'Aromatic' },
  { name: 'ONION', category: 'Aromatic' },
  { name: 'SHALLOT', category: 'Aromatic' },

  // Cheeses
  { name: 'PECORINO ROMANO', category: 'Cheese' },
  { name: 'PARMESAN', category: 'Cheese', substitutes: ['PECORINO ROMANO'] },
  { name: 'MOZZARELLA', category: 'Cheese' },
  { name: 'FETA', category: 'Cheese' },
  { name: 'RICOTTA', category: 'Cheese' },

  // Nuts & Seeds
  { name: 'PINE NUTS', category: 'Nut' },
  { name: 'WALNUTS', category: 'Nut', substitutes: ['PINE NUTS'] },
  { name: 'ALMONDS', category: 'Nut' },
  { name: 'SESAME SEEDS', category: 'Seed' },

  // Oils & Fats
  { name: 'OLIVE OIL', category: 'Oil' },
  { name: 'BUTTER', category: 'Fat' },
  { name: 'COCONUT OIL', category: 'Oil' },

  // Vegetables
  { name: 'TOMATO', category: 'Vegetable' },
  { name: 'TOMATO SAUCE', category: 'Sauce' },
  { name: 'AVOCADO', category: 'Vegetable' },
  { name: 'LIME', category: 'Citrus' },
  { name: 'LEMON', category: 'Citrus' },
  { name: 'JALAPEÑO', category: 'Pepper' },
  { name: 'ROMAINE', category: 'Lettuce' },
  { name: 'LETTUCE', category: 'Lettuce', substitutes: ['ROMAINE'] },
  { name: 'RED ONION', category: 'Aromatic' },
  { name: 'CILANTRO', category: 'Herb' },

  // Proteins
  { name: 'ANCHOVIES', category: 'Fish' },
  { name: 'BACON', category: 'Meat' },
  { name: 'PROSCIUTTO', category: 'Meat' },
  { name: 'CHICKEN', category: 'Meat' },
  { name: 'GROUND BEEF', category: 'Meat' },
  { name: 'BEANS', category: 'Legume' },
  { name: 'BLACK BEANS', category: 'Legume' },
  { name: 'KIDNEY BEANS', category: 'Legume' },

  // Grains & Bread
  { name: 'BREAD', category: 'Grain' },
  { name: 'CROUTONS', category: 'Bread' },
  { name: 'RICE', category: 'Grain' },
  { name: 'PASTA', category: 'Grain' },

  // Spices & Seasonings
  { name: 'CUMIN', category: 'Spice' },
  { name: 'CHILI POWDER', category: 'Spice' },
  { name: 'PAPRIKA', category: 'Spice' },
  { name: 'SALT', category: 'Seasoning' },
  { name: 'PEPPER', category: 'Seasoning' },

  // Dairy
  { name: 'CREAM', category: 'Dairy' },
  { name: 'MILK', category: 'Dairy' },
  { name: 'YOGURT', category: 'Dairy' },
  { name: 'SOUR CREAM', category: 'Dairy' },

  // Sauces & Condiments
  { name: 'WORCESTERSHIRE SAUCE', category: 'Sauce' },
  { name: 'MAYONNAISE', category: 'Condiment' },
  { name: 'MUSTARD', category: 'Condiment' },
  { name: 'TAHINI', category: 'Paste' },

  // Others
  { name: 'EGG', category: 'Protein' },
  { name: 'FLOUR', category: 'Grain' },
  { name: 'SUGAR', category: 'Sweetener' },
  { name: 'HONEY', category: 'Sweetener' },
]

export const SAMPLE_PUZZLES = [
  {
    name: 'PESTO GENOVESE',
    coreIngredients: [
      'BASIL',
      'PINE NUTS',
      'GARLIC',
      'PECORINO ROMANO',
      'OLIVE OIL',
    ],
    description: 'Classic Italian herb sauce from Liguria',
    dayIndex: 0,
  },
  {
    name: 'MARGHERITA PIZZA',
    coreIngredients: ['TOMATO SAUCE', 'MOZZARELLA', 'BASIL', 'OLIVE OIL'],
    description: 'Classic Neapolitan pizza with simple, quality ingredients',
    dayIndex: 1,
  },
  {
    name: 'CAESAR SALAD',
    coreIngredients: ['ROMAINE', 'PARMESAN', 'ANCHOVIES', 'CROUTONS', 'GARLIC'],
    description: 'Classic Roman salad with rich, savory dressing',
    dayIndex: 2,
  },
  {
    name: 'GUACAMOLE',
    coreIngredients: ['AVOCADO', 'LIME', 'GARLIC', 'CILANTRO', 'JALAPEÑO'],
    description: 'Traditional Mexican avocado dip',
    dayIndex: 3,
  },
  {
    name: 'HUMMUS',
    coreIngredients: ['BEANS', 'TAHINI', 'LEMON', 'GARLIC', 'OLIVE OIL'],
    description: 'Middle Eastern chickpea spread',
    dayIndex: 4,
  },
  {
    name: 'CARBONARA',
    coreIngredients: ['PASTA', 'BACON', 'EGG', 'PECORINO ROMANO', 'PEPPER'],
    description: 'Roman pasta dish with eggs and cured pork',
    dayIndex: 5,
  },
  {
    name: 'CAPRESE SALAD',
    coreIngredients: ['TOMATO', 'MOZZARELLA', 'BASIL', 'OLIVE OIL'],
    description: 'Simple Italian salad representing the flag colors',
    dayIndex: 6,
  },
  {
    name: 'GREEK SALAD',
    coreIngredients: ['TOMATO', 'FETA', 'OLIVE OIL', 'RED ONION', 'OREGANO'],
    description: 'Traditional Mediterranean village salad',
    dayIndex: 7,
  },
  {
    name: 'CLASSIC CHILI',
    coreIngredients: [
      'GROUND BEEF',
      'KIDNEY BEANS',
      'TOMATO',
      'ONION',
      'CHILI POWDER',
    ],
    description: 'Hearty American stew with beans and spices',
    dayIndex: 8,
  },
  {
    name: 'FRENCH OMELETTE',
    coreIngredients: ['EGG', 'BUTTER', 'SALT', 'PEPPER'],
    description: 'Classic French egg preparation',
    dayIndex: 9,
  },
]

// Usage example:
// To seed initial data, call:
// await api.gameData.seedInitial({
//   ingredients: SAMPLE_INGREDIENTS,
//   puzzles: SAMPLE_PUZZLES,
//   startDateUTC: '2022-01-01T00:00:00.000Z'
// })


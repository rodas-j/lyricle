export interface Ingredient {
  name: string
  category: string
  substitutes?: string[]
}

export interface Dish {
  name: string
  coreIngredients: string[]
  description?: string
}

export const INGREDIENTS_DATABASE: { [key: string]: Ingredient } = {
  // Herbs & Aromatics
  BASIL: { name: 'BASIL', category: 'Herb' },
  PARSLEY: { name: 'PARSLEY', category: 'Herb' },
  OREGANO: { name: 'OREGANO', category: 'Herb' },
  THYME: { name: 'THYME', category: 'Herb' },
  ROSEMARY: { name: 'ROSEMARY', category: 'Herb' },
  GARLIC: { name: 'GARLIC', category: 'Aromatic' },
  ONION: { name: 'ONION', category: 'Aromatic' },
  SHALLOT: { name: 'SHALLOT', category: 'Aromatic' },

  // Cheeses
  'PECORINO ROMANO': { name: 'PECORINO ROMANO', category: 'Cheese' },
  PARMESAN: {
    name: 'PARMESAN',
    category: 'Cheese',
    substitutes: ['PECORINO ROMANO'],
  },
  MOZZARELLA: { name: 'MOZZARELLA', category: 'Cheese' },
  FETA: { name: 'FETA', category: 'Cheese' },
  RICOTTA: { name: 'RICOTTA', category: 'Cheese' },

  // Nuts & Seeds
  'PINE NUTS': { name: 'PINE NUTS', category: 'Nut' },
  WALNUTS: { name: 'WALNUTS', category: 'Nut', substitutes: ['PINE NUTS'] },
  ALMONDS: { name: 'ALMONDS', category: 'Nut' },
  'SESAME SEEDS': { name: 'SESAME SEEDS', category: 'Seed' },

  // Oils & Fats
  'OLIVE OIL': { name: 'OLIVE OIL', category: 'Oil' },
  BUTTER: { name: 'BUTTER', category: 'Fat' },
  'COCONUT OIL': { name: 'COCONUT OIL', category: 'Oil' },

  // Vegetables
  TOMATO: { name: 'TOMATO', category: 'Vegetable' },
  'TOMATO SAUCE': { name: 'TOMATO SAUCE', category: 'Sauce' },
  AVOCADO: { name: 'AVOCADO', category: 'Vegetable' },
  LIME: { name: 'LIME', category: 'Citrus' },
  LEMON: { name: 'LEMON', category: 'Citrus' },
  JALAPEÑO: { name: 'JALAPEÑO', category: 'Pepper' },
  ROMAINE: { name: 'ROMAINE', category: 'Lettuce' },
  LETTUCE: { name: 'LETTUCE', category: 'Lettuce', substitutes: ['ROMAINE'] },
  'RED ONION': { name: 'RED ONION', category: 'Aromatic' },
  CILANTRO: { name: 'CILANTRO', category: 'Herb' },

  // Proteins
  ANCHOVIES: { name: 'ANCHOVIES', category: 'Fish' },
  BACON: { name: 'BACON', category: 'Meat' },
  PROSCIUTTO: { name: 'PROSCIUTTO', category: 'Meat' },
  CHICKEN: { name: 'CHICKEN', category: 'Meat' },
  'GROUND BEEF': { name: 'GROUND BEEF', category: 'Meat' },
  BEANS: { name: 'BEANS', category: 'Legume' },
  'BLACK BEANS': { name: 'BLACK BEANS', category: 'Legume' },
  'KIDNEY BEANS': { name: 'KIDNEY BEANS', category: 'Legume' },

  // Grains & Bread
  BREAD: { name: 'BREAD', category: 'Grain' },
  CROUTONS: { name: 'CROUTONS', category: 'Bread' },
  RICE: { name: 'RICE', category: 'Grain' },
  PASTA: { name: 'PASTA', category: 'Grain' },

  // Spices & Seasonings
  CUMIN: { name: 'CUMIN', category: 'Spice' },
  'CHILI POWDER': { name: 'CHILI POWDER', category: 'Spice' },
  PAPRIKA: { name: 'PAPRIKA', category: 'Spice' },
  SALT: { name: 'SALT', category: 'Seasoning' },
  PEPPER: { name: 'PEPPER', category: 'Seasoning' },

  // Dairy
  CREAM: { name: 'CREAM', category: 'Dairy' },
  MILK: { name: 'MILK', category: 'Dairy' },
  YOGURT: { name: 'YOGURT', category: 'Dairy' },
  'SOUR CREAM': { name: 'SOUR CREAM', category: 'Dairy' },

  // Sauces & Condiments
  'WORCESTERSHIRE SAUCE': { name: 'WORCESTERSHIRE SAUCE', category: 'Sauce' },
  MAYONNAISE: { name: 'MAYONNAISE', category: 'Condiment' },
  MUSTARD: { name: 'MUSTARD', category: 'Condiment' },
  TAHINI: { name: 'TAHINI', category: 'Paste' },

  // Others
  EGG: { name: 'EGG', category: 'Protein' },
  FLOUR: { name: 'FLOUR', category: 'Grain' },
  SUGAR: { name: 'SUGAR', category: 'Sweetener' },
  HONEY: { name: 'HONEY', category: 'Sweetener' },
}

export const DISHES: Dish[] = [
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
  },
  {
    name: 'MARGHERITA PIZZA',
    coreIngredients: ['TOMATO SAUCE', 'MOZZARELLA', 'BASIL', 'OLIVE OIL'],
    description: 'Classic Neapolitan pizza with simple, quality ingredients',
  },
  {
    name: 'CAESAR SALAD',
    coreIngredients: ['ROMAINE', 'PARMESAN', 'ANCHOVIES', 'CROUTONS', 'GARLIC'],
    description: 'Classic Roman salad with rich, savory dressing',
  },
  {
    name: 'GUACAMOLE',
    coreIngredients: ['AVOCADO', 'LIME', 'GARLIC', 'CILANTRO', 'JALAPEÑO'],
    description: 'Traditional Mexican avocado dip',
  },
  {
    name: 'HUMMUS',
    coreIngredients: ['BEANS', 'TAHINI', 'LEMON', 'GARLIC', 'OLIVE OIL'],
    description: 'Middle Eastern chickpea spread',
  },
  {
    name: 'CARBONARA',
    coreIngredients: ['PASTA', 'BACON', 'EGG', 'PECORINO ROMANO', 'PEPPER'],
    description: 'Roman pasta dish with eggs and cured pork',
  },
  {
    name: 'CAPRESE SALAD',
    coreIngredients: ['TOMATO', 'MOZZARELLA', 'BASIL', 'OLIVE OIL'],
    description: 'Simple Italian salad representing the flag colors',
  },
  {
    name: 'GREEK SALAD',
    coreIngredients: ['TOMATO', 'FETA', 'OLIVE OIL', 'RED ONION', 'OREGANO'],
    description: 'Traditional Mediterranean village salad',
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
  },
  {
    name: 'FRENCH OMELETTE',
    coreIngredients: ['EGG', 'BUTTER', 'SALT', 'PEPPER'],
    description: 'Classic French egg preparation',
  },
]

// Get all unique ingredients from dishes for autocomplete
export const ALL_INGREDIENTS = Object.keys(INGREDIENTS_DATABASE).sort()

// Helper function to get ingredient details
export const getIngredientInfo = (
  ingredientName: string
): Ingredient | undefined => {
  return INGREDIENTS_DATABASE[ingredientName.toUpperCase()]
}

// Helper function to check if ingredient is a substitute
export const isSubstitute = (guess: string, target: string): boolean => {
  const targetInfo = getIngredientInfo(target)
  if (!targetInfo || !targetInfo.substitutes) return false
  return targetInfo.substitutes.includes(guess.toUpperCase())
}

// Helper function to check if ingredients are in same category
export const isSameCategory = (guess: string, target: string): boolean => {
  const guessInfo = getIngredientInfo(guess)
  const targetInfo = getIngredientInfo(target)
  if (!guessInfo || !targetInfo) return false
  return guessInfo.category === targetInfo.category
}

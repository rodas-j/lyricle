import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  // Ingredients table
  ingredients: defineTable({
    name: v.string(),
    category: v.string(),
    substitutes: v.optional(v.array(v.string())),
  })
    .index('by_name', ['name'])
    .index('by_category', ['category'])
    .searchIndex('search_ingredients', {
      searchField: 'name',
      filterFields: ['category'],
    }),

  // Dishes table (one dish per day)
  dishes: defineTable({
    name: v.string(),
    coreIngredients: v.array(v.string()),
    description: v.optional(v.string()),
    dayIndex: v.number(), // The day this dish appears (0 = first day)
  })
    .index('by_name', ['name'])
    .index('by_day', ['dayIndex']),

  // Game settings table (for managing game start date and other configs)
  gameSettings: defineTable({
    key: v.string(), // e.g., "gameStartDate", "currentDay"
    value: v.string(),
  }).index('by_key', ['key']),
})

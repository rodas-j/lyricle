import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

// === INGREDIENTS ===

// Mutation to seed ingredients from payload
export const seedIngredients = mutation({
  args: {
    ingredients: v.array(
      v.object({
        name: v.string(),
        category: v.string(),
        substitutes: v.optional(v.array(v.string())),
      }),
    ),
    clearExisting: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (args.clearExisting) {
      const existingIngredients = await ctx.db.query('ingredients').collect()
      for (const ingredient of existingIngredients) {
        await ctx.db.delete(ingredient._id)
      }
    }

    for (const ingredient of args.ingredients) {
      const normalized = {
        name: ingredient.name.trim().toUpperCase(),
        category: ingredient.category.trim(),
        substitutes: ingredient.substitutes?.map((s) => s.trim().toUpperCase()),
      }
      await ctx.db.insert('ingredients', normalized)
    }

    return { ingredientsSeeded: args.ingredients.length }
  },
})

// Query to get all ingredients (for autocomplete)
export const getAllIngredients = query({
  args: {},
  handler: async (ctx) => {
    const ingredients = await ctx.db.query('ingredients').collect()
    return ingredients.map((ing) => ing.name).sort()
  },
})

// Query for ingredient autocomplete search (using search index for better performance)
export const searchIngredients = query({
  args: {
    searchTerm: v.string(),
    limit: v.optional(v.number()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 10
    const searchTerm = args.searchTerm.trim().toUpperCase()

    if (!searchTerm) {
      return []
    }

    // Use search index for efficient text search
    const searchResults = await ctx.db
      .query('ingredients')
      .withSearchIndex('search_ingredients', (q) => {
        let query = q.search('name', searchTerm)
        if (args.category) {
          query = query.eq('category', args.category)
        }
        return query
      })
      .take(limit)

    return searchResults.map((ingredient) => ingredient.name)
  },
})

// Query to get ingredient details
export const getIngredientInfo = query({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const ingredient = await ctx.db
      .query('ingredients')
      .withIndex('by_name', (q) => q.eq('name', args.name.toUpperCase()))
      .first()

    return ingredient || null
  },
})

// Helper query to check if ingredient is valid
export const isIngredientValid = query({
  args: {
    ingredient: v.string(),
  },
  handler: async (ctx, args) => {
    const ingredient = await ctx.db
      .query('ingredients')
      .withIndex('by_name', (q) => q.eq('name', args.ingredient.toUpperCase()))
      .first()

    return !!ingredient
  },
})

// === PUZZLES/DISHES ===

// Mutation to upsert a puzzle/dish
export const upsertPuzzle = mutation({
  args: {
    name: v.string(),
    coreIngredients: v.array(v.string()),
    description: v.optional(v.string()),
    dayIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const normalized = {
      name: args.name.trim().toUpperCase(),
      coreIngredients: args.coreIngredients.map((i) => i.trim().toUpperCase()),
      description: args.description?.trim(),
      dayIndex: args.dayIndex,
    }
    // Check if puzzle already exists for this day
    const existing = await ctx.db
      .query('dishes')
      .withIndex('by_day', (q) => q.eq('dayIndex', args.dayIndex))
      .first()

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: normalized.name,
        coreIngredients: normalized.coreIngredients,
        description: normalized.description,
      })
      return { action: 'updated', puzzleId: existing._id }
    } else {
      const id = await ctx.db.insert('dishes', normalized)
      return { action: 'created', puzzleId: id }
    }
  },
})

// Dish-named alias: upsert one dish by dayIndex
export const upsertDish = mutation({
  args: {
    name: v.string(),
    coreIngredients: v.array(v.string()),
    description: v.optional(v.string()),
    dayIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const normalized = {
      name: args.name.trim().toUpperCase(),
      coreIngredients: args.coreIngredients.map((i) => i.trim().toUpperCase()),
      description: args.description?.trim(),
      dayIndex: args.dayIndex,
    }
    const existing = await ctx.db
      .query('dishes')
      .withIndex('by_day', (q) => q.eq('dayIndex', args.dayIndex))
      .first()

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: normalized.name,
        coreIngredients: normalized.coreIngredients,
        description: normalized.description,
      })
      return { action: 'updated', dishId: existing._id }
    } else {
      const id = await ctx.db.insert('dishes', normalized)
      return { action: 'created', dishId: id }
    }
  },
})

// Query to get puzzle by day index
export const getPuzzleByIndex = query({
  args: {
    dayIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const puzzle = await ctx.db
      .query('dishes')
      .withIndex('by_day', (q) => q.eq('dayIndex', args.dayIndex))
      .first()

    return puzzle || null
  },
})

// Dish-named alias: get dish by day index
export const getDishByIndex = query({
  args: {
    dayIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const dish = await ctx.db
      .query('dishes')
      .withIndex('by_day', (q) => q.eq('dayIndex', args.dayIndex))
      .first()
    return dish || null
  },
})

// Query to get current dish of the day
export const getDishOfDay = query({
  args: {},
  handler: async (ctx) => {
    const gameStartDateStr = await ctx.db
      .query('gameSettings')
      .withIndex('by_key', (q) => q.eq('key', 'gameStartDate'))
      .first()

    if (!gameStartDateStr) {
      throw new Error(
        'Game start date not set. Please seed the game data first.',
      )
    }

    const gameStartDate = new Date(gameStartDateStr.value)
    const now = new Date()
    const msInDay = 86400000
    const daysSinceStart = Math.floor(
      (now.getTime() - gameStartDate.getTime()) / msInDay,
    )

    const allDishes = await ctx.db.query('dishes').collect()
    if (allDishes.length === 0) {
      throw new Error('No dishes have been seeded yet.')
    }
    const dishIndex =
      ((daysSinceStart % allDishes.length) + allDishes.length) %
      allDishes.length

    const currentDish = await ctx.db
      .query('dishes')
      .withIndex('by_day', (q) => q.eq('dayIndex', dishIndex))
      .first()

    if (!currentDish) {
      throw new Error(`No dish found for day index ${dishIndex}`)
    }

    const nextDayMs = (daysSinceStart + 1) * msInDay + gameStartDate.getTime()

    return {
      dish: currentDish,
      dishIndex: dishIndex,
      tomorrow: nextDayMs,
    }
  },
})

// === SETTINGS ===

// Query to get game settings
export const getSettings = query({
  args: {
    key: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.key) {
      const setting = await ctx.db
        .query('gameSettings')
        .withIndex('by_key', (q) => q.eq('key', args.key as string))
        .first()
      return setting?.value || null
    } else {
      // Return all settings as key-value pairs
      const allSettings = await ctx.db.query('gameSettings').collect()
      const settingsObj: Record<string, string> = {}
      for (const setting of allSettings) {
        settingsObj[setting.key] = setting.value
      }
      return settingsObj
    }
  },
})

// Mutation to set game start date
export const setStartDateUTC = mutation({
  args: {
    startDateUTC: v.string(), // ISO date string
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('gameSettings')
      .withIndex('by_key', (q) => q.eq('key', 'gameStartDate'))
      .first()

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.startDateUTC })
    } else {
      await ctx.db.insert('gameSettings', {
        key: 'gameStartDate',
        value: args.startDateUTC,
      })
    }

    return { startDateUTC: args.startDateUTC }
  },
})

// Mutation to update any game setting
export const updateGameSettings = mutation({
  args: {
    key: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('gameSettings')
      .withIndex('by_key', (q) => q.eq('key', args.key))
      .first()

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value })
    } else {
      await ctx.db.insert('gameSettings', args)
    }

    return { updated: true }
  },
})

// === INITIAL SETUP ===

// Mutation to seed initial data (convenience function)
export const seedInitial = mutation({
  args: {
    ingredients: v.array(
      v.object({
        name: v.string(),
        category: v.string(),
        substitutes: v.optional(v.array(v.string())),
      }),
    ),
    puzzles: v.array(
      v.object({
        name: v.string(),
        coreIngredients: v.array(v.string()),
        description: v.optional(v.string()),
        dayIndex: v.number(),
      }),
    ),
    startDateUTC: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const startDate = args.startDateUTC || '2022-01-01T00:00:00.000Z'

    // Clear all existing data
    const [existingIngredients, existingDishes, existingSettings] =
      await Promise.all([
        ctx.db.query('ingredients').collect(),
        ctx.db.query('dishes').collect(),
        ctx.db.query('gameSettings').collect(),
      ])

    // Delete in parallel for better performance
    await Promise.all([
      ...existingIngredients.map((item) => ctx.db.delete(item._id)),
      ...existingDishes.map((item) => ctx.db.delete(item._id)),
      ...existingSettings.map((item) => ctx.db.delete(item._id)),
    ])

    // Normalize inputs
    const normalizedIngredients = args.ingredients.map((ingredient) => ({
      name: ingredient.name.trim().toUpperCase(),
      category: ingredient.category.trim(),
      substitutes: ingredient.substitutes?.map((s) => s.trim().toUpperCase()),
    }))
    const normalizedPuzzles = args.puzzles.map((p) => ({
      name: p.name.trim().toUpperCase(),
      coreIngredients: p.coreIngredients.map((i) => i.trim().toUpperCase()),
      description: p.description?.trim(),
      dayIndex: p.dayIndex,
    }))

    // Insert new data in parallel
    await Promise.all([
      ...normalizedIngredients.map((ingredient) =>
        ctx.db.insert('ingredients', ingredient),
      ),
      ...normalizedPuzzles.map((puzzle) => ctx.db.insert('dishes', puzzle)),
      ctx.db.insert('gameSettings', { key: 'gameStartDate', value: startDate }),
    ])

    return {
      ingredientsSeeded: args.ingredients.length,
      puzzlesSeeded: args.puzzles.length,
      startDateUTC: startDate,
    }
  },
})

// Seed an array of dishes with optional clear
export const seedDishes = mutation({
  args: {
    dishes: v.array(
      v.object({
        name: v.string(),
        coreIngredients: v.array(v.string()),
        description: v.optional(v.string()),
        dayIndex: v.number(),
      }),
    ),
    clearExisting: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (args.clearExisting) {
      const existing = await ctx.db.query('dishes').collect()
      await Promise.all(existing.map((d) => ctx.db.delete(d._id)))
    }

    let created = 0
    let updated = 0

    for (const d of args.dishes) {
      const normalized = {
        name: d.name.trim().toUpperCase(),
        coreIngredients: d.coreIngredients.map((i) => i.trim().toUpperCase()),
        description: d.description?.trim(),
        dayIndex: d.dayIndex,
      }
      const prev = await ctx.db
        .query('dishes')
        .withIndex('by_day', (q) => q.eq('dayIndex', d.dayIndex))
        .first()

      if (prev) {
        await ctx.db.patch(prev._id, {
          name: normalized.name,
          coreIngredients: normalized.coreIngredients,
          description: normalized.description,
        })
        updated += 1
      } else {
        await ctx.db.insert('dishes', normalized)
        created += 1
      }
    }

    return { created, updated, total: args.dishes.length }
  },
})

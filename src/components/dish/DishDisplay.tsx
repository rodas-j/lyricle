import { IngredientCard } from '../cards/IngredientCard'
import { getIngredientFeedback } from '../../lib/statuses'

interface Dish {
  name: string
  coreIngredients: string[]
  description?: string
}

interface Props {
  guesses: string[]
  isRevealing?: boolean
  currentDish: Dish
}

export const DishDisplay = ({ guesses, isRevealing = false, currentDish }: Props) => {
  const correctGuesses = guesses.filter((guess) =>
    currentDish.coreIngredients.includes(guess.toUpperCase())
  )

  const incorrectGuesses = guesses.filter(
    (guess) => !currentDish.coreIngredients.includes(guess.toUpperCase())
  )

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Dish Name */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {currentDish.name}
        </h1>
        {currentDish.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {currentDish.description}
          </p>
        )}
      </div>

      {/* Core Ingredients Grid */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
          Core Ingredients ({correctGuesses.length}/
          {currentDish.coreIngredients.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 justify-items-center">
          {currentDish.coreIngredients.map((ingredient, index) => {
            const isGuessed = correctGuesses.some(
              (guess) => guess.toUpperCase() === ingredient
            )

            return (
              <div key={ingredient} className="w-full max-w-[150px]">
                {isGuessed ? (
                  <IngredientCard
                    ingredient={ingredient}
                    status="correct"
                    message="Correct ingredient!"
                    isRevealing={isRevealing}
                    delay={index * 100}
                  />
                ) : (
                  <div className="h-10 bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">?</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Incorrect Guesses */}
      {incorrectGuesses.length > 0 && (
        <div>
          <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
            Previous Guesses
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {incorrectGuesses.map((guess, index) => {
              const feedback = getIngredientFeedback(guess, currentDish)
              return (
                <IngredientCard
                  key={`${guess}-${index}`}
                  ingredient={guess.toUpperCase()}
                  status={feedback.status}
                  message={feedback.message}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

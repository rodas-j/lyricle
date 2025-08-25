import { IngredientCard } from '../cards/IngredientCard'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal
      title="How to Play Guessipe"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="text-left">
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
          Guess the core ingredients of the featured dish in 6 tries or fewer.
          After each guess, you'll get feedback to help you find the right
          ingredients.
        </p>

        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Example: Today's dish is "PESTO GENOVESE"
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-2">
            <IngredientCard
              ingredient="PECORINO ROMANO"
              status="correct"
              message="Correct ingredient!"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-300 mb-4">
            🟩 <strong>Green:</strong> Correct core ingredient!
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-2">
            <IngredientCard
              ingredient="PARMESAN"
              status="present"
              message="Right category, wrong item (Cheese)"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-300 mb-4">
            🟨 <strong>Yellow:</strong> Right category or common substitute
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-2">
            <IngredientCard
              ingredient="CREAM"
              status="absent"
              message="Not a core ingredient"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-300 mb-4">
            ⬜ <strong>Gray:</strong> Not a core ingredient
          </p>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Features:
          </h4>
          <ul className="text-xs text-gray-500 dark:text-gray-300 space-y-1">
            <li>• Type ingredients and get smart autocomplete suggestions</li>
            <li>• Get detailed feedback with helpful tooltips</li>
            <li>• New dish every day with shareable results</li>
            <li>• Track your culinary knowledge with statistics</li>
          </ul>
        </div>

        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 text-center">
          A culinary twist on the word guessing game we all love! 🍽️
        </p>
      </div>
    </BaseModal>
  )
}

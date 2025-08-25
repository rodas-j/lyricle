import { IngredientStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'

interface Props {
  ingredient: string
  status?: IngredientStatus
  message?: string
  isRevealing?: boolean
  delay?: number
}

export const IngredientCard = ({
  ingredient,
  status,
  message,
  isRevealing = false,
  delay = 0,
}: Props) => {
  const isHighContrast = getStoredIsHighContrastMode()

  const classes = classnames(
    'inline-block px-3 py-2 m-1 rounded-lg border-2 text-sm font-semibold transition-all duration-300 min-w-[80px] text-center',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 text-gray-900 dark:text-white':
        !status,
      'bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'bg-orange-500 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'bg-cyan-500 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      'bg-green-500 text-white border-green-500':
        status === 'correct' && !isHighContrast,
      'bg-yellow-500 text-white border-yellow-500':
        status === 'present' && !isHighContrast,
      'animate-pulse': isRevealing,
    }
  )

  return (
    <div className="relative group">
      <div
        className={classes}
        style={{
          animationDelay: isRevealing ? `${delay}ms` : '0ms',
        }}
      >
        {ingredient}
      </div>
      {message && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
          {message}
        </div>
      )}
    </div>
  )
}

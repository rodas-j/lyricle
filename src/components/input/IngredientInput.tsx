import { useState, useRef, useEffect } from 'react'
import { ALL_INGREDIENTS } from '../../constants/dishes'

interface Props {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
  placeholder?: string
}

export const IngredientInput = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = 'Enter an ingredient...',
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!value.trim()) {
      setFilteredIngredients([])
      setIsOpen(false)
      return
    }

    const filtered = ALL_INGREDIENTS.filter((ingredient) =>
      ingredient.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 10) // Limit to 10 suggestions

    setFilteredIngredients(filtered)
    setIsOpen(filtered.length > 0)
    setSelectedIndex(-1)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredIngredients.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault()
        onSubmit()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < filteredIngredients.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredIngredients.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          selectIngredient(filteredIngredients[selectedIndex])
        } else if (filteredIngredients.length === 1) {
          selectIngredient(filteredIngredients[0])
        } else {
          onSubmit()
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        break
      case 'Tab':
        if (selectedIndex >= 0) {
          e.preventDefault()
          selectIngredient(filteredIngredients[selectedIndex])
        }
        break
    }
  }

  const selectIngredient = (ingredient: string) => {
    onChange(ingredient)
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Delay closing to allow clicking on suggestions
    setTimeout(() => {
      setIsOpen(false)
      setSelectedIndex(-1)
    }, 150)
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => {
          if (filteredIngredients.length > 0) setIsOpen(true)
        }}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        autoComplete="off"
        spellCheck="false"
      />

      {isOpen && filteredIngredients.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredIngredients.map((ingredient, index) => (
            <li
              key={ingredient}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                index === selectedIndex ? 'bg-blue-100' : ''
              }`}
              onClick={() => selectIngredient(ingredient)}
            >
              <span className="text-gray-900">{ingredient}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

import { ChevronDoubleRightIcon } from '@heroicons/react/outline'

export const ActionBar = ({ handleSkip, inputRef }) => {
  return (
    <div className="flex justify-end mt-3">
      <button
        type="submit"
        className="py-1 md:py-2 px-4 md:px-10 md:text-l font-bold text-gray-800 bg-indigo-300 tracking-widest hover:bg-indigo-200 order-1"
      >
        SUBMIT
      </button>
      <button
        type="button"
        className="py-1 md:py-2 px-4 md:px-10 md:text-l font-bold tracking-widest text-gray-800 dark:text-gray-100 flex items-center mr-0.5 md:mr-2 hover:outline hover:outline-offset-[-1px] hover:outline-1 hover:outline-gray-400"
        onClick={() => {
          handleSkip()
          inputRef.current.value = ''
        }}
      >
        SKIP
        <ChevronDoubleRightIcon className="w-3 h-3 ml-1" />
      </button>
    </div>
  )
}

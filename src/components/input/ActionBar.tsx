export const ActionBar = ({ handleSkip, inputRef }) => {
  return (
    <div className="flex justify-end mt-3">
      <button
        type="submit"
        className="py-2 px-10 text-l font-bold bg-indigo-300 tracking-widest hover:bg-indigo-100 order-1"
      >
        SUBMIT
      </button>
      <button
        type="button"
        className="py-2 px-10 text-l font-bold tracking-widest text-gray-100"
        onClick={() => {
          handleSkip()
          inputRef.current.value = ''
        }}
      >
        SKIP
      </button>
    </div>
  )
}

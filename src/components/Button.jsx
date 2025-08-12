export default function Button({ children, ...props }) {
    return (
      <button
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition"
        {...props}
      >
        {children}
      </button>
    )
  }
  
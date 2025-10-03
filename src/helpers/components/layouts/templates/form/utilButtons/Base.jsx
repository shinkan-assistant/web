export default function FormUtilButton({title, onClick, disabled}) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
    >
      {title}
    </button>
  );
}


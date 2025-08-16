
export function ListItemContainer({ children }) {
  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 p-6"
    >
      {children}
    </div>
  );
}

export function ListContainer({ key, children }) {
  return (
    <div key={key} className="container mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {children}
    </div>
  );
}

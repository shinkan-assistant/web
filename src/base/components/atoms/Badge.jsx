export function Badge({text, bgColorClass, textColorClass, textSizeClass}) {
  return (
    <div className="flex items-center text-sm text-gray-600">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${textSizeClass} font-medium ${bgColorClass} ${textColorClass}`}>
        {text}
      </span>
    </div>
  );
}

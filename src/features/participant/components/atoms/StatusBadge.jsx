'use client';

export default function StatusBadge({ color, children }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    gray: "bg-gray-100 text-gray-800",
    purple: "bg-purple-100 text-purple-800",
    teal: "bg-teal-100 text-teal-800",
  };

  const badgeClass = colorClasses[color] || colorClasses.gray;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${badgeClass}`}>
      {children}
    </span>
  );
}

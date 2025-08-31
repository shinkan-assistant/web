export default function Checkbox({name, label, value, onChange}) {
  const id = name;

  return (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        onChange={(e) => onChange(name, {value: e.target.checked})}
        checked={value}
        className="h-6 w-6 text-sky-600 accent-sky-600  focus:ring-sky-500 border-sky-300 rounded-md cursor-pointer"
      />
      <label htmlFor={id} className="ml-3 text-lg font-medium text-gray-800 cursor-pointer">
        {label}
      </label>
    </div>
  );
}

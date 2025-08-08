export default function Checkbox({name, label, onChange}) {
  return (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        onChange={onChange}
        className="h-6 w-6 text-sky-600 accent-sky-600  focus:ring-sky-500 border-sky-300 rounded-md cursor-pointer"
      />
      <label htmlFor="is_participating" className="ml-3 text-lg font-medium text-gray-800 cursor-pointer">
        {label}
      </label>
    </div>
  );
}

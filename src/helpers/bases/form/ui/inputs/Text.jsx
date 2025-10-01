export default function TextInput({name, value, onChange}) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={(e) => onChange(name, {value: e.target.value})}
      className="w-full h-10 px-3 text-lg text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
    />
  );
}

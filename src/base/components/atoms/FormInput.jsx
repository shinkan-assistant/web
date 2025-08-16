export function TextInput({name, value, onChange}) {
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

export function Checkbox({name, label, value, onChange}) {
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

export default function Input({name, formHook}) {
  const inputInfo = formHook.inputInfos[name];
  return (
    <inputInfo.Component
      name={name}
      label={inputInfo.label}
      value={formHook.inputValues[name]}
      onChange={formHook.onChangeInput}
    />
  )
}

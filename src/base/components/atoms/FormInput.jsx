export function Checkbox({id, name, label, ref, initialValue, onChange}) {
  return (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        ref={ref}
        onChange={() => onChange(name, {value: ref.current.checked})}
        defaultChecked={initialValue}
        className="h-6 w-6 text-sky-600 accent-sky-600  focus:ring-sky-500 border-sky-300 rounded-md cursor-pointer"
      />
      <label htmlFor={id} className="ml-3 text-lg font-medium text-gray-800 cursor-pointer">
        {label}
      </label>
    </div>
  );
}

export default function Input({name, formController}) {
  const inputInfo = formController.inputInfos[name];
  return (
    <inputInfo.Component
      id={name}
      name={name}
      label={inputInfo.label}
      ref={inputInfo.ref}
      initialValue={inputInfo.initialValue}
      onChange={formController.onChangeInput}
    />
  )
}

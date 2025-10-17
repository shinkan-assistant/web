import { useFormContext } from "react-hook-form";


const choiceForNonSelected = "選択してください";
export function wrapChoices(choices) {
  return [
    choiceForNonSelected,
    ...choices,
  ]
}

export function wrapDefaultValuesForSelect(defaultValue) {
  return defaultValue ?? choiceForNonSelected;
}

export default function SelectInput({ name, label, choices, disabled }) {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col justify-center">
      {label && 
        <label htmlFor={name} className="text-lg font-medium text-gray-800 cursor-pointer">
          {label}
        </label>
      }
      <select
        {...register(name)}
        disabled={disabled}
        id={name}
        className="w-full h-10 px-3 text-lg text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
      >
        {choices.map((choice, index) => (
          <option key={index} value={choice} disabled={choice === choiceForNonSelected}>
            {choice}
          </option>
        ))}
      </select>
    </div>
  );
}
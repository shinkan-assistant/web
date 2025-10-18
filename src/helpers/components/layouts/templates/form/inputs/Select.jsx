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
    <div className="flex flex-col justify-center space-y-2">
      {label && 
        <label htmlFor={name} className="text-lg font-semibold text-slate-800 cursor-pointer">
          {label}
        </label>
      }
      <select
        {...register(name)}
        disabled={disabled}
        id={name}
        className="w-full h-12 px-4 text-lg text-slate-700 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
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
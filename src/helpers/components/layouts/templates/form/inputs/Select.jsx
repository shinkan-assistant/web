import { useFormContext } from "react-hook-form";

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
        <option value="" disabled selected>
          選択してください
        </option>
        {choices.map((choice, index) => (
          <option key={index} value={choice}>
            {choice}
          </option>
        ))}
      </select>
    </div>
  );
}
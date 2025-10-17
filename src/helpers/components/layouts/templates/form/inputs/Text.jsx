import { useFormContext } from "react-hook-form";

export default function TextInput({type, name, label, disabled}) {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col justify-center">
      {label && 
        <label htmlFor={name} className="text-lg font-medium text-gray-800 cursor-pointer">
          {label}
        </label>
      }
      <input
        type={type}
        {...register(name)}
        disabled={disabled}
        id={name}
        className="w-full h-10 px-3 text-lg text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );
}

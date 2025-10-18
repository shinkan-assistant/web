import { useFormContext } from "react-hook-form";

export default function TextInput({type, name, label, disabled}) {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col justify-center space-y-2">
      {label && 
        <label htmlFor={name} className="text-lg font-semibold text-slate-800 cursor-pointer">
          {label}
        </label>
      }
      <input
        type={type}
        {...register(name)}
        disabled={disabled}
        id={name}
        className="w-full h-12 px-4 text-lg text-slate-700 placeholder-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}

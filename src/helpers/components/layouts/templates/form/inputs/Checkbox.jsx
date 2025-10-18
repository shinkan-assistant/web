import { useFormContext } from "react-hook-form";

export default function Checkbox({name, label}) {
  const { register } = useFormContext();

  return (
    <div className="flex items-center justify-start space-x-3">
      <input
        type="checkbox"
        {...register(name)}
        id={name}
        className="h-6 w-6 text-sky-600 accent-sky-600 focus:ring-sky-500 border-slate-300 rounded-lg cursor-pointer"
      />
      <label htmlFor={name} className="text-lg font-semibold text-slate-800 cursor-pointer">
        {label}
      </label>
    </div>
  );
}

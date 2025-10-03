import { useFormContext } from "react-hook-form";

export default function TextInput({name}) {
  const { register } = useFormContext();

  return (
    <input
      type="text"
      {...register(name)}
      className="w-full h-10 px-3 text-lg text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
    />
  );
}

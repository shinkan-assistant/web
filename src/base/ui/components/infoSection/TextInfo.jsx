import FormInput from "@/base/features/form/components/ui/Input";

export default function TextInfo({name, label, value, isEdit, formHook}) {
  return (
    <div>
      <span className="font-semibold">{label}</span>
      <span className="font-semibold px-1">:</span>
      {!isEdit
      ? <span>{value}</span>
      : <FormInput name={name} formHook={formHook} />
      }
    </div>
  );
}

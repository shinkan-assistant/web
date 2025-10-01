import TextInput from "@/helpers/components/layouts/contents/form/ui/inputs/Text";

export default function TextInfo({label, value, inputProps}) {
  return (
    <div>
      <span className="font-semibold">{inputProps?.label ?? label}</span>
      <span className="font-semibold px-1">:</span>
      {!inputProps
      ? <span>{value}</span>
      : <TextInput {...inputProps} />
      }
    </div>
  );
}

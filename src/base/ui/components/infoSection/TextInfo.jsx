export default function TextInfo({name, label, value, isEdit, formHook}) {
  return (
    <div>
      <span className="font-semibold">{label}</span>
      <span className="font-semibold px-1">:</span>
      {!isEdit
      ? <span>{value}</span>
      : <Input name={name} formHook={formHook} />
      }
    </div>
  );
}

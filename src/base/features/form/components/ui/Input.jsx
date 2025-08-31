export default function FormInput({name, formHook}) {
  const inputInfo = formHook.inputInfos[name];
  return (
    <inputInfo.Component
      name={name}
      label={inputInfo.label}
      value={formHook.inputValues[name]}
      onChange={formHook.onChangeInput}
    />
  )
}

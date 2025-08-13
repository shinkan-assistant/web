export default function FormButtonArea({hook}) {
  return (
    <div className="flex justify-center items-center gap-x-6">
      {hook.Buttons.map((Button, index) => (
        <Button key={index} formHook={hook} />
      ))}
    </div>
  )
}

export default function FormButtonArea({Buttons, methods}) {
  return (
    <div className="flex justify-center items-center gap-x-6">
      {Buttons.map((Button, index) => (
        <Button key={index} formMethods={methods} />
      ))}
    </div>
  )
}

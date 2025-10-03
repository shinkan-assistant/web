export default function FormUtilButtonArea({Buttons}) {
  return (
    <div className="flex justify-center items-center gap-x-6">
      {Buttons.map((Button, index) => (
        <Button key={index} />
      ))}
    </div>
  )
}

import { UI_SIZE } from "../../const";

export default function InfoSection({Icon, disabled, size, children}) {
  const textSizeClassName = {
    [UI_SIZE.LG]: "text-lg",
    [UI_SIZE.MD]: "text-sm",
  }[size];

  return (
    <div className={`flex gap-x-1 ${textSizeClassName}`}>
      <Icon 
        disabled={disabled}
        size={size}
      />
      <div>
        {children}
      </div>
    </div>
  );
}

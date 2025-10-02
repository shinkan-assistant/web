import uiSizeEnum from "../uiSizeEnum";

export default function TextInfoArea({Icon, disabled, size, children}) {
  const textSizeClassName = {
    [uiSizeEnum.LG]: "text-lg",
    [uiSizeEnum.MD]: "text-sm",
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

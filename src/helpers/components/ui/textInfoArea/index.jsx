import TextInput from "@/helpers/components/layouts/templates/form/inputs/Text";
import uiSizeEnum from "../base/config/sizeEnum";

export function TextInfo({label, value, inputProps}) {
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

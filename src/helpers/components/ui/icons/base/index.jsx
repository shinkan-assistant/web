import uiSizeEnum from "../../uiSizeEnum";

function BaseIcon({disabled, statefulColorClassNames, size, children}) {
  const colorClassName = !disabled ? statefulColorClassNames.enabled : statefulColorClassNames.disabled;
  const sizeClassName = {
    [uiSizeEnum.LG]: "w-6 h-6",
    [uiSizeEnum.MD]: "w-5 h-5",
  }[size];

  return (
    <svg
      className={`${colorClassName} ${sizeClassName}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

export function createIcon(IconPath, statefulColorClassNames) {
  return function Icon({ disabled, size }) {
    return (
      <BaseIcon
        disabled={disabled}
        statefulColorClassNames={statefulColorClassNames}
        size={size}
      >
        <IconPath />
      </BaseIcon>
    )
  }
}

import createIcon from "./base";
import { redColor } from "./base/color";
import getIconStrokeProps from "./base/strokeProps";

const LocationIcon = createIcon(() => {
  const pathData = [
    "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z",
    "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
  ];

  return (
    <>
      {pathData.map((d, index) => (
        <path key={index} {...getIconStrokeProps()} d={d} />
      ))}
    </>
  );
}, redColor);

export default LocationIcon;

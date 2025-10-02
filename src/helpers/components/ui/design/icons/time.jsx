import createIcon from "./base";
import { blueColor } from "./base/color";
import getIconStrokeProps from "./base/strokeProps";

const TimeIcon = createIcon(() => (
  <path
    {...getIconStrokeProps()}
    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  ></path>
), blueColor);

export default TimeIcon;

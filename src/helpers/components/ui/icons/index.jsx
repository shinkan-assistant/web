import { createIcon } from "./base";
import { blueColor, greenColor, redColor } from "./base/color";
import { CalenderPath, ClockPath, LocationPath, CurrencyPath } from "./paths";

export const DateIcon = createIcon(CalenderPath, blueColor);
export const TimeIcon = createIcon(ClockPath, blueColor);
export const LocationIcon = createIcon(LocationPath, redColor);
export const FeeIcon = createIcon(CurrencyPath, greenColor);

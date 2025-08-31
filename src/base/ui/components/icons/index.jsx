import { createIcon } from "./base";
import { CalenderPath, ClockPath, LocationPath, CurrencyPath } from "./paths";

// 各アイコンの色を定数として定義
const blueColors = { enabled: "text-blue-500", disabled: "text-blue-200" };
const redColors = { enabled: "text-red-500", disabled: "text-red-200" };
const greenColors = { enabled: "text-green-500", disabled: "text-green-200" };

export const DateIcon = createIcon(CalenderPath, blueColors);
export const TimeIcon = createIcon(ClockPath, blueColors);
export const LocationIcon = createIcon(LocationPath, redColors);
export const FeeIcon = createIcon(CurrencyPath, greenColors);
